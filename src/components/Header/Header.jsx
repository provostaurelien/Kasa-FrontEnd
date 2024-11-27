import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/logo.png";

// Gestion du Style

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 10%;
  .menu {
    display: flex;
  }
  @media (max-width: 652px) {
    padding: 20px 4%;
    a {
      text-transform: uppercase; /* transformation du texte en majuscule en vue mobile */
    }
  }
`;
// Gestion du is active pour souligner le texte avec ajout $ pour éviter message d'erreur
const StyledLink = styled(Link)`
  padding: 15px;
  color: black;
  font-size: 18px;
  text-decoration: ${({ $isActive }) => ($isActive ? "underline" : "none")};
`;

const Logo = styled.img`
  height: 40px;
  margin-right: 20px;
`;

// Composant Header

export default function Header() {
  const location = useLocation();

  return (
    <HeaderContainer>
      <Link to="/">
        <Logo src={logo} alt="logo" />
      </Link>
      <nav className="menu">
        <StyledLink to="/" $isActive={location.pathname === "/"}>
          Accueil
        </StyledLink>
        <StyledLink to="/Apropos" $isActive={location.pathname === "/Apropos"}>
          A propos
        </StyledLink>
      </nav>
    </HeaderContainer>
  );
}
