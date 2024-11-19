import Banner from '../../components/Banner/Banner.jsx'
import bannerImage from '../../assets/BannerAPropos.png';
import styled from 'styled-components'


const AProposContainer = styled.div`
  margin: 0px 100px 50px 100px;
`


function APropos() {
    return (
        <AProposContainer>
            <Banner 
        img={bannerImage}
        description="Bannière de la page A Propos"
      />
        </AProposContainer>
    )
}

export default APropos