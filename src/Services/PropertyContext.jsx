
import { createContext, useState, useEffect } from 'react';
import { fetchProperties, fetchPropertyById } from './Api.js'; 
import PropTypes from 'prop-types';


const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
// Gestion de la récupération des données et de l'erreur si pas de données
  useEffect(() => {
    fetchProperties()
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);
// Gestion dans le même fichier de l'appel fait sur un id défini
  const getPropertyById = async (id) => {
    try {
      return await fetchPropertyById(id);
    } catch (error) {
      throw new Error(error.message);
    }
  };
// Retour de l'api
  return (
    <PropertyContext.Provider value={{ properties, loading, error, getPropertyById }}>
      {children}
    </PropertyContext.Provider>
  );
};

// Ajout de la validation des props obligatoire
PropertyProvider.propTypes = {
  children: PropTypes.node.isRequired,  
};

export default PropertyContext;