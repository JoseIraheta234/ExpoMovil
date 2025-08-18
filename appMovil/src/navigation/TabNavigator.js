import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Platform, View, Text } from 'react-native';

// Importar las pantallas
import HomeScreen from '../screens/HomeScreen';
import Marcas from '../screens/Marcas/Marcas';
import MaintenanceScreen from '../screens/Maintenances/Maintenance';
import ProfileScreen from '../screens/ProfileScreen';
import Usuarios from '../screens/Usuarios/Usuarios';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Marcas') {
            iconName = focused ? 'car-sport' : 'car-sport-outline';
          } else if (route.name === 'Maintenance') {
            iconName = focused ? 'construct' : 'construct-outline';
          } else if (route.name === 'Users') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4A90E2',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E1E1E1',
          paddingBottom: Platform.OS === 'ios' ? 20 : 5,
          paddingTop: 5,
          height: Platform.OS === 'ios' ? 85 : 60,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3.84,
          elevation: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: -2,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Inicio',
          title: 'Inicio'
        }}
      />
      <Tab.Screen
        name="Marcas"
        component={Marcas}
        options={{
          tabBarLabel: 'Marcas',
          title: 'Marcas'
        }}
      />
      <Tab.Screen
        name="Maintenance"
        component={MaintenanceScreen}
        options={{
          tabBarLabel: 'Mantenimiento',
          title: 'Mantenimiento'
        }}
      />
      <Tab.Screen
        name="Users"
        component={Usuarios}
        options={{
          tabBarLabel: 'Usuarios',
          title: 'Usuarios'
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Perfil',
          title: 'Perfil'
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;