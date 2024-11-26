import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const CardContainer = styled.div`
  position: relative;
  width: 100%; 
  height: 100%; 
  aspect-ratio: 1 / 1; /* Maintient un rapport 1:1 pour une forme carrée */
  border-radius: 25px;
  overflow: hidden; /* Empêche tout dépassement de contenu pour le border */
  cursor: pointer; 
  @media (max-width: 652px) {
    aspect-ratio: 4/3;
    }
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* S'assure que l'image s'adapte sans déformation */
  position: absolute;
  top: 0;
  left: 0;
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%, /* Opacité haute 0% */
    rgba(0, 0, 0, 0.5) 100% /* Opacité basse 50% */
  );
`;

const CardTitle = styled.h3`
  position: absolute;
  bottom: 20px; 
  left: 20px;
  color: white;
  margin: 0;
  text-align: left;
  width: 50%; /* Limite la largeur du titre à 50% de la carte */
  word-wrap: break-word;
`;

function Card({ id, title, cover }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/Logement/${id}`);
  };

  return (
    <CardContainer onClick={handleCardClick}>
      <CardImage src={cover} alt={title} />
      <GradientOverlay />
      <CardTitle>{title}</CardTitle>
    </CardContainer>
  );
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
};

export default Card;
