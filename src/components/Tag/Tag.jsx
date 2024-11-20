import styled from 'styled-components';
import PropTypes from 'prop-types';
import colors from '../../utils/style/colors'


const TagStyled = styled.div`
 display: inline-flex;         // Pour les afficher côte à côte
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  background-color: ${colors.primary};
  color: white;
  padding: 5px 10px;            // Padding ajusté pour entourer le contenu
`



export default function Tag({ title }) {
  return (
    <TagStyled>{title}</TagStyled>
  )
}

Tag.propTypes = {
    title: PropTypes.string.isRequired,
  };