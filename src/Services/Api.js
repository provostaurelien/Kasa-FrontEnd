export async function fetchProperties() {
    const response = await fetch('http://localhost:8080/api/properties');
    if (!response.ok) {
      throw new Error('Erreur réseau');
    }
    return response.json();
  }