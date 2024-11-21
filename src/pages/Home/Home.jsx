import { useContext } from 'react';
import PropertyContext from '../../Services/PropertyContext';
import styled from 'styled-components'
import colors from '../../utils/style/colors';
import Banner from '../../components/Banner/Banner.jsx'
import Card from '../../components/Card/Card.jsx';
import bannerImage from '../../assets/BannerHeader.png';


const HomeContainer = styled.div`
  margin: 0px 100px 50px 100px;
`
const CardsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 60px;
  padding: 60px;
  background-color: ${colors.backgroundGrey};
  border-radius: 25px;
  grid-auto-rows: 1fr; /* Uniformise les hauteurs des lignes */
`;

function Home() {
  const { properties, loading, error } = useContext(PropertyContext);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <HomeContainer>
      <Banner 
        title="Chez vous, partout et ailleurs"
        img={bannerImage}
        description="Bannière de la page d'accueil"
      />
      <CardsWrapper>
        {properties.map((property) => (
          <Card 
            key={property.id} 
            id={property.id} 
            title={property.title} 
            cover={property.cover} 
          />
        ))}
      </CardsWrapper>
    </HomeContainer>
  );
}


export default Home;
