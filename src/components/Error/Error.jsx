import styled from 'styled-components';
import { Link } from 'react-router-dom';
import colors from '../../utils/style/colors';

const CardTitle1 = styled.h1`
    display: flex;
    justify-content : center;
    font-size: 200px;
    margin: 5%;
    color: ${colors.primary};
`

const CardTitle2 =styled.h2`
display: flex;
justify-content : center;
color: ${colors.primary};
margin: 5%;
font-weight: normal;
`

const StyledLink = styled(Link)`
display: flex;
justify-content : center;
margin: 5%;
&:visited {
        color: black; // Applique la même couleur que le lien non visité
    }
`




function NotFound() {
    return (
        <div>
            <CardTitle1>404</CardTitle1>
            <CardTitle2>Oups! La page que vous demandez n&#39;existe pas.</CardTitle2>
            <StyledLink to="/" $isActive={location.pathname === '/'}>Retourner sur la page d’accueil</StyledLink>
        </div>
    )
}

export default NotFound