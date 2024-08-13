import {useEffect, useState} from 'react';
import {Platform, Text, View} from 'react-native';
import {
  solicitudPermisoNotificacionesAndroid,
  solicitudPermisoNotificacionesIos,
} from '../utils/solicitudPermisoNotificaciones';
import {Button} from '@ui-kitten/components';
import AwesomeAlert from 'react-native-awesome-alerts';
// import messaging from '@react-native-firebase/messaging';

export const NotificacionesScreen = () => {
  const [visible, setVisible] = useState(false);
  // console.log('visible', visible);
  // const fcmToken = async () => {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   if (enabled) {
  //     console.log('Authorization status:', authStatus);
  //     const token = await messaging().getToken();
  //     console.log('User FCM token:', token);
  //   }
  // };
  return (
    <View>
      <Text>NotificacionesScreen</Text>
      <Button onPress={() => setVisible(true)}>Activar notificaciones</Button>
      <AwesomeAlert
        show={visible}
        title="Activar notificaciones"
        message="¿Quieres activar las notificaciones de maroil connect?"
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="No, cancelar"
        confirmText="Sí, confirmar"
        onDismiss={() => {
          // Aquí puedes realizar la acción que desees cuando se toca fuera de la alerta
          // console.log('Tocado fuera de la alerta');
          setVisible(false);
        }}
        onCancelPressed={() => {
          setVisible(false);
        }}
        onConfirmPressed={() => {
          // fcmToken();
          Platform.OS === 'ios'
            ? solicitudPermisoNotificacionesIos()
            : solicitudPermisoNotificacionesAndroid();
          setVisible(false);
          // formik.handleSubmit();
        }}
      />
    </View>
  );
};
