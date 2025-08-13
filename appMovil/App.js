import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

// Importar las pantallas
import HomeScreen from '../appMovil/src/screens/HomeScreen';
import Marcas from './src/screens/Marcas/Marcas';
import MaintenanceScreen from './src/screens/Maintenances/Maintenance';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2196F3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ 
            title: 'Pantalla Principal',
            headerStyle: {
              backgroundColor: '#1976D2',
            }
          }} 
        />
        <Stack.Screen 
          name="Marcas" 
          component={Marcas} 
          options={{ 
            headerShown: false // La pantalla Marcas tiene su propio header
          }} 
        />
        <Stack.Screen 
          name="Maintenance" 
          component={MaintenanceScreen} 
          options={{ 
            headerShown: false // La pantalla Maintenance tiene su propio header
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}