import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Image,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AgregarMarcaModal = ({ visible, onClose, onSave }) => {
  const [nombre, setNombre] = useState('');
  const [logo, setLogo] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!nombre.trim()) {
      Alert.alert('Error', 'El nombre de la marca es requerido');
      return;
    }

    setLoading(true);
    
    const nuevaMarca = {
      nombre: nombre.trim(),
      logo: logo.trim() || 'https://via.placeholder.com/100x100?text=Logo'
    };

    const result = await onSave(nuevaMarca);
    
    if (result.success) {
      // Mostrar modal de éxito
      setNombre('');
      setLogo('');
      onClose();
      // Aquí se mostraría el modal de éxito
      setTimeout(() => {
        Alert.alert('¡Éxito!', 'Marca guardada correctamente');
      }, 500);
    } else {
      Alert.alert('Error', 'No se pudo guardar la marca');
    }
    
    setLoading(false);
  };

  const handleCancel = () => {
    if (nombre.trim() || logo.trim()) {
      // Mostrar modal de confirmación antes de cancelar
      Alert.alert(
        '¿Estás seguro?',
        'Los datos no han sido guardados. ¿Deseas salir sin guardar?',
        [
          {
            text: 'Regresar',
            style: 'default',
          },
          {
            text: 'Sí, estoy seguro',
            style: 'destructive',
            onPress: () => {
              setNombre('');
              setLogo('');
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
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleCancel}
    >
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleCancel}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Marcas</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Título del formulario */}
          <View style={styles.formHeader}>
            <Text style={styles.formTitle}>Agregar marca</Text>
          </View>

          {/* Formulario */}
          <View style={styles.form}>
            {/* Campo Logo */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Logo de marca</Text>
              <TextInput
                style={styles.input}
                value={logo}
                onChangeText={setLogo}
                placeholder="URL del logo (opcional)"
                placeholderTextColor="#8E8E93"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Vista previa del logo */}
            {logo && (
              <View style={styles.logoPreview}>
                <Image
                  source={{ uri: logo }}
                  style={styles.logoImage}
                  resizeMode="contain"
                  onError={() => {
                    Alert.alert('Error', 'No se pudo cargar la imagen del logo');
                  }}
                />
              </View>
            )}

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

            {/* Icono de upload */}
            <View style={styles.uploadSection}>
              <View style={styles.uploadIcon}>
                <Ionicons name="cloud-upload-outline" size={40} color="#8E8E93" />
              </View>
            </View>
          </View>
        </ScrollView>

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
              {loading ? 'Guardando...' : 'Guardar'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#4A90E2',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  formHeader: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E5E9',
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    textAlign: 'center',
  },
  form: {
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  inputGroup: {
    marginBottom: 20,
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#2C3E50',
    backgroundColor: '#FFFFFF',
  },
  logoPreview: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
  },
  logoImage: {
    width: 80,
    height: 80,
  },
  uploadSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  uploadIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E1E5E9',
    borderStyle: 'dashed',
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E1E5E9',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#4A90E2',
  },
  saveButton: {
    backgroundColor: '#27AE60',
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AgregarMarcaModal;