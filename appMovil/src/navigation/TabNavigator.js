import React, { useState, useRef, useEffect } from 'react';
import * as Animatable from 'react-native-animatable';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, TouchableOpacity, Text, StyleSheet, Platform, Modal } from 'react-native';

// Importar las pantallas
import HomeScreen from '../screens/HomeScreen';
import Marcas from '../screens/Marcas/Marcas';
import MaintenanceScreen from '../screens/Maintenances/Maintenance';
import ReservationScreen from '../screens/Reservations/Reservation';
import ProfileScreen from '../screens/ProfileScreen';
import Usuarios from '../screens/Usuarios/Usuarios';

const Tab = createBottomTabNavigator();

// Definición de los tabs con iconos y componentes
const TabArr = [
  { route: 'Home', label: 'Inicio', icon: 'home', component: HomeScreen },
  { route: 'Marcas', label: 'Marcas', icon: 'car-sport', component: Marcas },
  { route: 'Maintenance', label: 'Mantto.', icon: 'construct', component: MaintenanceScreen, title: 'Mantenimiento' },
  { route: 'Reservations', label: 'Reservas', icon: 'calendar', component: ReservationScreen },
  { route: 'Users', label: 'Usuarios', icon: 'people', component: Usuarios, hidden: true },
  { route: 'Profile', label: 'Perfil', icon: 'person', component: ProfileScreen, hidden: true },
];

// Animaciones para el tab
const animate1 = { 0: { scale: .5, translateY: 7 }, .92: { translateY: -10 }, 1: { scale: 1.05, translateY: -6 } };
const animate2 = { 0: { scale: 1.05, translateY: -6 }, 1: { scale: 1, translateY: 7 } };

// Animación de círculos
const circle1 = {
  0: { scale: 0, opacity: 0 },
  0.2: { scale: 0.7, opacity: 0.7 },
  0.5: { scale: 1.05, opacity: 1 },
  0.7: { scale: 0.95, opacity: 1 },
  1: { scale: 1, opacity: 1 }
};
const circle2 = {
  0: { scale: 1, opacity: 1 },
  1: { scale: 0, opacity: 0 }
};

// Componente de botón animado para el tab
const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current?.animate(animate1);
      circleRef.current?.animate(circle1);
    } else {
      viewRef.current?.animate(animate2);
      circleRef.current?.animate(circle2);
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={stylesAnim.container}
    >
      <Animatable.View
        ref={viewRef}
        duration={700}
        style={[stylesAnim.container, { justifyContent: 'center', alignItems: 'center' }]}
      >
        <View style={{ alignItems: 'center', justifyContent: 'flex-end', flex: 1 }}>
          <View style={[stylesAnim.btn, { borderColor: '#fff', backgroundColor: '#fff', marginBottom: 0 }]}> 
            <Animatable.View
              ref={circleRef}
              style={[stylesAnim.circle, { backgroundColor: '#4A90E2' }]}
              duration={500}
              useNativeDriver
            />
            <Ionicons 
              name={item.icon + (focused ? '' : '-outline')} 
              size={28} 
              color={focused ? '#fff' : '#4A90E2'} 
            />
          </View>
          <Text
            ref={textRef}
            style={[stylesAnim.text, { color: '#4A90E2', opacity: 1, marginTop: -6, marginBottom: 0 }]}
          >
            {item.label}
          </Text>
        </View>
      </Animatable.View>
    </TouchableOpacity>
  );
};

// Componente de submenu/popout
const MorePopout = ({ visible, onClose, navigation }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableOpacity style={styles.popoutOverlay} activeOpacity={1} onPress={onClose}>
        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
          <View style={styles.popoutWrapper}>
            <View style={styles.popoutContent}>
              <TouchableOpacity style={styles.popoutRow} onPress={() => { onClose(); navigation.navigate('Users'); }}>
                <Ionicons name="people" size={36} color="#4A90E2" style={styles.popoutIcon} />
                <Text style={styles.popoutItem}>Usuarios</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.popoutRow} onPress={() => { onClose(); navigation.navigate('Profile'); }}>
                <Ionicons name="person" size={36} color="#4A90E2" style={styles.popoutIcon} />
                <Text style={styles.popoutItem}>Perfil</Text>
              </TouchableOpacity>
            </View>
            <View pointerEvents="none" style={styles.popoutArrow} />
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

