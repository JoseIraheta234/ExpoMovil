import { useState } from 'react';

// Datos simulados iniciales de clientes
const initialClientes = [
  {
    id: '1',
    nombre: 'María González',
    email: 'maria.gonzalez@gmail.com',
    telefono: '2345-6789',
    dui: '234567890-1',
    direccion: 'Col. Escalón, San Salvador',
    foto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    activo: true,
    fechaRegistro: '2024-01-15',
  },
  {
    id: '2',
    nombre: 'Roberto Pérez',
    email: 'roberto.perez@hotmail.com',
    telefono: '7890-1234',
    dui: '345678901-2',
    direccion: 'Col. San Benito, San Salvador',
    foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    activo: true,
    fechaRegistro: '2024-02-20',
  },
  {
    id: '3',
    nombre: 'Carmen López',
    email: 'carmen.lopez@yahoo.com',
    telefono: '4567-8901',
    dui: '456789012-3',
    direccion: 'Santa Tecla, La Libertad',
    foto: 'https://images.unsplash.com/photo-1494790108755-2616c27ca8b9?w=150&h=150&fit=crop&crop=face',
    activo: true,
    fechaRegistro: '2024-03-10',
  },
  {
    id: '4',
    nombre: 'Diego Ramírez',
    email: 'diego.ramirez@gmail.com',
    telefono: '6789-0123',
    dui: '567890123-4',
    direccion: 'Antiguo Cuscatlán, La Libertad',
    foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    activo: false,
    fechaRegistro: '2024-01-05',
  },
];

export const useClientes = () => {
  const [clientes, setClientes] = useState(initialClientes);

  const addCliente = (clienteData) => {
    const newCliente = {
      id: Date.now().toString(),
      nombre: clienteData.nombre,
      email: clienteData.email,
      telefono: clienteData.telefono || '',
      dui: clienteData.dui || '',
      direccion: clienteData.direccion || '',
      foto: clienteData.foto || null,
      activo: true,
      fechaRegistro: new Date().toISOString().split('T')[0],
    };
    
    setClientes(prevClientes => [...prevClientes, newCliente]);
  };

  const updateCliente = (id, clienteData) => {
    setClientes(prevClientes =>
      prevClientes.map(cliente =>
        cliente.id === id
          ? {
              ...cliente,
              nombre: clienteData.nombre || cliente.nombre,
              email: clienteData.email || cliente.email,
              telefono: clienteData.telefono || cliente.telefono,
              dui: clienteData.dui || cliente.dui,
              direccion: clienteData.direccion || cliente.direccion,
              foto: clienteData.foto || cliente.foto,
            }
          : cliente
      )
    );
  };

  const deleteCliente = (id) => {
    setClientes(prevClientes => prevClientes.filter(cliente => cliente.id !== id));
  };

  const getClienteById = (id) => {
    return clientes.find(cliente => cliente.id === id);
  };

  const searchClientes = (query) => {
    if (!query) return clientes;
    
    return clientes.filter(cliente =>
      cliente.nombre.toLowerCase().includes(query.toLowerCase()) ||
      cliente.email.toLowerCase().includes(query.toLowerCase()) ||
      cliente.direccion.toLowerCase().includes(query.toLowerCase())
    );
  };

  return {
    clientes,
    addCliente,
    updateCliente,
    deleteCliente,
    getClienteById,
    searchClientes,
  };
};