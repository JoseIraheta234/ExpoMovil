import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import VehicleSelector from './components/VehicleSelector';
import MaintenanceTypeSelector from './components/TypeSelector';
import StatusSelector from './components/StatusSelector';
import CustomCalendar from './components/CustomCalendar';
import DateInput from './components/DateInput';

const AddMaintenanceScreen = ({ navigation }) => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [maintenanceType, setMaintenanceType] = useState('Cambio de aceite');
  const [startDate, setStartDate] = useState('6 / 04 / 2025');
  const [endDate, setEndDate] = useState('10 / 04 / 2025');
  const [status, setStatus] = useState('Activa');

  const handleBack = () => {
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleSave = () => {
    // Aquí implementarás la lógica para guardar
    console.log('Guardando mantenimiento...');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Añadir mantenimiento</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Vehicle Selector */}
        <VehicleSelector 
          selectedVehicle={selectedVehicle}
          onSelectVehicle={setSelectedVehicle}
        />

        {/* Maintenance Type */}
        <MaintenanceTypeSelector 
          maintenanceType={maintenanceType}
          onSelectType={setMaintenanceType}
        />

        {/* Status Selector */}
        <StatusSelector 
          selectedStatus={status}
          onSelectStatus={setStatus}
        />

        {/* Calendar */}
        <CustomCalendar />

        {/* Date Inputs */}
        <View style={styles.dateSection}>
          <DateInput 
            label="Fecha de inicio"
            value={startDate}
            onChangeDate={setStartDate}
          />
          <DateInput 
            label="Fecha de devolución"
            value={endDate}
            onChangeDate={setEndDate}
          />
        </View>

        {/* Status Options */}
        <View style={styles.statusOptions}>
          <Text style={styles.statusLabel}>Estado de reserva</Text>
          <TouchableOpacity 
            style={[styles.statusOption, status === 'Activa' && styles.statusActive]}
            onPress={() => setStatus('Activa')}
          >
            <View style={[styles.statusDot, status === 'Activa' && styles.statusDotActive]} />
            <Text style={[styles.statusText, status === 'Activa' && styles.statusTextActive]}>
              Activa
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.statusOption, status === 'Pendiente' && styles.statusActive]}
            onPress={() => setStatus('Pendiente')}
          >
            <View style={[styles.statusDot, status === 'Pendiente' && styles.statusDotPending]} />
            <Text style={[styles.statusText, status === 'Pendiente' && styles.statusTextPending]}>
              Pendiente
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.statusOption, status === 'Finalizada' && styles.statusActive]}
            onPress={() => setStatus('Finalizada')}
          >
            <View style={[styles.statusDot, status === 'Finalizada' && styles.statusDotCompleted]} />
            <Text style={[styles.statusText, status === 'Finalizada' && styles.statusTextCompleted]}>
              Finalizada
            </Text>
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={handleCancel}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  dateSection: {
    marginBottom: 24,
  },
  statusOptions: {
    marginBottom: 32,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 16,
  },
  statusOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  statusActive: {
    borderColor: '#10B981',
    backgroundColor: '#F0FDF4',
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#D1D5DB',
    marginRight: 12,
  },
  statusDotActive: {
    backgroundColor: '#10B981',
  },
  statusDotPending: {
    backgroundColor: '#F59E0B',
  },
  statusDotCompleted: {
    backgroundColor: '#3B82F6',
  },
  statusText: {
    fontSize: 16,
    color: '#6B7280',
  },
  statusTextActive: {
    color: '#10B981',
    fontWeight: '600',
  },
  statusTextPending: {
    color: '#F59E0B',
    fontWeight: '600',
  },
  statusTextCompleted: {
    color: '#3B82F6',
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    paddingBottom: 32,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#DC2626',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#10B981',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddMaintenanceScreen;