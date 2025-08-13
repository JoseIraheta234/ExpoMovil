import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';

// Pantallas modales o de stack que van por encima del TabNavigator
// Aquí puedes agregar pantallas como AddMaintenance, EditMaintenance, etc.

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* TabNavigator como pantalla principal */}
      <Stack.Screen
        name="MainTabs"
        component={TabNavigator}
      />
      
      {/* Aquí puedes agregar pantallas modales o de stack */}
      {/* 
      <Stack.Screen
        name="AddMaintenance"
        component={AddMaintenanceScreen}
        options={{
          headerShown: true,
          title: 'Agregar Mantenimiento',
          presentation: 'modal'
        }}
      />
      */}
    </Stack.Navigator>
  );
};

export default StackNavigator;  