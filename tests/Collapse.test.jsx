import React from "react";
import Collapse from "../src/components/Collapse/Collapse.jsx";
import { BrowserRouter } from "react-router-dom";
import { describe, test, expect, vi } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import PropertyContext, { PropertyProvider } from '../src/Services/PropertyContext.jsx';


// Définition globale de l'appel de la console d'erreur
let consoleErrorMock;

// Mock console.error avant chaque test
// eslint-disable-next-line no-undef
beforeEach(() => {
  consoleErrorMock = vi.spyOn(console, "error").mockImplementation(() => {});
});

// Restaurer le comportement par défaut après chaque test
// eslint-disable-next-line no-undef
afterEach(() => {
  consoleErrorMock.mockRestore();
});

//Définition des tests

describe("Passer des données valides", () => {
  test("Affiche le titre fourni", () => {
    const title = "Mon Titre de Test";
    const content = "content";

    render(
      <BrowserRouter>
        <Collapse title={title} content={content} />
      </BrowserRouter>
    );

    // Vérifie que le titre est rendu correctement
    expect(screen.getByText(title)).toBeTruthy();
    expect(consoleErrorMock).not.toHaveBeenCalled();
  });
});

describe("Tests du comportement de Collapse", () => {

  test("Le contenu n'est pas affiché par défaut", () => {
    render(<Collapse title="Mon Titre" content="Mon contenu de test" />);
  
    // Vérifiez que le contenu a l'état fermé
    const contentWrapper = screen.getByTestId("collapse-content-closed");
    expect(contentWrapper).toBeInTheDocument();
  });
  

  test("Le contenu est affiché après un clic sur le Header", async () => {
    const title = "Mon Titre de Test";
    const content = "Mon contenu de test";

    render(
      <BrowserRouter>
        <Collapse title={title} content={content} />
      </BrowserRouter>
    );

    // Simule un clic sur le Header
    const header = screen.getByText(title);
    header.click();

    // Attends que le contenu apparaisse
    await waitFor(() => {
      expect(screen.getByText(content)).toBeTruthy();
    });
  });

  test("Le contenu est caché après un double clic sur le Header", () => {
    const title = "Mon Titre";
    const content = "Mon contenu de test";
  
    // Rendre le composant
    render(<Collapse title={title} content={content} />);
  
    // Sélectionner le Header
    const header = screen.getByText(title);
  
    // Simuler deux clics consécutifs sur le Header
    fireEvent.click(header); // Premier clic pour ouvrir
    fireEvent.click(header); // Deuxième clic pour fermer
  
    // Vérifier que le contenu est masqué après le deuxième clic
    const contentWrapper = screen.getByTestId("collapse-content-closed");
    expect(contentWrapper).toBeInTheDocument();
  });
});

describe("Tests de validation des propTypes", () => {
  test("Émet un avertissement si le titre est absent", () => {
    render(
      <BrowserRouter>
        <Collapse content="content" />
      </BrowserRouter>
    );

    /// Vérifie qu'une erreur a été émise contenant la chaîne spécifique
    expect(consoleErrorMock).toHaveBeenCalled();
    const errorCalls = consoleErrorMock.mock.calls;

    // Vérifie que l'une des erreurs contient le message attendu
    const containsDescriptionError = errorCalls.some((call) =>
      call.some(
        (arg) =>
          typeof arg === "string" &&
          arg.includes("The prop `title` is marked as required in `Collapse`")
      )
    );
    expect(containsDescriptionError).toBe(true);
  });

  test("Émet un avertissement si le content est absent", () => {
    render(
      <BrowserRouter>
        <Collapse title="title" />
      </BrowserRouter>
    );

    // Vérifie qu'une erreur a été émise contenant la chaîne spécifique
    expect(consoleErrorMock).toHaveBeenCalled();
    const errorCalls = consoleErrorMock.mock.calls;

    // Vérifie que l'une des erreurs contient le message attendu
    const containsDescriptionError = errorCalls.some((call) =>
      call.some(
        (arg) =>
          typeof arg === "string" &&
          arg.includes("The prop `content` is marked as required in `Collapse`")
      )
    );

    expect(containsDescriptionError).toBe(true);
  });
});

// simuliation via Mock du comportement de l'API
import * as Api from "../src/Services/Api";

vi.mock("../src/Services/Api", () => ({
  fetchProperties: vi.fn(),
}));

describe("Tests des états en cas d'erreur API", () => {
  test("Gère l'état error et loading lors d'une erreur API", async () => {
    // Simulation d'une erreur lors de l'appel API
    Api.fetchProperties.mockRejectedValueOnce(new Error("Erreur serveur"));

    //Observation du comportement du contexte
    const MockConsumer = () => {
      const { error, loading } = React.useContext(PropertyContext);

      if (loading) return <div>Chargement...</div>;
      if (error) return <div>Erreur: {error}</div>;
      return <div>Aucune erreur</div>;
    };

    render(
      <PropertyProvider>
        <MockConsumer />
      </PropertyProvider>
    );

    // Vérifie que l'état initial est "loading"
    expect(screen.getByText(/chargement.../i)).toBeInTheDocument();

    // Attente de la mise à jour après l'erreur API
    await waitFor(() => {
      // Vérifie que l'état "error" est correctement mis à jour
      expect(screen.getByText(/erreur: erreur serveur/i)).toBeInTheDocument();

      // Vérifie que "loading" est passé à "false" après l'erreur
      expect(screen.queryByText(/chargement.../i)).toBeNull();
    });
  });
});