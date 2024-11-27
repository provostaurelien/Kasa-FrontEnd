import styled from "styled-components";
import PropTypes from "prop-types";
import colors from "../../utils/style/colors";

const TagStyled = styled.div`
  display: inline-flex; // Pour les afficher côte à côte
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  background-color: ${colors.primary};
  color: white;
  padding: 5px 10px; // Padding ajusté pour entourer le contenu
  font-size: 14px;
  font-weight: bold;
  @media (max-width: 652px) {
    font-size: 10px;
    border-radius: 5px;
  }
`;

export default function Tag({ title }) {
  return <TagStyled>{title}</TagStyled>;
}

//Définition des vérifications des props

Tag.propTypes = {
  title: PropTypes.string.isRequired,
};
