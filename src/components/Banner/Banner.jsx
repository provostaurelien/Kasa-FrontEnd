import PropTypes from 'prop-types';
import styled from 'styled-components';

const BannerContainer = styled.div`
  position: relative;
  padding: 50px 0px;
  border-radius: 25px;
`;

const ImageWrapper = styled.div`
  position: relative; /* Position relative pour que l'overlay se place par rapport à ce conteneur */
  width: 100%;
  height: 223px; /* Hauteur fixe pour l'image */
  border-radius: 25px; 
  overflow: hidden; /* Assure que l'overlay et l'image respectent les bords arrondis */
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// Propriété de l'overlay présent uniquement si le titre est présent
const BannerOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, ${({ title }) => title ? 0.6 : 0}); /* Applique un filtre sombre avec opacité ajustable */
  z-index: 1; /* Assure que l'overlay est sous le titre mais au-dessus de l'image */
  border-radius: 25px; 
`;

const BannerTitle = styled.h1`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 2.5rem;
  text-align: center;
  margin: 0;
  z-index: 2; /* Assure que le titre est toujours au-dessus de l'overlay */
`;

export default function Banner({ title, img, description }) {
  return (
    <BannerContainer>
      <ImageWrapper>
        <BannerImage src={img} alt={description} />
        <BannerOverlay title={title} />
      </ImageWrapper>
      {title && <BannerTitle>{title}</BannerTitle>} {/* Affiche le titre uniquement si présent */}
    </BannerContainer>
  );
}

Banner.propTypes = {
  img: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  title: PropTypes.string,
};
