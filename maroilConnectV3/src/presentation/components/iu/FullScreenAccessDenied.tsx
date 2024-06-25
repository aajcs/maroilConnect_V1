import {Layout, Spinner, Text} from '@ui-kitten/components';
import {MyIcon} from './MyIcon';

export const FullScreenAccessDenied = () => {
  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text category="h1">Acceso denegado</Text>
      <MyIcon name="alert-triangle-outline" />
      <Text category="p1">No tienes permisos para acceder a esta pantalla</Text>
      <Text category="p1">Por favor, contacta al administrador</Text>
    </Layout>
  );
};
