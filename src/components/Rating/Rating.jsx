import styled from "styled-components";
import PropTypes from "prop-types";
import starActive from "../../assets/star-active.png";
import starInactive from "../../assets/star-inactive.png";

const RatingContainer = styled.div`
  display: flex;

  gap: 5px;
`;

const RatingImage = styled.img`
  @media (max-width: 652px) {
    height: 20px;
  }
`;

export default function Rating({ rating }) {
  // Crée un tableau de 5 éléments représentant les étoiles
  const stars = Array.from({ length: 5 }, (_, index) => index < rating); // `true` si l'index est inférieur à la note

  return (
    <RatingContainer>
      {stars.map((isFilled, index) => (
        <RatingImage
          key={index}
          src={isFilled ? starActive : starInactive}
          alt={isFilled ? "Active star" : "Inactive star"}
        />
      ))}
    </RatingContainer>
  );
}

Rating.propTypes = {
  rating: PropTypes.string.isRequired,
};
