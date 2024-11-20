// Rating.jsx
import styled from 'styled-components';
import PropTypes from 'prop-types';
import colors from '../../utils/style/colors';

// Conteneur des étoiles
const RatingContainer = styled.div`
  display: flex;
  gap: 5px; // Espacement entre les étoiles
`;

// Composant représentant une étoile
const Star = styled.span`
  font-size: 20px;
  color: ${({ filled }) => (filled ? colors.primary : '#D3D3D3')}; // Couleur primaire pour étoile remplie, gris pour étoile vide
`;

export default function Rating({ rating }) {
  // On crée un tableau de 5 éléments représentant les étoiles
  const stars = Array.from({ length: 5 }, (_, index) => index < rating); // Si l'index est inférieur à la note, l'étoile est remplie

  return (
    <RatingContainer>
      {stars.map((filled, index) => (
        <Star key={index} filled={filled}>
          &#9733; {/* Unicode pour une étoile */}
        </Star>
      ))}
    </RatingContainer>
  );
}

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
};
