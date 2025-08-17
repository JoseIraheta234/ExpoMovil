import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BrandCard from '../Marcas/components/BrandCard';
import AddBrandModal from '../Marcas/modals/AddBrandModal';
import EditBrandModal from '../Marcas/modals/EditBrandModal';
import DeleteBrandModal from '../Marcas/modals/DeleteBrandModal';
import SuccessModal from '../Marcas/modals/SuccessModal';
import ConfirmDeleteModal from '../Marcas/modals/ComfirmDeleteModal';
import { useMarcas } from '../Marcas/hooks/useMarcas';

const { width, height } = Dimensions.get('window');

export default function Marcas() {
  const { marcas, addMarca, updateMarca, deleteMarca } = useMarcas();
  const [modalType, setModalType] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const openModal = (type, brand = null) => {
    setModalType(type);
    setSelectedBrand(brand);
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedBrand(null);
  };

  const handleAddBrand = (brandData) => {
    addMarca(brandData);
    closeModal();
    setSuccessMessage('¡Marca guardada!');
    setModalType('success');
  };

  const handleEditBrand = (brandData) => {
    updateMarca(selectedBrand.id, brandData);
    closeModal();
    setSuccessMessage('¡Se ha actualizado la marca!');
    setModalType('success');
  };

  const handleDeleteBrand = () => {
    deleteMarca(selectedBrand.id);
    closeModal();
    setSuccessMessage('¡Se ha eliminado la marca!');
    setModalType('success');
  };

  const renderCards = () => {
    const cards = [];
    
    for (let i = 0; i < marcas.length; i += 2) {
      cards.push(
        <View key={`row-${i}`} style={styles.cardRow}>
          <BrandCard
            brand={marcas[i]}
            onEdit={() => openModal('edit', marcas[i])}
            onDelete={() => openModal('delete', marcas[i])}
          />
          {marcas[i + 1] && (
            <BrandCard
              brand={marcas[i + 1]}
              onEdit={() => openModal('edit', marcas[i + 1])}
              onDelete={() => openModal('delete', marcas[i + 1])}
            />
          )}
        </View>
      );
    }

    return cards;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#5B9BD5" />
      
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Marcas</Text>
        </View>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="menu" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Text style={styles.searchText}>Accede a tu catálogo de marcas aquí</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => openModal('add')}
        >
          <Ionicons name="add" size={24} color="#5B9BD5" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.cardsContainer}>
          {renderCards()}
        </View>
      </ScrollView>

      {modalType === 'add' && (
        <AddBrandModal
          visible={true}
          onClose={closeModal}
          onConfirm={handleAddBrand}
        />
      )}

      {modalType === 'edit' && (
        <EditBrandModal
          visible={true}
          brand={selectedBrand}
          onClose={closeModal}
          onConfirm={handleEditBrand}
        />
      )}

      {modalType === 'delete' && (
        <ConfirmDeleteModal
          visible={true}
          brand={selectedBrand}
          onClose={closeModal}
          onConfirm={handleDeleteBrand}
        />
      )}

      {modalType === 'success' && (
        <SuccessModal
          visible={true}
          message={successMessage}
          onClose={closeModal}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#5B9BD5',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  menuButton: {
    padding: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  searchText: {
    color: '#666',
    fontSize: 14,
    flex: 1,
  },
  addButton: {
    padding: 4,
  },
  scrollContainer: {
    flex: 1,
  },
  cardsContainer: {
    paddingVertical: 16,
    paddingBottom: 32,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 0,
  },
});