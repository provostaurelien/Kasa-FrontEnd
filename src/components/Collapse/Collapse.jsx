import { useState } from 'react';
import styled from 'styled-components';
import colors from '../../utils/style/colors'
import PropTypes from 'prop-types';
import arrow from '../../assets/arrow_up.png'

const Container = styled.div`
  margin: 20px 150px auto;
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
`;

const BannerTitle = styled.h2`
  margin: 0;
  color: white;
`;

const Arrow = styled.span`
 display: inline-flex; /* Adapte la taille du span à celle de l'image */
  justify-content: center;  
  img {
  width: 50%; /* Réduction de la taille de l'image  */
  transform: ${({ open }) => (open ? 'rotate(-180deg)' : 'rotate(0deg)')};
  transition: transform 0.6s ease; /* Gestion du temps de l'animation de rotation  */
  }
`;



const Content = styled.p`
margin: 0;
padding: 20px;
font-size : 20px;
background-color: ${colors.backgroundGrey};
`;



export default function Collapse({ title, content }) {
    //Constante pour définir l'état ouvert ou fermé
    const [isOpen, setIsOpen] = useState(false);
    //COnstante pour gérer létat ouvert quelque soit l'état précédent
    const toggleOpen = () => {
        setIsOpen((prev) => !prev);
      };
  return (
    <Container>
    <Header onClick={toggleOpen}>
      <BannerTitle> {title} </BannerTitle>
      <Arrow open={isOpen}><img src={arrow} alt="Arrow" /></Arrow> {/* Flèche vers le haut */}
    </Header>
    {isOpen && (
      <Content>
        {content}
      </Content>
    )}
  </Container>
);
};

Collapse.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  };
  
