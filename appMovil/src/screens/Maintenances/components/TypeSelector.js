import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const MaintenanceTypeSelector = ({ maintenanceType, onSelectType }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tipo de mantenimiento</Text>
      
      <TouchableOpacity style={styles.typeSelector}>
        <Text style={styles.selectedType}>{maintenanceType}</Text>
      </TouchableOpacity>
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
    color: '#9CA3AF',
    marginBottom: 12,
  },
  typeSelector: {
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  selectedType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0369A1',
  },
});

export default MaintenanceTypeSelector;