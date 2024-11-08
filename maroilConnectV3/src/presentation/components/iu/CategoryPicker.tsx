import React from 'react';
import {Platform, View, Modal} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Button} from '@ui-kitten/components';

interface CategoryPickerProps {
  categories?: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  visible: boolean;
  toggleModal: () => void;
}

export const CategoryPicker: React.FC<CategoryPickerProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  visible,
  toggleModal,
}) => {
  const categoriesLocal = categories || [
    'Maroil Connect',
    'A.I.T.',
    'Consultoría Jurídica',
    'Dirección Ejecutiva',
    'Finanzas',
    'Gerencia General',
    'Imagen y Comunicación',
    'Ingeniería y Construcción',
    'Maroil Services',
    'Operaciones Marítimas',
    'Operaciones Petrocedeño',
    'Operaciones Terrestres',
    'Planificación y Gestión Estratégica',
    'Procura',
    'Proyectos',
    'Relaciones Laborales',
    'Seguridad Estratégica Operacional',
    'Servicios Logísticos',
    'Siho-A',
    'Talento Humano',
    'Equipos Móviles',
    'Instrumentación',
    'Mantenimiento Eléctrico',
    'Mantenimiento Mecánico',
  ];

  return (
    <>
      {Platform.OS === 'ios' && (
        <>
          <Button
            onPress={toggleModal}
            appearance="outline"
            status="basic"
            style={{marginTop: 10}}>
            {selectedCategory}
          </Button>
          <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={toggleModal}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  padding: 0,
                  borderRadius: 10,
                  width: '90%',
                }}>
                <Picker
                  selectedValue={selectedCategory}
                  onValueChange={onCategoryChange}>
                  {categoriesLocal.map((categoriaPost, index) => (
                    <Picker.Item
                      label={categoriaPost}
                      value={categoriaPost}
                      key={index}
                    />
                  ))}
                </Picker>
                <Button onPress={toggleModal}>Cerrar</Button>
              </View>
            </View>
          </Modal>
        </>
      )}
      {Platform.OS !== 'ios' && (
        <Picker
          selectedValue={selectedCategory}
          onValueChange={onCategoryChange}>
          {categoriesLocal.map((categoriaPost, index) => (
            <Picker.Item
              label={categoriaPost}
              value={categoriaPost}
              key={index}
            />
          ))}
        </Picker>
      )}
    </>
  );
};
