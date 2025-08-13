import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';

const HomeScreen = ({ navigation }) => {
  const menuButtons = [
    {
      title: 'Marcas',
      subtitle: 'Gestionar marcas de vehículos',
      screen: 'Marcas',
      color: '#4A90E2',
      icon: '🚗'
    },
    {
      title: 'Mantenimientos',
      subtitle: 'Control de mantenimientos',
      screen: 'Maintenance',
      color: '#E74C3C',
      icon: '🔧'
    }
  ];

  const renderButton = (button, index) => (
    <TouchableOpacity
      key={index}
      style={[styles.menuButton, { borderLeftColor: button.color }]}
      onPress={() => navigation.navigate(button.screen)}
      activeOpacity={0.7}
    >
      <View style={styles.buttonContent}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{button.icon}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.buttonTitle}>{button.title}</Text>
          <Text style={styles.buttonSubtitle}>{button.subtitle}</Text>
        </View>
        <View style={styles.arrowContainer}>
          <Text style={styles.arrow}>›</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>¡Bienvenido!</Text>
          <Text style={styles.descriptionText}>
            Selecciona una opción para continuar
          </Text>
        </View>

        <View style={styles.menuContainer}>
          {menuButtons.map((button, index) => renderButton(button, index))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            React Native + Expo App
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  menuContainer: {
    flex: 1,
  },
  menuButton: {
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 12,
    borderLeftWidth: 4,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    marginRight: 15,
  },
  icon: {
    fontSize: 24,
  },
  textContainer: {
    flex: 1,
  },
  buttonTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  buttonSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  arrowContainer: {
    marginLeft: 10,
  },
  arrow: {
    fontSize: 20,
    color: '#999',
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: 30,
  },
  footerText: {
    fontSize: 12,
    color: '#999',
  },
});

export default HomeScreen;