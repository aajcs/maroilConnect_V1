import {Button, Input, Layout, Text} from '@ui-kitten/components';
import {ScrollView, useWindowDimensions} from 'react-native';
import {MyIcon} from '../components/iu/MyIcon';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigations/MenuPrincipalNavigator';

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> {}
export const RegisterScreen = ({navigation}: Props) => {
  const {height} = useWindowDimensions();
  return (
    <Layout
      style={{
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
      }}>
      <ScrollView style={{marginHorizontal: 40}}>
        <Layout style={{paddingTop: height * 0.3}}>
          <Text category="h1">Crear cuenta</Text>
          <Text category="p2">Por favor, crea una cuenta para continuar</Text>
        </Layout>
        <Layout style={{marginTop: 20}}>
          <Input
            placeholder="Nombre completo"
            accessoryLeft={<MyIcon name="person-outline" />}
            style={{marginBottom: 10}}
          />
          <Input
            placeholder="Correo electronico"
            keyboardType="email-address"
            autoCapitalize="none"
            accessoryLeft={<MyIcon name="email-outline" />}
            style={{marginTop: 10}}
          />
          <Input
            placeholder="Contraseña"
            autoCapitalize="none"
            secureTextEntry
            accessoryLeft={<MyIcon name="lock-outline" />}
            style={{marginTop: 10}}
          />
        </Layout>
        <Layout>
          <Button
            accessoryRight={<MyIcon name="arrow-forward-outline" white />}
            style={{marginTop: 20}}
            onPress={() => {}}>
            Ingresar
          </Button>
        </Layout>
        <Layout style={{height: 50}} />
        <Layout
          style={{
            alignItems: 'flex-end',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text>¿Ya tienes cuenta?</Text>
          <Text
            status="primary"
            category="s1"
            onPress={() => navigation.goBack()}>
            {' '}
            ingresar{' '}
          </Text>
        </Layout>
      </ScrollView>
    </Layout>
  );
};
