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
    <View style={styles.card}>
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: marca.logo }}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      
      <View style={styles.content}>
        <Text style={styles.nombre}>{marca.nombre}</Text>
        
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.actionButton, styles.editButton]}
            onPress={() => onEdit(marca)}
            activeOpacity={0.7}
          >
            <Ionicons name="pencil" size={16} color="#4A90E2" />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() => onDelete(marca)}
            activeOpacity={0.7}
          >
            <Ionicons name="trash" size={16} color="#E74C3C" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  logo: {
    width: 45,
    height: 45,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nombre: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
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