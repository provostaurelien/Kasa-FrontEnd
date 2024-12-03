import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/Error/Error.jsx";
import APropos from "./pages/A-Propos/A-Propos.jsx";
import Logement from "./pages/Fiche-Logement/Logement.jsx";
import Home from "./pages/Home/Home.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/APropos" element={<APropos />} />
      <Route path="/Logement/:idLogement" element={<Logement />} />
      {/* Route qui capture toutes les autres routes non définies */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
