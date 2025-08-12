import { useState, useEffect } from 'react';

// Datos simulados para las marcas
const marcasSimuladas = [
  {
    id: 1,
    nombre: 'Nissan',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Nissan_logo.svg/200px-Nissan_logo.svg.png',
    activa: true
  },
  {
    id: 2,
    nombre: 'Hyundai',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Hyundai_Motor_Company_logo.svg/200px-Hyundai_Motor_Company_logo.svg.png',
    activa: true
  },
  {
    id: 3,
    nombre: 'Chevrolet',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Chevrolet_logo.svg/200px-Chevrolet_logo.svg.png',
    activa: true
  },
  {
    id: 4,
    nombre: 'Toyota',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Toyota.svg/200px-Toyota.svg.png',
    activa: true
  },
  {
    id: 5,
    nombre: 'Mazda',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Mazda_logo.svg/200px-Mazda_logo.svg.png',
    activa: true
  },
  {
    id: 6,
    nombre: 'Jeep',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Jeep_logo.svg/200px-Jeep_logo.svg.png',
    activa: true
  }
];

export const useMarcas = () => {
  const [marcas, setMarcas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Simular fetch inicial
  useEffect(() => {
    fetchMarcas();
  }, []);

  const fetchMarcas = async () => {
    setLoading(true);
    try {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMarcas(marcasSimuladas);
      setError(null);
    } catch (err) {
      setError('Error al cargar las marcas');
    } finally {
      setLoading(false);
    }
  };

  // Filtrar marcas basado en la búsqueda
  const marcasFiltradas = marcas.filter(marca =>
    marca.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const agregarMarca = async (nuevaMarca) => {
    setLoading(true);
    try {
      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const marca = {
        id: Date.now(),
        ...nuevaMarca,
        activa: true
      };
      setMarcas(prev => [...prev, marca]);
      return { success: true, data: marca };
    } catch (err) {
      setError('Error al agregar la marca');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const editarMarca = async (id, datosActualizados) => {
    setLoading(true);
    try {
      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setMarcas(prev => 
        prev.map(marca => 
          marca.id === id ? { ...marca, ...datosActualizados } : marca
        )
      );
      return { success: true };
    } catch (err) {
      setError('Error al editar la marca');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const eliminarMarca = async (id) => {
    setLoading(true);
    try {
      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setMarcas(prev => prev.filter(marca => marca.id !== id));
      return { success: true };
    } catch (err) {
      setError('Error al eliminar la marca');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    marcas: marcasFiltradas,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    fetchMarcas,
    agregarMarca,
    editarMarca,
    eliminarMarca
  };
};