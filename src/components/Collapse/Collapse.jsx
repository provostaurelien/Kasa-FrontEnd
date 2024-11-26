import { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import arrow from '../../assets/arrow_up.png';
import colors from '../../utils/style/colors';

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
    transform: ${({ open }) => (open ? 'rotate(-180deg)' : 'rotate(0deg)')};
    transition: transform 0.6s ease;
  }
`;

const Content = styled.div`
  margin: 0;
  padding: 20px;
  font-size: 20px;
  background-color: ${colors.backgroundGrey};
  @media (max-width: 652px) {
      font-size: 13px
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

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const renderContent = () => {
    if (Array.isArray(content)) {
      return (
        // Gestion d'un retour des données en tableau
        <List>
          {content.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </List>
      );
    }
    //Gestion d'un retour des données de texte simple
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
      {isOpen && <Content>{renderContent()}</Content>}
    </Container>
  );
}

Collapse.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
};
