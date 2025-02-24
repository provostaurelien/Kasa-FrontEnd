import { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import arrow from "../../assets/arrow_up.png";
import colors from "../../utils/style/colors";

const Container = styled.div`
  margin: 20px 0px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 16px;
  border-radius: 8px;
  background-color: ${colors.primary};
  color: white;
  @media (max-width: 652px) {
    padding: 8px;
  }
`;

const BannerTitle = styled.h2`
  margin: 0;
  color: white;
  font-size: 18px;
  @media (max-width: 652px) {
    font-size: 13px;
  }
`;

const Arrow = styled.span`
  display: inline-flex;
  justify-content: center;
  img {
    transform: ${({ open }) =>
      open
        ? "rotate(-180deg)"
        : "rotate(0deg)"}; /* Gestion de la rotation de la flèche */
    transition: transform 2s ease;
  }
`;

const ContentWrapper = styled.div.attrs(({ maxheight }) => ({
  style: { maxHeight: maxheight ? `${maxheight}px` : "0px" },
}))`
  overflow: hidden;
  transition: max-height 1s ease;
`;

const Content = styled.div`
  margin: 0;
  padding: 20px;
  font-size: 20px;
  background-color: ${colors.backgroundGrey};
  transform: ${({ open }) =>
    open
      ? "translateY(0)"
      : "translateY(-100%)"}; /* Gère le déplacement vers le haut ou le bas */
  transition: transform 1s ease; /* Transition fluide pour le défilement */
  position: relative;
  @media (max-width: 652px) {
    font-size: 13px;
  }
`;

const Paragraph = styled.p`
  margin: 0;
  line-height: 1.5;
`;

const List = styled.ul`
  margin: 0;
  padding-left: 0; /*Supression du padding hérité par le ul */
  list-style-type: none; /* Retire les puces */
`;

export default function Collapse({ title, content }) {
  const [isOpen, setIsOpen] = useState(false);
  const [maxheight, setmaxheight] = useState(0); // Hauteur animée
  const contentRef = useRef(null); // Permet de mesurer la hauteur du contenu

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isOpen) {
      // Mesure de la hauteur
      const contentHeight = contentRef.current.scrollHeight;
      setmaxheight(contentHeight);
    } else {
      // Réduction lors de la fermeture fermeture
      setmaxheight(0);
    }
  }, [isOpen]); // Choix du use effect par rapport au chargement via api et permet de synchronise l'effet avec le chargement du DOM

  const renderContent = () => {
    if (Array.isArray(content)) {
      return (
        <List>
          {content.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </List>
      );
    }
    return <Paragraph>{content}</Paragraph>;
  };

  return (
    <Container>
      <Header onClick={toggleOpen}>
        <BannerTitle>{title}</BannerTitle>
        <Arrow open={isOpen}>
          <img src={arrow} alt="Arrow" />
        </Arrow>
      </Header>
      <ContentWrapper
        maxheight={maxheight}
        data-testid={`collapse-content-${isOpen ? "open" : "closed"}`}
      >
        <Content ref={contentRef} open={isOpen}>
          {renderContent()}
        </Content>
      </ContentWrapper>
    </Container>
  );
}

//Définition des vérifications des props

Collapse.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
};
