import PropertyList from '../../components/Card/CardApi.jsx';
import Banner from '../../components/Banner/Banner.jsx'
import bannerImage from '../../assets/BannerHeader.png';
import styled from 'styled-components'

const HomeContainer = styled.div`
  margin: 0px 100px 50px 100px;
`
function Home() {
  return (
    <HomeContainer>
      <Banner 
        title="Chez vous, partout et ailleurs"
        img={bannerImage}
        description="Bannière de la page d'accueil"
      />
      <PropertyList />
    </HomeContainer>
  );
}

export default Home;
