import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GlobalStyle from './utils/style/GlobalStyle.jsx';
import Home from './pages/Home/Home.jsx';
import APropos from './pages/A-Propos/A-Propos.jsx';
import Logement from './pages/Fiche-Logement/Logement.jsx';
import NotFound from './components/Error/Error.jsx';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import { PropertyProvider } from './Services/PropertyContext.jsx';

export default function App() {
  return (
    <Router>
      <PropertyProvider>
        <GlobalStyle />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/APropos" element={<APropos />} />
          <Route path="/Logement/:idLogement" element={<Logement />} />
          {/* Route qui capture toutes les autres routes non définies */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </PropertyProvider>
    </Router>
  );
}


  