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
    'Consultoria Juridica',
    'Direcciòn Ejecutiva',
    'Finanzas',
    'Gerencia General',
    'Imagen Y Comunicaciòn',
    'Ingenieria Y Construccion',
    'Maroil Services',
    'Operaciones Maritimas',
    'Operaciones Petrocedeño',
    'Operaciones Terrestres',
    'Planificaciòn Y Gestiòn Estrategica',
    'Procura',
    'Proyectos',
    'Relaciones Laborales',
    'Seguridad Estrategica Operacional',
    'Servicios Logisticos',
    'Siho-A',
    'Talento Humano',
    'Equipos Moviles',
    'Instrumentación',
    'Mantenimiento Electrico',
    'Mantenimiento Mecanico',
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
                <Button onPress={toggleModal}>"Cerrar"</Button>
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
