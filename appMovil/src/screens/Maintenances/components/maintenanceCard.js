import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MaintenanceCard = ({
  maintenance,
  onDelete,
  getStatusColor,
  getStatusText
}) => {

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getVehicleImage = () => {
    // Aquí puedes agregar lógica para obtener la imagen del vehículo
    // Por ahora, usamos una imagen por defecto
    return 'https://via.placeholder.com/120x80/CCCCCC/666666?text=Vehicle';
  };

  const statusColor = getStatusColor(maintenance.status);
  const statusText = getStatusText(maintenance.status);

  return (
    <View style={styles.container}>
      {/* Status Badge */}
      <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
        <View style={styles.statusDot} />
        <Text style={styles.statusText}>{statusText}</Text>
      </View>

      {/* Vehicle Info */}
      <View style={styles.vehicleInfo}>
        <Text style={styles.vehicleName}>
          {maintenance.vehicleId?.name || 'Vehículo sin nombre'}
        </Text>
        <Text style={styles.maintenanceType}>{maintenance.maintenanceType}</Text>
      </View>

      {/* Dates */}
      <View style={styles.datesContainer}>
        <View style={styles.dateItem}>
          <Ionicons name="calendar-outline" size={16} color="#666" />
          <Text style={styles.dateText}>{formatDate(maintenance.startDate)}</Text>
        </View>
        <View style={styles.dateItem}>
          <Ionicons name="calendar-outline" size={16} color="#666" />
          <Text style={styles.dateText}>{formatDate(maintenance.returnDate)}</Text>
        </View>
      </View>

      {/* Vehicle Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: getVehicleImage() }}
          style={styles.vehicleImage}
          resizeMode="cover"
        />
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={onDelete}
        >
          <Ionicons name="trash-outline" size={20} color="#ff4444" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 12,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'white',
    marginRight: 6,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  vehicleInfo: {
    marginBottom: 16,
  },
  vehicleName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  maintenanceType: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '500',
  },
  datesContainer: {
    marginBottom: 16,
  },
  dateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dateText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  imageContainer: {
    alignSelf: 'flex-end',
    position: 'absolute',
    right: 16,
    top: 60,
  },
  vehicleImage: {
    width: 120,
    height: 80,
    borderRadius: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 16,
  },
  actionButton: {
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#fff5f5',
  },
});

export default MaintenanceCard;