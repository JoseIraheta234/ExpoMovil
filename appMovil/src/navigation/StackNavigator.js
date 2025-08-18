import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';

// Importar la nueva pantalla
import AddMaintenanceScreen from '../screens/Maintenances/AddMaintenance';

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
      
      {/* Pantalla para agregar mantenimiento */}
      <Stack.Screen
        name="AddMaintenance"
        component={AddMaintenanceScreen}
        options={{
          headerShown: false,
          presentation: 'card',
          gestureEnabled: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;