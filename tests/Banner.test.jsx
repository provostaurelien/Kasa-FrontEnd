import Banner from "../src/components/Banner/Banner.jsx";
import { BrowserRouter } from "react-router-dom";
import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

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
    const img = "image-test.jpg";
    const description = "description";

    render(
      <BrowserRouter>
        <Banner title={title} img={img} description={description} />
      </BrowserRouter>
    );

    // Vérifie que le titre est rendu correctement
    expect(screen.getByText(title)).toBeTruthy();
    expect(consoleErrorMock).not.toHaveBeenCalled();
  });

  test("Affiche l'image même si le titre est nul", () => {
    const title = null; // Le titre est nul
    const img = "image-test.jpg";
    const description = "description";

    render(
      <BrowserRouter>
        <Banner title={title} img={img} description={description} />
      </BrowserRouter>
    );

    // Vérifie que l'image est rendue correctement
    const imageElement = screen.getByRole("img");
    expect(imageElement).toHaveAttribute("src", img);
    expect(consoleErrorMock).not.toHaveBeenCalled();
  });
});

describe("Tests de validation des propTypes", () => {
  test("Émet un avertissement si l'image est absente", () => {
    render(
      <BrowserRouter>
        <Banner title="Mon Titre" description="Description sans image" />
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
          arg.includes("The prop `img` is marked as required in `Banner`")
      )
    );
    expect(containsDescriptionError).toBe(true);
  });

  test("Émet un avertissement si la description est absente", () => {
    render(
      <BrowserRouter>
        <Banner title="Mon Titre" img="image-test.jpg" />
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
          arg.includes(
            "The prop `description` is marked as required in `Banner`"
          )
      )
    );

    expect(containsDescriptionError).toBe(true);
  });
});
