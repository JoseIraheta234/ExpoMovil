import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useMarcas } from './hooks/useMarcas';
import MarcaCard from './components/MarcaCard';
import SearchBar from './components/SearchBar';
import AgregarMarcaModal from './modals/AgregarMarcaModal';
import EditarMarcaModal from './modals/EditarMarcaModal';
import EliminarMarcaModal from './modals/EliminarMarcaModal';
import SuccessModal from './modals/SuccessModal';
import SuccessUpdateModal from './modals/SuccessUpdateModal';
import SuccessDeleteModal from './modals/SuccessDeleteModal';
import ConfirmationModal from './modals/ConfirmationModal';

const Marcas = ({ navigation }) => {
  const {
    marcas,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    agregarMarca,
    editarMarca,
    eliminarMarca
  } = useMarcas();

  // Estados para los modals
  const [showAgregarModal, setShowAgregarModal] = useState(false);
  const [showEditarModal, setShowEditarModal] = useState(false);
  const [showEliminarModal, setShowEliminarModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showSuccessUpdateModal, setShowSuccessUpdateModal] = useState(false);
  const [showSuccessDeleteModal, setShowSuccessDeleteModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [confirmationData, setConfirmationData] = useState(null);
  const [selectedMarca, setSelectedMarca] = useState(null);

  const handleEdit = (marca) => {
    setSelectedMarca(marca);
    setShowEditarModal(true);
  };

  const handleDelete = (marca) => {
    setSelectedMarca(marca);
    setShowEliminarModal(true);
  };

  const handleConfirmDelete = async (id) => {
    const result = await eliminarMarca(id);
    setShowEliminarModal(false);
    
    if (result.success) {
      setShowSuccessDeleteModal(true);
    } else {
      Alert.alert('Error', 'No se pudo eliminar la marca');
    }
  };

  const handleAddPress = () => {
    setShowAgregarModal(true);
  };

  const handleSaveMarca = async (nuevaMarca) => {
    const result = await agregarMarca(nuevaMarca);
    if (result.success) {
      setSuccessMessage('Se ha agregado tu nueva marca en el sistema');
      setShowSuccessModal(true);
      return { success: true };
    } else {
      return { success: false, error: result.error };
    }
  };

  const handleUpdateMarca = async (id, marcaActualizada) => {
    const result = await editarMarca(id, marcaActualizada);
    if (result.success) {
      setShowSuccessUpdateModal(true);
      return { success: true };
    } else {
      return { success: false, error: result.error };
    }
  };

  const renderMarcaCard = ({ item }) => (
    <MarcaCard
      marca={item}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="car" size={60} color="#8E8E93" />
      <Text style={styles.emptyText}>
        {searchQuery ? 'No se encontraron marcas' : 'No hay marcas disponibles'}
      </Text>
      <Text style={styles.emptySubtext}>
        {searchQuery ? 'Intenta con otro término de búsqueda' : 'Agrega una nueva marca para comenzar'}
      </Text>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation?.goBack()}
        activeOpacity={0.7}
      >
        <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Marcas</Text>
      <View style={styles.headerSpacer} />
    </View>
  );

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />
        {renderHeader()}
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={60} color="#E74C3C" />
          <Text style={styles.errorText}>Error al cargar las marcas</Text>
          <Text style={styles.errorSubtext}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />
      
      {renderHeader()}
      
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAddPress={handleAddPress}
      />

      {/* Texto informativo */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Actualiza tu gama de marcas sin complicaciones.
        </Text>
        <Text style={styles.allBrandsText}>Todas las marcas</Text>
      </View>

      <View style={styles.content}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4A90E2" />
            <Text style={styles.loadingText}>Cargando marcas...</Text>
          </View>
        ) : (
          <FlatList
            data={marcas}
            renderItem={renderMarcaCard}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            columnWrapperStyle={styles.row}
            ListEmptyComponent={renderEmptyState}
          />
        )}
      </View>

      {/* Modals */}
      <AgregarMarcaModal
        visible={showAgregarModal}
        onClose={() => setShowAgregarModal(false)}
        onSave={handleSaveMarca}
      />

      <EditarMarcaModal
        visible={showEditarModal}
        onClose={() => {
          setShowEditarModal(false);
          setSelectedMarca(null);
        }}
        onSave={handleUpdateMarca}
        marca={selectedMarca}
      />

      <EliminarMarcaModal
        visible={showEliminarModal}
        onClose={() => {
          setShowEliminarModal(false);
          setSelectedMarca(null);
        }}
        onConfirm={handleConfirmDelete}
        marca={selectedMarca}
      />

      <SuccessModal
        visible={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="¡Marca guardada!"
        message={successMessage}
      />

      <SuccessUpdateModal
        visible={showSuccessUpdateModal}
        onClose={() => setShowSuccessUpdateModal(false)}
        message="¡Se ha actualizado la marca!"
      />

      <SuccessDeleteModal
        visible={showSuccessDeleteModal}
        onClose={() => setShowSuccessDeleteModal(false)}
        message="¡Se ha eliminado la marca!"
      />

      <ConfirmationModal
        visible={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        onConfirm={() => {
          setShowConfirmationModal(false);
          // Ejecutar acción confirmada
          if (confirmationData?.action) {
            confirmationData.action();
          }
        }}
        title={confirmationData?.title}
        message={confirmationData?.message}
        confirmText={confirmationData?.confirmText}
        cancelText={confirmationData?.cancelText}
      />
    </SafeAreaView>
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
  infoContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: '#F8F9FA',
  },
  infoText: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 8,
  },
  allBrandsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },
  content: {
    flex: 1,
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    flexGrow: 1,
  },
  row: {
    justifyContent: 'space-around',
    paddingHorizontal: 6,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#8E8E93',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginTop: 16,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#E74C3C',
    marginTop: 16,
    textAlign: 'center',
  },
  errorSubtext: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default Marcas;