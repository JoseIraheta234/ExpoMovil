import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import Marcas from './src/screens/Marcas/Marcas';

export default function App() {
  return (
    <>
      <StatusBar style="light" backgroundColor="#4A90E2" />
      <Marcas />
    </>
  );
}