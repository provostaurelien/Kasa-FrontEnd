/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createRoot } from "react-dom/client";
import styled from "styled-components";
import GlobalStyle from "./utils/style/GlobalStyle.jsx";
import { PropertyProvider } from "./Services/PropertyContext.jsx";
import App from "./app.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Header from "./components/Header/Header.jsx";
const root = createRoot(document.getElementById("root"));

// Définition du style pour étendre le contenu à tout l'écran

// Conteneur principal
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* S'assure que l'application prend toute la hauteur de l'écran */
`;

// Section principale p
const Main = styled.main`
  flex-shrink: 0;
`;

root.render(
  <React.StrictMode>
    <Router>
      <PropertyProvider>
        {/* définition du contexte de l'appel api */}
        <GlobalStyle />
        <AppContainer>
          <Header />
          <Main>
            <App />
          </Main>
          <Footer />
        </AppContainer>
      </PropertyProvider>
    </Router>
  </React.StrictMode>
);
