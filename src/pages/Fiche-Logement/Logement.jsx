import { useParams } from 'react-router-dom';



export default function Logement() {
  const { idLogement } = useParams(); // Récupérer l'ID du logement

  return (
    <div>
      <h1>Détails du logement {idLogement}</h1>
    </div>

  )
}