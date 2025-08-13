import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  RefreshControl,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MaintenanceCard from '../Maintenances/components/maintenanceCard';
import { useFetchMaintenances } from '../Maintenances/hooks/useFetchMaintenances';

const MaintenanceScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [filteredMaintenances, setFilteredMaintenances] = useState([]);
  
  const {
    maintenances,
    loading,
    error,
    refreshMaintenances,
    deleteMaintenance
  } = useFetchMaintenances();

  useEffect(() => {
    if (maintenances) {
      filterMaintenances();
    }
  }, [maintenances, searchText]);

  const filterMaintenances = () => {
    if (!searchText.trim()) {
      setFilteredMaintenances(maintenances || []);
      return;
    }

    const filtered = maintenances?.filter(maintenance => {
      const vehicleName = maintenance.vehicleId?.name?.toLowerCase() || '';
      const vehicleBrand = maintenance.vehicleId?.brand?.toLowerCase() || '';
      const maintenanceType = maintenance.maintenanceType?.toLowerCase() || '';
      const searchLower = searchText.toLowerCase();

      return vehicleName.includes(searchLower) ||
             vehicleBrand.includes(searchLower) ||
             maintenanceType.includes(searchLower);
    }) || [];

    setFilteredMaintenances(filtered);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return '#4CAF50';
      case 'Pending': return '#FF9800';
      case 'Completed': return '#2196F3';
      default: return '#757575';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'Active': return 'Activa';
      case 'Pending': return 'Pendiente';
      case 'Completed': return 'Finalizada';
      default: return status;
    }
  };

  const handleAddMaintenance = () => {
    navigation.navigate('AddMaintenance');
  };

  const handleDeleteMaintenance = async (id) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que deseas eliminar este mantenimiento?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteMaintenance(id);
              Alert.alert('Éxito', 'Mantenimiento eliminado correctamente');
            } catch (error) {
              Alert.alert('Error', 'No se pudo eliminar el mantenimiento');
            }
          }
        }
      ]
    );
  };

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error al cargar mantenimientos</Text>
          <TouchableOpacity onPress={refreshMaintenances} style={styles.retryButton}>
            <Text style={styles.retryText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerSubtitle}>Mantenimiento</Text>
          <Text style={styles.headerTitle}>Revisión al día.</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name="person-circle-outline" size={32} color="white" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar"
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#999"
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options" size={20} color="#4A90E2" />
        </TouchableOpacity>
      </View>

      {/* Add Maintenance Button */}
      <View style={styles.addButtonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddMaintenance}
        >
          <Text style={styles.addButtonText}>Agregar mantenimiento</Text>
          <Ionicons name="add" size={20} color="#4A90E2" />
        </TouchableOpacity>
      </View>

      {/* Maintenance List */}
      <ScrollView
        style={styles.scrollContainer}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refreshMaintenances}
            colors={['#4A90E2']}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {filteredMaintenances.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {searchText ? 'No se encontraron mantenimientos' : 'No hay mantenimientos registrados'}
            </Text>
          </View>
        ) : (
          filteredMaintenances.map((maintenance) => (
            <MaintenanceCard
              key={maintenance._id}
              maintenance={maintenance}
              onDelete={() => handleDeleteMaintenance(maintenance._id)}
              getStatusColor={getStatusColor}
              getStatusText={getStatusText}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerContent: {
    flex: 1,
  },
  headerSubtitle: {
    color: 'white',
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 5,
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileButton: {
    marginTop: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 10,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  filterButton: {
    backgroundColor: 'white',
    borderRadius: 25,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    color: '#4A90E2',
    fontSize: 16,
    fontWeight: '600',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#ff4444',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  retryText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MaintenanceScreen;