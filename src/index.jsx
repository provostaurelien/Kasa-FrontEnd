import React from 'react'
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import App from './pages/Home/Index.jsx'
import APropos from './pages/A-Propos/Index.jsx'
import Logement from './pages/Fiche-Logement/Logement.jsx'
import NotFound from './components/Error/Index.jsx'
import Header from './components/Header/Index.jsx'
import Footer from './components/Footer/Index.jsx'

const root = createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/APropos" element={<APropos />} />
        <Route path="/Logement/:idLogement" element={<Logement />} />
        {/* Route qui capture toutes les autres routes non définies */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  </React.StrictMode>
)