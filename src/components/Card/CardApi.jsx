import { useContext } from 'react';
import Card from '../Card/Card.jsx';
import PropertyContext from '../../Services/PropertyContext'; // Import du contexte
import styled from 'styled-components'
import colors from '../../utils/style/colors'


const CardsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 60px;
  padding: 60px;
  background-color: ${colors.backgroundGrey};
  border-radius: 25px;
  grid-auto-rows: 1fr; /* Uniformise les hauteurs des lignes */
`;

function PropertyList() {
  const { properties, loading, error } = useContext(PropertyContext); // Récupération des données api

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

// Retour des données api spécifiques à la card
  return (
    <CardsWrapper>
      {properties.map((property) => (
        <Card key={property.id} id={property.id} title={property.title} cover={property.cover} />
      ))}
    </CardsWrapper>
  );
}

export default PropertyList;