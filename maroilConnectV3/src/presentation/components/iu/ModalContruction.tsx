import {Button, Layout} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {Modal, SafeAreaView} from 'react-native';
import {FullScreenContruction} from './FullScreenContruction';

interface MyModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  message: string;
}

export const ModalContruction: React.FC<MyModalProps> = ({
  modalVisible,
  setModalVisible,
  message,
}) => {
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    if (modalVisible) {
      // Use a timeout to delay the rendering of the content
      const timeoutId = setTimeout(() => {
        setContentVisible(true);
      }, 100); // Adjust the delay as needed

      // Clean up the timeout when the component is unmounted or when 'modalVisible' changes
      return () => clearTimeout(timeoutId);
    } else {
      setContentVisible(false);
    }
  }, [modalVisible]);

  return (
    <Modal visible={modalVisible} animationType="slide">
      <Layout
        style={{
          flex: 1,
        }}>
        {contentVisible && (
          <SafeAreaView style={{flex: 1}}>
            <Button onPress={() => setModalVisible(false)}>Cerrar</Button>
            <Layout
              style={{
                backgroundColor: 'red',
                flex: 1,
              }}>
              <FullScreenContruction message={message} />
            </Layout>
          </SafeAreaView>
        )}
      </Layout>
    </Modal>
  );
};
