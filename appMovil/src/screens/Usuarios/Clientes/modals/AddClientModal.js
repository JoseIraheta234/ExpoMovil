import React, { useState } from 'react';
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
  Alert,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';

const { width, height } = Dimensions.get('window');

export default function AddClientModal({ visible, onClose, onConfirm }) {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    birthDate: new Date(),
    licenseFront: '',
    licenseBack: '',
    passportFront: '',
    passportBack: '',
    foto: '',
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const pickImage = async (field) => {
    // Pedir permisos
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permisos necesarios', 'Se necesitan permisos para acceder a la galería de fotos.');
      return;
    }

    // Abrir selector de imágenes
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: field === 'foto' ? [1, 1] : [4, 3],
      quality: 0.7,
    });

    if (!result.canceled) {
      handleInputChange(field, result.assets[0].uri);
    }
  };

  const takePhoto = async (field) => {
    // Pedir permisos de cámara
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permisos necesarios', 'Se necesitan permisos para acceder a la cámara.');
      return;
    }

    // Abrir cámara
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: field === 'foto' ? [1, 1] : [4, 3],
      quality: 0.7,
    });

    if (!result.canceled) {
      handleInputChange(field, result.assets[0].uri);
    }
  };

  const showImageOptions = (field) => {
    Alert.alert(
      'Seleccionar imagen',
      'Elige una opción',
      [
        {
          text: 'Cámara',
          onPress: () => takePhoto(field),
        },
        {
          text: 'Galería',
          onPress: () => pickImage(field),
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ]
    );
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFormData(prev => ({
        ...prev,
        birthDate: selectedDate,
      }));
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleSave = () => {
    if (formData.name.trim() && formData.lastName.trim() && formData.email.trim() && 
        formData.password.trim() && formData.phone.trim()) {
      setShowConfirmationModal(true);
    } else {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios (nombre, apellido, email, contraseña y teléfono)');
    }
  };

  const handleConfirmSave = () => {
    setShowConfirmationModal(false);
    onConfirm(formData);
    setShowSuccessModal(true);
  };

  const   handleSuccessClose = () => {
    setShowSuccessModal(false);
    setFormData({
      name: '',
      lastName: '',
      email: '',
      password: '',
      phone: '',
      birthDate: new Date(),
      licenseFront: '',
      licenseBack: '',
      passportFront: '',
      passportBack: '',
      foto: '',
    });
    onClose();
  };

  const handleClose = () => {
    setFormData({
      name: '',
      lastName: '',
      email: '',
      password: '',
      phone: '',
      birthDate: new Date(),
      licenseFront: '',
      licenseBack: '',
      passportFront: '',
      passportBack: '',
      foto: '',
    });
    onClose();
  };

  // Modal de confirmación
  if (showConfirmationModal) {
    return (
      <Modal
        visible={visible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowConfirmationModal(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.confirmationContainer}>
            <View style={styles.questionIcon}>
              <Ionicons name="help" size={32} color="white" />
            </View>
            <Text style={styles.confirmationTitle}>¿Estás seguro?</Text>
            <Text style={styles.confirmationMessage}>
              Los datos no se han guardado todavía ¿estás seguro que quieres continuar?
            </Text>
            <View style={styles.confirmationButtons}>
              <TouchableOpacity
                style={[styles.button, styles.confirmationCancelButton]}
                onPress={() => setShowConfirmationModal(false)}
              >
                <Text style={styles.cancelButtonText}>Regresar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.confirmationConfirmButton]}
                onPress={handleConfirmSave}
              >
                <Text style={styles.confirmButtonText}>Sí, estoy seguro</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  // Modal de éxito
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
            <Text style={styles.successTitle}>¡Nuevo cliente guardado!</Text>
            <Text style={styles.successMessage}>El cliente se ha guardado satisfactoriamente</Text>
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
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <View style={styles.modalContainer}>
            <View style={styles.header}>
              <TouchableOpacity onPress={handleClose}>
                <Ionicons name="chevron-back" size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.title}>Añadir cliente</Text>
              <View style={{ width: 24 }} />
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
              <View style={styles.iconContainer}>
                <TouchableOpacity 
                  style={styles.photoUploadButton}
                  onPress={() => showImageOptions('foto')}
                >
                  {formData.foto ? (
                    <Image source={{ uri: formData.foto }} style={styles.photoPreview} />
                  ) : (
                    <Ionicons name="camera" size={32} color="#5B9BD5" />
                  )}
                </TouchableOpacity>
              </View>

              <View style={styles.formContainer}>
                <View style={styles.row}>
                  <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
                    <Text style={styles.label}>Nombre *</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="María"
                      value={formData.name}
                      onChangeText={(value) => handleInputChange('name', value)}
                      autoCapitalize="words"
                    />
                  </View>

                  <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
                    <Text style={styles.label}>Apellido *</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="González"
                      value={formData.lastName}
                      onChangeText={(value) => handleInputChange('lastName', value)}
                      autoCapitalize="words"
                    />
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Correo electrónico *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="maria.gonzalez@email.com"
                    value={formData.email}
                    onChangeText={(value) => handleInputChange('email', value)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Contraseña *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="••••••••••••"
                    value={formData.password}
                    onChangeText={(value) => handleInputChange('password', value)}
                    secureTextEntry={true}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Teléfono *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="1234-5678"
                    value={formData.phone}
                    onChangeText={(value) => handleInputChange('phone', value)}
                    keyboardType="phone-pad"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Fecha de nacimiento *</Text>
                  <TouchableOpacity
                    style={styles.dateInput}
                    onPress={() => setShowDatePicker(true)}
                  >
                    <Text style={styles.dateText}>
                      {formatDate(formData.birthDate)}
                    </Text>
                    <Ionicons name="calendar" size={20} color="#666" />
                  </TouchableOpacity>
                  {showDatePicker && (
                    <DateTimePicker
                      value={formData.birthDate}
                      mode="date"
                      display="default"
                      onChange={handleDateChange}
                      maximumDate={new Date()}
                    />
                  )}
                </View>

                <Text style={styles.sectionTitle}>Documentos (Opcional)</Text>

                <View style={styles.row}>
                  <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
                    <Text style={styles.label}>Licencia (Frente)</Text>
                    <TouchableOpacity 
                      style={styles.documentButton}
                      onPress={() => showImageOptions('licenseFront')}
                    >
                      <Ionicons name="camera" size={20} color="#5B9BD5" />
                      <Text style={styles.documentButtonText}>
                        {formData.licenseFront ? 'Cambiar foto' : 'Subir foto'}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
                    <Text style={styles.label}>Licencia (Reverso)</Text>
                    <TouchableOpacity 
                      style={styles.documentButton}
                      onPress={() => showImageOptions('licenseBack')}
                    >
                      <Ionicons name="camera" size={20} color="#5B9BD5" />
                      <Text style={styles.documentButtonText}>
                        {formData.licenseBack ? 'Cambiar foto' : 'Subir foto'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.row}>
                  <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
                    <Text style={styles.label}>Pasaporte (Frente)</Text>
                    <TouchableOpacity 
                      style={styles.documentButton}
                      onPress={() => showImageOptions('passportFront')}
                    >
                      <Ionicons name="camera" size={20} color="#5B9BD5" />
                      <Text style={styles.documentButtonText}>
                        {formData.passportFront ? 'Cambiar foto' : 'Subir foto'}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
                    <Text style={styles.label}>Pasaporte (Reverso)</Text>
                    <TouchableOpacity 
                      style={styles.documentButton}
                      onPress={() => showImageOptions('passportBack')}
                    >
                      <Ionicons name="camera" size={20} color="#5B9BD5" />
                      <Text style={styles.documentButtonText}>
                        {formData.passportBack ? 'Cambiar foto' : 'Subir foto'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ScrollView>

            <View style={styles.footer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={handleClose}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={handleSave}
              >
                <Text style={styles.saveButtonText}>Guardar</Text>
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
  iconContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  photoUploadButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0F8FF',
    borderWidth: 2,
    borderColor: '#5B9BD5',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  photoPreview: {
    width: 76,
    height: 76,
    borderRadius: 38,
    resizeMode: 'cover',
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
  row: {
    flexDirection: 'row',
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FAFAFA',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 20,
    marginBottom: 16,
  },
  documentButton: {
    borderWidth: 1,
    borderColor: '#5B9BD5',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F0F8FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  documentButtonText: {
    color: '#5B9BD5',
    fontSize: 14,
    fontWeight: '500',
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
  saveButton: {
    backgroundColor: '#27AE60',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  // Confirmation Modal Styles
  confirmationContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    marginHorizontal: 32,
  },
  questionIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F39C12',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  confirmationTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  confirmationMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  confirmationButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  confirmationCancelButton: {
    backgroundColor: '#95A5A6',
    paddingHorizontal: 16,
  },
  confirmationConfirmButton: {
    backgroundColor: '#5B9BD5',
    paddingHorizontal: 16,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 14,
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