// Componente principal del Tab Navigator
const TabNavigator = () => {
  const [showMore, setShowMore] = useState(false);
  const navigation = useNavigation();

  // TabBar personalizado
  const CustomTabBar = (props) => (
    <>
      <View style={stylesAnim.tabBar}>
        {props.state.routes.map((route, index) => {
          // Oculta los tabs que no deben mostrarse
          const item = TabArr.find(t => t.route === route.name);
          if (item?.hidden) return null;
          return (
            <TabButton
              key={route.key}
              {...props}
              item={item}
              onPress={() => props.navigation.navigate(route.name)}
              accessibilityState={{ selected: props.state.index === index }}
            />
          );
        })}
        {/* Botón Ver más al final del tabBar */}
        <TouchableOpacity
          style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 8 }}
          onPress={() => setShowMore(true)}
          activeOpacity={0.7}
        >
          <View style={{ 
            backgroundColor: '#fff', 
            borderRadius: 20, 
            width: 44, 
            height: 44, 
            alignItems: 'center', 
            justifyContent: 'center', 
            shadowColor: '#000', 
            shadowOffset: { width: 0, height: 1 }, 
            shadowOpacity: 0.10, 
            shadowRadius: 2, 
            elevation: 2 
          }}>
            <Ionicons name="ellipsis-vertical" size={28} color="#4A90E2" />
          </View>
          <Text style={{ color: '#4A90E2', fontWeight: 'bold', fontSize: 12, marginTop: 2 }}>
            Ver más
          </Text>
        </TouchableOpacity>
      </View>
      <MorePopout
        visible={showMore}
        onClose={() => setShowMore(false)}
        navigation={props.navigation}
      />
    </>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Header superior removido - ya no se muestra "Mi App" */}
      
      {/* Tab Navigator con animación personalizada y tabBar custom */}
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerStyle: { 
            backgroundColor: '#4A90E2', 
            elevation: 0, 
            shadowOpacity: 0, 
            borderBottomWidth: 0, 
            height: 25 
          },
          headerTitleStyle: { 
            color: '#fff', 
            fontWeight: 'bold', 
            padding: 0, 
            margin: 0 
          },
          headerTintColor: '#fff',
        })}
        tabBar={CustomTabBar}
      >
        {/* Definición de las pantallas del tab */}
        {TabArr.map((item, idx) => (
          <Tab.Screen
            key={item.route}
            name={item.route}
            component={item.component}
            options={{
              title: item.title || item.label,
              tabBarButton: item.hidden ? () => null : undefined,
            }}
          />
        ))}
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default TabNavigator;

// Estilos para el popout (los estilos del header ya no son necesarios)
const styles = StyleSheet.create({
  // Estilos para el popout
  popoutOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.08)',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  popoutWrapper: {
    position: 'absolute',
    right: 12,
    bottom: 80,
    alignItems: 'flex-end',
    zIndex: 100,
  },
  popoutContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 2,
    paddingHorizontal: 6,
    minWidth: 130,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 6,
    alignItems: 'flex-start',
  },
  popoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    width: '100%',
  },
  popoutIcon: {
    marginRight: 8,
    alignSelf: 'flex-start',
  },
  popoutItem: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  popoutArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderTopWidth: 16,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#fff',
    marginRight: 8,
    marginTop: -8,
    alignSelf: 'flex-end',
  },
});

// Estilos para el navbar animado
const stylesAnim = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 70,
    paddingBottom: 8.5,
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    paddingHorizontal: 8,
    height: Platform.OS === 'ios' ? 80 : 70,
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: '#fff',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4A90E2',
    borderRadius: 25,
    zIndex: -1,
  },
  text: {
    fontSize: 11,
    textAlign: 'center',
    color: '#4A90E2',
    fontWeight: 'bold',
    marginTop: 0,
    marginBottom: 0,
    padding: 0,
    maxWidth: 60,
  },
});