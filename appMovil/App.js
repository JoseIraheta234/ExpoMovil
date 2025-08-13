import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

// Importar las pantallas
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/HomeScreen';
import AboutScreen from './src/screens/HomeScreen';

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
          name="Profile" 
          component={ProfileScreen} 
          options={{ title: 'Perfil' }} 
        />
        <Stack.Screen 
          name="Settings" 
          component={SettingsScreen} 
          options={{ title: 'Configuración' }} 
        />
        <Stack.Screen 
          name="About" 
          component={AboutScreen} 
          options={{ title: 'Acerca de' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}