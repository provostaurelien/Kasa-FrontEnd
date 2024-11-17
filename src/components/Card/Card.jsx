import PropTypes from 'prop-types';
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { useNavigate } from 'react-router-dom';

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content : space-between;
    background-color: ${colors.primary};
    padding: 20px;
    gap: 20px;
    border-radius: 25px;
`
const CardImage = styled.img`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px; /* définition hauteur en dur pour garder hauteur similaire */
  object-fit: cover; /* evite à l'image de déborder */
  max-width: 100%; /* Empêche l'image de déborder */
  border-radius: 25px; 
`;

const CardTitle =styled.h2`
 color: white;
  text-align: left; /* Aligne le texte à gauche */
  width: 50%; /* Limite la largeur à la moitié de la carte */
  word-wrap: break-word; /* Permet au texte de passer à la ligne */
`;



function Card({ id,title, cover }) {
  const navigate = useNavigate(); // Utiliser useNavigate pour le routage

  const handleCardClick = () => {
    navigate(`/Logement/${id}`); // Rediriger vers la page Logement avec l'ID de la propriété
  };

  return (
    <CardContainer onClick={handleCardClick}>
      <CardImage src={cover} alt={title} />
      <CardTitle>{title}</CardTitle>
    </CardContainer>
  )
}

Card.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
  };

export default Card;