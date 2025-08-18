import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CustomCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 3)); // Abril 2025

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Días vacíos al inicio
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Días del mes
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const getDayStyle = (day) => {
    if (!day) return null;
    
    // Días destacados según la imagen
    if (day === 6) return styles.selectedStartDay; // Día de inicio
    if (day === 7 || day === 8 || day === 9) return styles.selectedMiddleDay; // Días intermedios
    if (day === 10) return styles.selectedEndDay; // Día final
    if (day === 18) return styles.highlightedDay; // Día destacado en amarillo
    if (day === 19 || day === 20 || day === 21 || day === 22) return styles.yellowDay; // Días en amarillo
    
    return styles.normalDay;
  };

  const getDayTextStyle = (day) => {
    if (!day) return null;
    
    if (day >= 6 && day <= 10) return styles.selectedDayText;
    if (day >= 18 && day <= 22) return styles.yellowDayText;
    
    return styles.normalDayText;
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <View style={styles.container}>
      {/* Header del calendario */}
      <View style={styles.calendarHeader}>
        <TouchableOpacity 
          onPress={() => navigateMonth(-1)}
          style={styles.navButton}
        >
          <Ionicons name="chevron-back" size={20} color="#6B7280" />
        </TouchableOpacity>
        
        <Text style={styles.monthYear}>
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </Text>
        
        <TouchableOpacity 
          onPress={() => navigateMonth(1)}
          style={styles.navButton}
        >
          <Ionicons name="chevron-forward" size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>

      {/* Días de la semana */}
      <View style={styles.weekHeader}>
        {dayNames.map((day, index) => (
          <View key={index} style={styles.weekDay}>
            <Text style={styles.weekDayText}>{day}</Text>
          </View>
        ))}
      </View>

      {/* Calendario */}
      <View style={styles.calendar}>
        {days.map((day, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.day, getDayStyle(day)]}
            disabled={!day}
          >
            {day && (
              <Text style={getDayTextStyle(day)}>
                {day}
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  navButton: {
    padding: 8,
  },
  monthYear: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  weekHeader: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  weekDay: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  weekDayText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  day: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2,
  },
  normalDay: {
    backgroundColor: 'transparent',
  },
  selectedStartDay: {
    backgroundColor: '#3B82F6',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  selectedMiddleDay: {
    backgroundColor: '#3B82F6',
  },
  selectedEndDay: {
    backgroundColor: '#3B82F6',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  highlightedDay: {
    backgroundColor: '#FDE047',
    borderRadius: 20,
  },
  yellowDay: {
    backgroundColor: '#FDE047',
  },
  normalDayText: {
    fontSize: 16,
    color: '#374151',
  },
  selectedDayText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
  yellowDayText: {
    fontSize: 16,
    color: '#92400E',
    fontWeight: '600',
  },
});

export default CustomCalendar;