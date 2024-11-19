import { useEffect, useState } from 'react';
import { useParams , useNavigate } from 'react-router-dom';
import { fetchPropertyById } from '../../Services/Api';

export default function Logement() {
  const { idLogement } = useParams(); // Récupérer l'ID du logement
  const navigate = useNavigate();
  // Dééfinition des états de l'api
  const [logement, setLogement] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchPropertyById(idLogement)
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
  }, [idLogement, navigate]);

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <img
        src={logement?.cover }
        alt={`Image de ${logement?.title}`}
      />
      <h1>{logement?.title }</h1>
      <p>{logement?.location}</p>
    </div>
  );
}