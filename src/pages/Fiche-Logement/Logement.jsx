import { useEffect, useState, useContext } from 'react';
import { useParams , useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import PropertyContext from '../../Services/PropertyContext';
import Gallery from "../../components/Gallery/Gallery.jsx";


const LogementContainer = styled.div`
  margin: 0px 100px 50px 100px;
`


const Host = styled.div`
  display: flex;
  justify-content: flex-end; /* Positionne l'hôte à droite */
  align-items: center;
  margin: 20px 0;

  .host-info {
    text-align: right; /* Aligne le texte à droite */
    margin-right: 10px;
  }

  p {
    margin: 0;
  }

  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
`;


export default function Logement() {
  const { idLogement } = useParams(); // Récupérer l'ID du logement
  const navigate = useNavigate();
  const { getPropertyById } = useContext(PropertyContext);
  // Définition des états de l'api
  const [logement, setLogement] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setLoading(true);
    getPropertyById(idLogement)
    //Scénario présence de data
      .then((data) => {
        setLogement(data);
        setLoading(false);
      })
      //Scénario absence de data avec redirection vers la page d'erreur
      .catch(() => {
        setLoading(false);
        // Redirection vers la page d'erreur si une erreur survient
        navigate('/error'); 
      });
  }, [idLogement, getPropertyById, navigate]); // Tableau de dépendance permettantle rechargement des données

  if (loading) return <p>Chargement...</p>;

   // Sépare le nom et le prénom avec un `<br>`
   const [firstName, lastName] = logement?.host?.name?.split(' ') || [];

  return (
    <LogementContainer>
       <Gallery images={logement?.pictures } />
      <h1>{logement?.title }</h1>
      <Host>
      <div className="host-info">
          <p>{firstName}<br />{lastName}</p>
        </div>
      <img src={logement?.host?.picture} alt={logement?.host?.name} />
      </Host>
      <p>{logement?.location}</p>
    </LogementContainer>
  );
}