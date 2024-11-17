import styled from 'styled-components'
import logo from '../../assets/logob&w.png' 


// Gestion du Style

const FooterContainer = styled.footer`
     display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: black;
    padding: 20px;
`
const Logo = styled.img`
    height: 40px;
    padding: 40px;
    margin-right: 20px;
`

const P = styled.p`
    color: white;
    
`


// Composant Footer

function Footer() {

    return (
      <FooterContainer>
      <Logo src={logo} alt="logo noir et blanc" />
      <P>© 2020 Kasa. All rights reserved</P>
      </FooterContainer>
    )
  }
  
  export default Footer