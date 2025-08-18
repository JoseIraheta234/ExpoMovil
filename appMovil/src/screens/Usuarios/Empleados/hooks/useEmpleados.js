import { useState } from 'react';

// Datos simulados iniciales de empleados
const initialEmpleados = [
  {
    id: '1',
    nombre: 'Carlos Martínez',
    email: 'carlos.martinez@empresa.com',
    contrasena: '••••••••••••',
    dui: '123456789-0',
    telefono: '1234-5678',
    foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    rol: 'Administrador',
    activo: true,
  },
  {
    id: '2',
    nombre: 'Sofía Hernández',
    email: 'sofia.hernandez@empresa.com',
    contrasena: '••••••••••••',
    dui: '987654321-0',
    telefono: '5678-1234',
    foto: 'https://images.unsplash.com/photo-1494790108755-2616c27ca8b9?w=150&h=150&fit=crop&crop=face',
    rol: 'Gestor',
    activo: true,
  },
  {
    id: '3',
    nombre: 'Gabriela Méndez',
    email: 'gabriela.mendez@empresa.com',
    contrasena: '••••••••••••',
    dui: '456789123-0',
    telefono: '9876-5432',
    foto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    rol: 'Empleado',
    activo: true,
  },
  {
    id: '4',
    nombre: 'Patricio Alvarado',
    email: 'patricio.alvarado@empresa.com',
    contrasena: '••••••••••••',
    dui: '321654987-0',
    telefono: '2468-1357',
    foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    rol: 'Gestor',
    activo: true,
  },
  {
    id: '5',
    nombre: 'Carlos Martínez',
    email: 'carlos.martinez2@empresa.com',
    contrasena: '••••••••••••',
    dui: '789123456-0',
    telefono: '3579-2468',
    foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    rol: 'Empleado',
    activo: false,
  },
  {
    id: '6',
    nombre: 'Ana García',
    email: 'ana.garcia@empresa.com',
    contrasena: '••••••••••••',
    dui: '147258369-0',
    telefono: '1357-9246',
    foto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    rol: 'Administrador',
    activo: true,
  },
];

export const useEmpleados = () => {
  const [empleados, setEmpleados] = useState(initialEmpleados);

  const addEmpleado = (empleadoData) => {
    const newEmpleado = {
      id: Date.now().toString(),
      nombre: empleadoData.nombre,
      email: empleadoData.email,
      contrasena: empleadoData.contrasena || '••••••••••••',
      dui: empleadoData.dui || '',
      telefono: empleadoData.telefono || '',
      foto: empleadoData.foto || null,
      rol: empleadoData.rol || 'Empleado',
      activo: true,
    };
    
    setEmpleados(prevEmpleados => [...prevEmpleados, newEmpleado]);
  };

  const updateEmpleado = (id, empleadoData) => {
    setEmpleados(prevEmpleados =>
      prevEmpleados.map(empleado =>
        empleado.id === id
          ? {
              ...empleado,
              nombre: empleadoData.nombre || empleado.nombre,
              email: empleadoData.email || empleado.email,
              contrasena: empleadoData.contrasena || empleado.contrasena,
              dui: empleadoData.dui || empleado.dui,
              telefono: empleadoData.telefono || empleado.telefono,
              foto: empleadoData.foto || empleado.foto,
              rol: empleadoData.rol || empleado.rol,
            }
          : empleado
      )
    );
  };

  const deleteEmpleado = (id) => {
    setEmpleados(prevEmpleados => prevEmpleados.filter(empleado => empleado.id !== id));
  };

  const getEmpleadoById = (id) => {
    return empleados.find(empleado => empleado.id === id);
  };

  const searchEmpleados = (query) => {
    if (!query) return empleados;
    
    return empleados.filter(empleado =>
      empleado.nombre.toLowerCase().includes(query.toLowerCase()) ||
      empleado.email.toLowerCase().includes(query.toLowerCase()) ||
      empleado.rol.toLowerCase().includes(query.toLowerCase())
    );
  };

  return {
    empleados,
    addEmpleado,
    updateEmpleado,
    deleteEmpleado,
    getEmpleadoById,
    searchEmpleados,
  };
};