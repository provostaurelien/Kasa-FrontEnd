import styled from "styled-components";
import logo from "../../assets/logob&w.png";

// Gestion du Style

const FooterContainer = styled.footer`
  display: flex;
  flex-grow: 1; /* Permet au footer de prendre tout l'espace disponible */
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: black;
  padding: 20px;
`;
const Logo = styled.img`
  height: 40px;
  padding: 40px;
  @media (max-width: 652px) {
    padding: 10px;
  }
`;

const P = styled.p`
  color: white;
  text-align: center;
  width: auto;

  @media (max-width: 652px) {
    font-size: 12px;
  }
`;

// Composant Footer

export default function Footer() {
  return (
    <FooterContainer>
      <Logo src={logo} alt="logo noir et blanc" />
      <P>© 2020 Kasa. All rights reserved</P>
    </FooterContainer>
  );
}
