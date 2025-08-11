import { useState, useEffect } from 'react';

const useHomeVehiculos = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehiculos = async () => {
      try {
        setLoading(true);
        // Ajusta la URL según tu endpoint de API
        const response = await fetch('/api/vehicles/home');
        
        if (!response.ok) {
          throw new Error('Error al obtener los vehículos');
        }
        
        const data = await response.json();
        setVehiculos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVehiculos();
  }, []);

  return { vehiculos, loading, error };
};

export default useHomeVehiculos;