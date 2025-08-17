import { useState } from 'react';

// Datos simulados iniciales - más marcas para una mejor demostración
const initialMarcas = [
  {
    id: '1',
    name: 'Nissan',
    logo: 'https://wallpapers.com/images/hd/nissan-automotive-brand-logo-gcfu8m53losfzum1.png',
    country: 'Japón',
    established: 1933,
    description: 'Marca japonesa conocida por su innovación y tecnología avanzada.',
  },
  {
    id: '2',
    name: 'Hyundai',
    logo: 'https://logos-world.net/wp-content/uploads/2021/03/Hyundai-Logo.png',
    country: 'Corea del Sur',
    established: 1967,
    description: 'Fabricante surcoreano con enfoque en la calidad y diseño moderno.',
  },
  {
    id: '3',
    name: 'Chevrolet',
    logo: 'https://logos-world.net/wp-content/uploads/2021/03/Chevrolet-Logo.png',
    country: 'Estados Unidos',
    established: 1911,
    description: 'Marca americana icónica con más de 100 años de historia.',
  },
  {
    id: '4',
    name: 'Toyota',
    logo: 'https://logos-world.net/wp-content/uploads/2020/04/Toyota-Logo.png',
    country: 'Japón',
    established: 1937,
    description: 'Líder mundial en producción automotriz y tecnología híbrida.',
  },
  {
    id: '5',
    name: 'Mazda',
    logo: 'https://logos-world.net/wp-content/uploads/2021/03/Mazda-Logo.png',
    country: 'Japón',
    established: 1920,
    description: 'Marca japonesa conocida por su tecnología SKYACTIV y diseño KODO.',
  },
  {
    id: '6',
    name: 'Jeep',
    logo: 'https://cdn.freebiesupply.com/logos/large/2x/jeep-7-logo-black-and-white.png',
    country: 'Estados Unidos',
    established: 1941,
    description: 'Especialista en vehículos todo terreno y SUV robustos.',
  },
  {
    id: '7',
    name: 'BMW',
    logo: 'https://logos-world.net/wp-content/uploads/2020/04/BMW-Logo.png',
    country: 'Alemania',
    established: 1916,
    description: 'Marca alemana premium conocida por su lujo y rendimiento.',
  },
  {
    id: '8',
    name: 'Mercedes-Benz',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5-z4sTXO0t9x_i9ziwEb5mPcsh-7dI6hOMg&s',
    country: 'Alemania',
    established: 1926,
    description: 'Símbolo de lujo y excelencia en la industria automotriz.',
  },
  {
    id: '9',
    name: 'Audi',
    logo: 'https://di-uploads-pod3.dealerinspire.com/vindeversautohausofsylvania/uploads/2018/10/Audi-Logo-Banner.png',
    country: 'Alemania',
    established: 1909,
    description: 'Innovación alemana con tecnología quattro y diseño elegante.',
  },
  {
    id: '10',
    name: 'Volkswagen',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Volkswagen_-_Logo.svg/2048px-Volkswagen_-_Logo.svg.png',
    country: 'Alemania',
    established: 1937,
    description: 'El auto del pueblo, marca alemana con gran presencia mundial.',
  }
];

export const useMarcas = () => {
  const [marcas, setMarcas] = useState(initialMarcas);

  const addMarca = (marcaData) => {
    const newMarca = {
      id: Date.now().toString(),
      name: marcaData.name,
      logo: marcaData.logo || null,
      country: marcaData.country || '',
      established: marcaData.established || new Date().getFullYear(),
      description: marcaData.description || '',
    };
    
    setMarcas(prevMarcas => [...prevMarcas, newMarca]);
  };

  const updateMarca = (id, marcaData) => {
    setMarcas(prevMarcas =>
      prevMarcas.map(marca =>
        marca.id === id
          ? {
              ...marca,
              name: marcaData.name,
              logo: marcaData.logo || marca.logo,
              country: marcaData.country || marca.country,
              established: marcaData.established || marca.established,
              description: marcaData.description || marca.description,
            }
          : marca
      )
    );
  };

  const deleteMarca = (id) => {
    setMarcas(prevMarcas => prevMarcas.filter(marca => marca.id !== id));
  };

  const getMarcaById = (id) => {
    return marcas.find(marca => marca.id === id);
  };

  const searchMarcas = (query) => {
    if (!query) return marcas;
    
    return marcas.filter(marca =>
      marca.name.toLowerCase().includes(query.toLowerCase()) ||
      marca.country.toLowerCase().includes(query.toLowerCase())
    );
  };

  return {
    marcas,
    addMarca,
    updateMarca,
    deleteMarca,
    getMarcaById,
    searchMarcas,
  };
};