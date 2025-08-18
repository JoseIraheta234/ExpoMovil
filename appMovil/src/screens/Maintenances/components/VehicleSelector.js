import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

const VehicleSelector = ({ selectedVehicle, onSelectVehicle }) => {
  // Datos de ejemplo - después conectarás con tu API
  const vehicles = [
    {
      id: 1,
      name: 'Nissan Navara (Frontier)',
      year: '2023',
      image: 'https://images.unsplash.com/photo-1619976215249-52d83ab4e8b9?w=300&h=200&fit=crop&auto=format',
      status: 'Disponible'
    },
    {
      id: 2,
      name: 'Nissan Navara',
      year: '2023',
      image: 'https://images.unsplash.com/photo-1619976215249-52d83ab4e8b9?w=300&h=200&fit=crop&auto=format',
      status: 'Disponible'
    }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vehículo a chequear</Text>
      
      <View style={styles.vehicleGrid}>
        {vehicles.map((vehicle) => (
          <TouchableOpacity
            key={vehicle.id}
            style={[
              styles.vehicleCard,
              selectedVehicle?.id === vehicle.id && styles.selectedCard
            ]}
            onPress={() => onSelectVehicle(vehicle)}
          >
            <View style={styles.statusBadge}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>{vehicle.status}</Text>
            </View>
            
            <Image 
              source={{ uri: vehicle.image }}
              style={styles.vehicleImage}
              resizeMode="cover"
            />
            
            <Text style={styles.vehicleName}>{vehicle.name}</Text>
            <Text style={styles.vehicleYear}>{vehicle.year}</Text>
            
            <View style={styles.vehicleDetails}>
              <View style={styles.detailItem}>
                <Text style={styles.detailIcon}>🏷️</Text>
                <Text style={styles.detailText}>Disponible</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailIcon}>⚙️</Text>
                <Text style={styles.detailText}>Automático</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 16,
  },
  vehicleGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  vehicleCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  selectedCard: {
    borderColor: '#4A90E2',
    borderWidth: 2,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '600',
  },
  vehicleImage: {
    width: '100%',
    height: 80,
    borderRadius: 12,
    marginBottom: 12,
  },
  vehicleName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  vehicleYear: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 12,
  },
  vehicleDetails: {
    gap: 4,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailIcon: {
    fontSize: 12,
    marginRight: 6,
  },
  detailText: {
    fontSize: 12,
    color: '#6B7280',
  },
});

export default VehicleSelector;