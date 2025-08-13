import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MarcaCard = ({ marca, onEdit, onDelete }) => {
  return (
    <View style={styles.cardContainer}>
      {/* Logo grande */}
      <View style={styles.logoSection}>
        <Image
          source={{ uri: marca.logo }}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      
      {/* Nombre y botones */}
      <View style={styles.bottomSection}>
        <Text style={styles.nombre}>{marca.nombre}</Text>
        
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.actionButton, styles.editButton]}
            onPress={() => onEdit(marca)}
            activeOpacity={0.7}
          >
            <Ionicons name="pencil" size={14} color="#4A90E2" />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() => onDelete(marca)}
            activeOpacity={0.7}
          >
            <Ionicons name="trash" size={14} color="#E74C3C" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '47%', // Para que quepan 2 por fila
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    margin: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoSection: {
    backgroundColor: '#F8F9FA', // Fondo claro para los logos
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 80,
  },
  logo: {
    width: 60,
    height: 40,
    // Sin tintColor para mostrar los logos con sus colores originales
  },
  bottomSection: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nombre: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    gap: 6,
  },
  actionButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  editButton: {
    backgroundColor: '#EBF3FD',
    borderColor: '#4A90E2',
  },
  deleteButton: {
    backgroundColor: '#FDEBEB',
    borderColor: '#E74C3C',
  },
});

export default MarcaCard;