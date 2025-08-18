import { useState } from 'react';

// Datos simulados iniciales de clientes
const initialClientes = [
  {
    id: '1',
    name: 'María',
    lastName: 'González',
    email: 'maria.gonzalez@gmail.com',
    password: '••••••••••••',
    phone: '2345-6789',
    birthDate: '1990-05-15',
    licenseFront: 'license_front_1.jpg',
    licenseBack: 'license_back_1.jpg',
    passportFront: '',
    passportBack: '',
    foto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    activo: true,
    fechaRegistro: '2024-01-15',
  },
  {
    id: '2',
    name: 'Roberto',
    lastName: 'Pérez',
    email: 'roberto.perez@hotmail.com',
    password: '••••••••••••',
    phone: '7890-1234',
    birthDate: '1985-08-20',
    licenseFront: '',
    licenseBack: '',
    passportFront: 'passport_front_2.jpg',
    passportBack: 'passport_back_2.jpg',
    foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    activo: true,
    fechaRegistro: '2024-02-20',
  },
  {
    id: '3',
    name: 'Carmen',
    lastName: 'López',
    email: 'carmen.lopez@yahoo.com',
    password: '••••••••••••',
    phone: '4567-8901',
    birthDate: '1992-03-10',
    licenseFront: 'license_front_3.jpg',
    licenseBack: 'license_back_3.jpg',
    passportFront: 'passport_front_3.jpg',
    passportBack: 'passport_back_3.jpg',
    foto: 'https://images.unsplash.com/photo-1494790108755-2616c27ca8b9?w=150&h=150&fit=crop&crop=face',
    activo: true,
    fechaRegistro: '2024-03-10',
  },
  {
    id: '4',
    name: 'Diego',
    lastName: 'Ramírez',
    email: 'diego.ramirez@gmail.com',
    password: '••••••••••••',
    phone: '6789-0123',
    birthDate: '1988-12-05',
    licenseFront: '',
    licenseBack: '',
    passportFront: '',
    passportBack: '',
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
      name: clienteData.name,
      lastName: clienteData.lastName,
      email: clienteData.email,
      password: clienteData.password || '••••••••••••',
      phone: clienteData.phone || '',
      birthDate: clienteData.birthDate ? clienteData.birthDate.toISOString().split('T')[0] : '',
      licenseFront: clienteData.licenseFront || '',
      licenseBack: clienteData.licenseBack || '',
      passportFront: clienteData.passportFront || '',
      passportBack: clienteData.passportBack || '',
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
              name: clienteData.name || cliente.name,
              lastName: clienteData.lastName || cliente.lastName,
              email: clienteData.email || cliente.email,
              password: clienteData.password || cliente.password,
              phone: clienteData.phone || cliente.phone,
              birthDate: clienteData.birthDate ? clienteData.birthDate.toISOString().split('T')[0] : cliente.birthDate,
              licenseFront: clienteData.licenseFront !== undefined ? clienteData.licenseFront : cliente.licenseFront,
              licenseBack: clienteData.licenseBack !== undefined ? clienteData.licenseBack : cliente.licenseBack,
              passportFront: clienteData.passportFront !== undefined ? clienteData.passportFront : cliente.passportFront,
              passportBack: clienteData.passportBack !== undefined ? clienteData.passportBack : cliente.passportBack,
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
      cliente.name.toLowerCase().includes(query.toLowerCase()) ||
      cliente.lastName.toLowerCase().includes(query.toLowerCase()) ||
      cliente.email.toLowerCase().includes(query.toLowerCase())
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