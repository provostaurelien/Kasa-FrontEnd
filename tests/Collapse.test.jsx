import Collapse from "../src/components/Collapse/Collapse.jsx";
import { BrowserRouter } from "react-router-dom";
import { describe, test, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";

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
    const title = "Mon Titre de Test";
    const content = "Mon contenu de test";

    render(
      <BrowserRouter>
        <Collapse title={title} content={content} />
      </BrowserRouter>
    );

    // Vérifie que le contenu n'est pas dans le document initialement
    expect(screen.queryByText(content)).toBeNull();
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
    const title = "Mon Titre de Test";
    const content = "Mon contenu de test";

    render(
      <BrowserRouter>
        <Collapse title={title} content={content} />
      </BrowserRouter>
    );

    // Simule deux clics sur le Header
    const header = screen.getByText(title);
    header.click();
    header.click();

    // Vérifie que le contenu n'est plus affiché
    expect(screen.queryByText(content)).toBeNull();
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
