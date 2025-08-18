import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ReservationCard = ({
  reservation,
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
    if (!reservation.vehicleId) {
      return 'https://via.placeholder.com/160x100/E5E7EB/9CA3AF?text=Sin+Vehiculo';
    }
    
    // PRIORIDAD: Usar sideImage primero
    if (reservation.vehicleId?.sideImage) {
      return reservation.vehicleId.sideImage;
    }
    // Fallback a mainViewImage si no hay sideImage
    if (reservation.vehicleId?.mainViewImage) {
      return reservation.vehicleId.mainViewImage;
    }
    // Fallback a primera imagen de galería
    if (reservation.vehicleId?.galleryImages && reservation.vehicleId.galleryImages.length > 0) {
      return reservation.vehicleId.galleryImages[0];
    }
    // Placeholder como último recurso
    return 'https://via.placeholder.com/160x100/E5E7EB/9CA3AF?text=Auto';
  };

  const getVehicleName = () => {
    if (!reservation.vehicleId) {
      return 'Vehículo no asignado';
    }
    return reservation.vehicleId?.vehicleName || 'Vehículo sin nombre';
  };

  const getClientName = () => {
    // Usar el campo client que es un array con los datos del cliente beneficiario
    if (reservation.client && reservation.client.length > 0) {
      return reservation.client[0].name;
    }
    // Fallback al cliente por populate
    if (reservation.clientId) {
      return `${reservation.clientId.name || ''} ${reservation.clientId.lastName || ''}`.trim() || 'Cliente';
    }
    return 'Cliente sin nombre';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return '#10B981'; // Verde
      case 'Pending':
        return '#F59E0B'; // Amarillo/Naranja
      case 'Completed':
        return '#3B82F6'; // Azul
      default:
        return '#6B7280'; // Gris
    }
  };

  const getDaysDifference = () => {
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.returnDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const status = reservation.status;
  const statusText = getStatusText(reservation.status);
  const statusColor = getStatusColor(status);

  return (
    <View style={styles.container}>
      {/* Header con nombre del cliente */}
      <View style={styles.header}>
        <View style={styles.clientInfo}>
          <Text style={styles.clientName}>{getClientName()}</Text>
          <Text style={styles.reservationLabel}>Reservación múltiple</Text>
        </View>
        <View style={[styles.statusIndicator, { backgroundColor: statusColor }]} />
      </View>

      {/* Contenido principal */}
      <View style={styles.content}>
        {/* Imagen del vehículo */}
        <Image
          source={{ uri: getVehicleImage() }}
          style={styles.vehicleImage}
          resizeMode="cover"
        />
        
        {/* Información de la reserva */}
        <View style={styles.reservationInfo}>
          <Text style={styles.vehicleName}>{getVehicleName()}</Text>
          
          {/* Fechas */}
          <View style={styles.dateContainer}>
            <View style={styles.dateItem}>
              <Ionicons name="calendar-outline" size={16} color="#6B7280" />
              <Text style={styles.dateText}>
                {formatDate(reservation.startDate)} - {formatDate(reservation.returnDate)}
              </Text>
            </View>
          </View>

          {/* Precio y días */}
          <View style={styles.priceInfo}>
            <Text style={styles.price}>${reservation.pricePerDay}/día</Text>
            <Text style={styles.days}>• {getDaysDifference()} día{getDaysDifference() !== 1 ? 's' : ''}</Text>
          </View>

          {/* Estado */}
          <View style={styles.statusContainer}>
            <Text style={[styles.statusText, { color: statusColor }]}>
              {statusText}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F8FAFC',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  clientInfo: {
    flex: 1,
  },
  clientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 2,
  },
  reservationLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  content: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  vehicleImage: {
    width: 100,
    height: 70,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
  },
  reservationInfo: {
    flex: 1,
    marginLeft: 16,
  },
  vehicleName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  dateContainer: {
    marginBottom: 8,
  },
  dateItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    marginLeft: 6,
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  priceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: '#059669',
  },
  days: {
    fontSize: 13,
    color: '#64748B',
    marginLeft: 8,
  },
  statusContainer: {
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});

export default ReservationCard;