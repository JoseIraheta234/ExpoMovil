import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  Animated
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EditarMarcaModal = ({ visible, onClose, onSave, marca }) => {
  const [nombre, setNombre] = useState('');
  const [logo, setLogo] = useState('');
  const [loading, setLoading] = useState(false);
  
  const scaleAnim = new Animated.Value(0);
  const opacityAnim = new Animated.Value(0);

  // Llenar los campos cuando se selecciona una marca para editar
  useEffect(() => {
    if (marca) {
      setNombre(marca.nombre || '');
      setLogo(marca.logo || '');
    }
  }, [marca]);

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start();
    } else {
      scaleAnim.setValue(0);
      opacityAnim.setValue(0);
    }
  }, [visible]);

  const handleSave = async () => {
    if (!nombre.trim()) {
      Alert.alert('Error', 'El nombre de la marca es requerido');
      return;
    }

    setLoading(true);
    
    const marcaActualizada = {
      nombre: nombre.trim(),
      logo: logo.trim() || marca?.logo || 'https://via.placeholder.com/100x100?text=Logo'
    };

    const result = await onSave(marca.id, marcaActualizada);
    
    if (result.success) {
      onClose();
    } else {
      Alert.alert('Error', 'No se pudo actualizar la marca');
    }
    
    setLoading(false);
  };

  const handleCancel = () => {
    // Verificar si hubo cambios
    const hasChanges = nombre !== (marca?.nombre || '') || logo !== (marca?.logo || '');
    
    if (hasChanges) {
      Alert.alert(
        '¿Estás seguro?',
        'Los cambios no han sido guardados. ¿Deseas salir sin guardar?',
        [
          {
            text: 'Regresar',
            style: 'default',
          },
          {
            text: 'Sí, estoy seguro',
            style: 'destructive',
            onPress: () => {
              // Restaurar valores originales
              setNombre(marca?.nombre || '');
              setLogo(marca?.logo || '');
              onClose();
            },
          },
        ]
      );
    } else {
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={handleCancel}
    >
      <View style={styles.overlay}>
        <Animated.View 
          style={[
            styles.modalContainer,
            {
              transform: [{ scale: scaleAnim }],
              opacity: opacityAnim,
            }
          ]}
        >
          {/* Título */}
          <Text style={styles.title}>Editar marca</Text>

          {/* Campo Logo de marca */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Logo de marca</Text>
            <TextInput
              style={styles.input}
              value={logo}
              onChangeText={setLogo}
              placeholder="URL del logo"
              placeholderTextColor="#8E8E93"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Vista previa del logo */}
          <View style={styles.logoPreview}>
            {(logo || marca?.logo) ? (
              <Image
                source={{ uri: logo || marca?.logo }}
                style={styles.logoImage}
                resizeMode="contain"
                onError={() => {
                  Alert.alert('Error', 'No se pudo cargar la imagen del logo');
                }}
              />
            ) : (
              <View style={styles.uploadIcon}>
                <Ionicons name="cloud-upload-outline" size={40} color="#8E8E93" />
              </View>
            )}
          </View>

          {/* Campo Nombre */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre</Text>
            <TextInput
              style={styles.input}
              value={nombre}
              onChangeText={setNombre}
              placeholder="Nombre de la marca"
              placeholderTextColor="#8E8E93"
              autoCapitalize="words"
              autoCorrect={false}
            />
          </View>

          {/* Botones */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={handleCancel}
              activeOpacity={0.8}
              disabled={loading}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={handleSave}
              activeOpacity={0.8}
              disabled={loading}
            >
              <Text style={styles.saveButtonText}>
                {loading ? 'Actualizando...' : 'Actualizar'}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 20,
    width: '90%',
    maxWidth: 350,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4A90E2',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4A90E2',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E1E5E9',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#2C3E50',
    backgroundColor: '#FFFFFF',
  },
  logoPreview: {
    alignItems: 'center',
    marginVertical: 16,
    paddingVertical: 20,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E1E5E9',
  },
  logoImage: {
    width: 60,
    height: 60,
  },
  uploadIcon: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#E74C3C',
  },
  saveButton: {
    backgroundColor: '#4A90E2',
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default EditarMarcaModal;