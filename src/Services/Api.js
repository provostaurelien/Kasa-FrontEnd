export async function fetchProperties() {
  const response = await fetch("http://localhost:8080/api/properties");
  if (!response.ok) {
    throw new Error("Erreur réseau");
  }
  return response.json();
}

export const fetchPropertyById = async (id) => {
  try {
    const response = await fetch(`http://localhost:8080/api/properties/${id}`);
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des détails du logement");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
