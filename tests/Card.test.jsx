import Card from "../src/components/Card/Card.jsx";
import { BrowserRouter } from "react-router-dom";
import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";

//Définition des tests

describe("Passer des données valides", () => {
  test("Affiche le titre fourni", () => {
    const title = "Mon Titre de Test";
    const id = "123";
    const cover = "image-test.jpg";

    render(
      <BrowserRouter>
        <Card id={id} title={title} cover={cover} />
      </BrowserRouter>
    );

    // Vérifie que le titre est rendu correctement
    expect(screen.getByText(title)).toBeTruthy();
  });
});

describe("Affichage des erreurs", () => {
  test("Lève une erreur si le titre est vide", () => {
    const id = "123";
    const cover = "image-test.jpg";

    // Encapsulez `render` dans une fonction
    const renderCardWithoutTitle = () => {
      render(
        <BrowserRouter>
          <Card id={id} title="" cover={cover} />
        </BrowserRouter>
      );
    };

    expect(renderCardWithoutTitle).toThrowError(/titre est requis/i);
  });

  test("Lève une erreur si l'ID est manquant", () => {
    const title = "Mon Titre de Test";
    const cover = "image-test.jpg";

    const renderCardWithoutId = () => {
      render(
        <BrowserRouter>
          <Card title={title} cover={cover} />
        </BrowserRouter>
      );
    };

    expect(renderCardWithoutId).toThrowError(/ID est requis/i);
  });
  test("Lève une erreur si l'image est manquante", () => {
    const id = "123";
    const title = "Mon Titre de Test";

    const renderCardWithoutCover = () => {
      render(
        <BrowserRouter>
          <Card id={id} title={title} />
        </BrowserRouter>
      );
    };

    expect(renderCardWithoutCover).toThrowError(
      new Error(
        "Image de couverture (cover) est requise pour le composant Card."
      )
    );
  });
});
