import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

const { width, height } = Dimensions.get('window');

export default function EmployeeDetailsModal({ visible, empleado, onClose, onUpdate, isEditing = false }) {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    contrasena: '',
    dui: '',
    telefono: '',
    rol: 'Empleado',
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    if (empleado) {
      setFormData({
        nombre: empleado.nombre || '',
        email: empleado.email || '',
        contrasena: empleado.contrasena || '',
        dui: empleado.dui || '',
        telefono: empleado.telefono || '',
        rol: empleado.rol || 'Empleado',
      });
    }
  }, [empleado]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdate = () => {
    if (formData.nombre.trim() && formData.email.trim()) {
      onUpdate(formData);
      setShowSuccessModal(true);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    onClose();
  };

  const getInitials = (nombre) => {
    return nombre
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const roles = ['Administrador', 'Gestor', 'Empleado'];

  if (showSuccessModal) {
    return (
      <Modal
        visible={visible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleSuccessClose}
      >
        <View style={styles.overlay}>
          <View style={styles.successContainer}>
            <View style={styles.successIcon}>
              <Ionicons name="checkmark" size={32} color="white" />
            </View>
            <Text style={styles.successTitle}>¡Empleado actualizado!</Text>
            <Text style={styles.successMessage}>El empleado se actualiza satisfactoriamente</Text>
            <TouchableOpacity
              style={styles.okButton}
              onPress={handleSuccessClose}
            >
              <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <View style={styles.modalContainer}>
            <View style={styles.header}>
              <TouchableOpacity onPress={onClose}>
                <Ionicons name="chevron-back" size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.title}>Detalles</Text>
              <View style={{ width: 24 }} />
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
              <View style={styles.avatarContainer}>
                {empleado?.foto ? (
                  <Image source={{ uri: empleado.foto }} style={styles.avatar} />
                ) : (
                  <View style={styles.avatarPlaceholder}>
                    <Text style={styles.avatarText}>{getInitials(empleado?.nombre || '')}</Text>
                  </View>
                )}
              </View>

              <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Nombre del empleado</Text>
                  <TextInput
                    style={[styles.input, !isEditing && styles.disabledInput]}
                    value={formData.nombre}
                    onChangeText={(value) => handleInputChange('nombre', value)}
                    editable={isEditing}
                    placeholder="Nombre completo"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Correo electrónico</Text>
                  <TextInput
                    style={[styles.input, !isEditing && styles.disabledInput]}
                    value={formData.email}
                    onChangeText={(value) => handleInputChange('email', value)}
                    editable={isEditing}
                    placeholder="correo@empresa.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Contraseña</Text>
                  <TextInput
                    style={[styles.input, !isEditing && styles.disabledInput]}
                    value={formData.contrasena}
                    onChangeText={(value) => handleInputChange('contrasena', value)}
                    editable={isEditing}
                    secureTextEntry={true}
                  />
                </View>

                <View style={styles.row}>
                  <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
                    <Text style={styles.label}>DUI</Text>
                    <TextInput
                      style={[styles.input, !isEditing && styles.disabledInput]}
                      value={formData.dui}
                      onChangeText={(value) => handleInputChange('dui', value)}
                      editable={isEditing}
                      placeholder="00000000-0"
                    />
                  </View>

                  <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
                    <Text style={styles.label}>Rol</Text>
                    {isEditing ? (
                      <View style={styles.pickerContainer}>
                        <Picker
                          selectedValue={formData.rol}
                          onValueChange={(value) => handleInputChange('rol', value)}
                          style={styles.picker}
                        >
                          {roles.map((rol) => (
                            <Picker.Item key={rol} label={rol} value={rol} />
                          ))}
                        </Picker>
                      </View>
                    ) : (
                      <TextInput
                        style={[styles.input, styles.disabledInput]}
                        value={formData.rol}
                        editable={false}
                      />
                    )}
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Teléfono</Text>
                  <TextInput
                    style={[styles.input, !isEditing && styles.disabledInput]}
                    value={formData.telefono}
                    onChangeText={(value) => handleInputChange('telefono', value)}
                    editable={isEditing}
                    placeholder="0000-0000"
                    keyboardType="phone-pad"
                  />
                </View>
              </View>
            </ScrollView>

            <View style={styles.footer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={onClose}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.updateButton]}
                onPress={handleUpdate}
              >
                <Text style={styles.updateButtonText}>Actualizar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  keyboardView: {
    width: '100%',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: height * 0.9,
    minHeight: height * 0.7,
  },
  header: {
    backgroundColor: '#5B9BD5',
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: 'cover',
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#666',
  },
  formContainer: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
  },
  disabledInput: {
    backgroundColor: '#F5F5F5',
    color: '#666',
  },
  row: {
    flexDirection: 'row',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#FAFAFA',
  },
  picker: {
    height: 50,
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#B22222',
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  updateButton: {
    backgroundColor: '#5B9BD5',
  },
  updateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  // Success Modal Styles
  successContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    marginHorizontal: 32,
  },
  successIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#27AE60',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  okButton: {
    backgroundColor: '#27AE60',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  okButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});