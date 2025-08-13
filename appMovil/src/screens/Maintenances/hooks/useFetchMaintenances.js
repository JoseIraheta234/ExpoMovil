import { useState, useEffect, useCallback } from 'react';

// Para emulador Android usa 10.0.2.2 en lugar de localhost
const API_BASE_URL = 'http://10.0.2.2:4000/api';

export const useFetchMaintenances = () => {
  const [maintenances, setMaintenances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para obtener todos los mantenimientos
  const fetchMaintenances = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('Fetching maintenances from:', `${API_BASE_URL}/maintenances`);
      
      const response = await fetch(`${API_BASE_URL}/maintenances`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        // Para desarrollo en React Native
        timeout: 10000,
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.log('Error response:', errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      console.log('Response data:', result);

      if (result.success) {
        setMaintenances(result.data || []);
      } else {
        throw new Error(result.message || 'Error en la respuesta del servidor');
      }
    } catch (err) {
      console.error('Error fetching maintenances:', err);
      
      // Mensajes de error más específicos
      let errorMessage = 'Error desconocido';
      
      if (err.message.includes('Network request failed')) {
        errorMessage = 'No se puede conectar al servidor. Verifica que el backend esté ejecutándose en ' + API_BASE_URL;
      } else if (err.message.includes('timeout')) {
        errorMessage = 'Tiempo de espera agotado. El servidor tardó demasiado en responder.';
      } else {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      setMaintenances([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Función para refrescar mantenimientos
  const refreshMaintenances = useCallback(async () => {
    await fetchMaintenances();
  }, [fetchMaintenances]);

  // Función para crear un nuevo mantenimiento
  const createMaintenance = useCallback(async (maintenanceData) => {
    try {
      setError(null);

      console.log('Creating maintenance:', maintenanceData);

      const response = await fetch(`${API_BASE_URL}/maintenances`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(maintenanceData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Error al crear mantenimiento');
      }

      if (result.success) {
        // Actualizar la lista local
        setMaintenances(prev => [result.data, ...prev]);
        return result.data;
      } else {
        throw new Error(result.message || 'Error en la respuesta del servidor');
      }
    } catch (err) {
      console.error('Error creating maintenance:', err);
      setError(err.message);
      throw err;
    }
  }, []);

  // Función para eliminar un mantenimiento
  const deleteMaintenance = useCallback(async (id) => {
    try {
      setError(null);

      const response = await fetch(`${API_BASE_URL}/maintenances/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Error al eliminar mantenimiento');
      }

      if (result.success) {
        // Actualizar la lista local
        setMaintenances(prev => 
          prev.filter(maintenance => maintenance._id !== id)
        );
        return result.data;
      } else {
        throw new Error(result.message || 'Error en la respuesta del servidor');
      }
    } catch (err) {
      console.error('Error deleting maintenance:', err);
      setError(err.message);
      throw err;
    }
  }, []);

  // Cargar mantenimientos al inicializar el hook
  useEffect(() => {
    fetchMaintenances();
  }, [fetchMaintenances]);

  return {
    // Estados
    maintenances,
    loading,
    error,

    // Funciones principales
    fetchMaintenances,
    refreshMaintenances,
    createMaintenance,
    deleteMaintenance,
  };
};