import { createGlobalStyle } from "styled-components";

// Déplacement du globalStyle dans un fichier tiers sur warning Eslint

const GlobalStyle = createGlobalStyle`
 body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
  }
`;

export default GlobalStyle;
