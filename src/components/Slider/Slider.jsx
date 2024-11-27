import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import arrowLeft from "../../assets/arrow_left.png";
import arrowRight from "../../assets/arrow_right.png";

// Définition du style
const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
`;

const ImageContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SliderImage = styled.img`
  width: 100%;
  height: 415px; /* Hauteur fixe pour toutes les images */
  object-fit: cover; /* Remplit l'espace tout en respectant le ratio */
  border-radius: 10px;
  @media (max-width: 652px) {
    height: 255px;
  }
`;

const Arrow = styled.img`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 10;

  // Positionnement des flèches
  ${({ direction }) => (direction === "left" ? "left: 10px;" : "right: 10px;")}
  @media (max-width: 652px) {
    height: 20%;
  }
`;

const Counter = styled.div`
  position: absolute;
  bottom: 10px;
  right: 50%;
  transform: translateX(50%); // Permet le centrage
  color: white;
  padding: 10px;
  font-size: 14px;
  @media (max-width: 652px) {
    display: none;
  }
`;

export default function Slider({ images }) {
  //Gestion de l'index pour l'affichage de la photo
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return <p>Aucune image disponible.</p>;
  }

  // Gestion des flèches
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <SliderContainer>
      <ImageContainer>
        <SliderImage
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
        />
        <Counter>
          {currentIndex + 1}/{images.length}
        </Counter>
      </ImageContainer>

      {/* Afficher les flèches uniquement si plusieurs images sont disponibles */}
      {images.length > 1 && (
        <>
          <Arrow
            src={arrowLeft}
            alt="Flèche gauche"
            direction="left"
            onClick={prevImage}
          />
          <Arrow
            src={arrowRight}
            alt="Flèche droite"
            direction="right"
            onClick={nextImage}
          />
        </>
      )}
    </SliderContainer>
  );
}

//Définition des vérifications des props

Slider.propTypes = {
  images: PropTypes.node,
};
