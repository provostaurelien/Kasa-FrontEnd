
import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchProperties, fetchPropertyById } from './Api.js'; 

const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const getPropertyById = async (id) => {
    try {
      return await fetchPropertyById(id);
    } catch (error) {
      throw new Error(error.message);
    }
  };

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