import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const DateInput = ({ label, value, onChangeDate }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.dateInput}>
        <Text style={styles.dateText}>{value}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
  },
  dateInput: {
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  dateText: {
    fontSize: 16,
    color: '#0369A1',
    fontWeight: '500',
  },
});

export default DateInput;