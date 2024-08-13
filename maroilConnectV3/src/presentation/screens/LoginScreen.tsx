import {Button, Input, Layout, Text} from '@ui-kitten/components';
import {Alert, Image, ScrollView, useWindowDimensions} from 'react-native';
import {MyIcon} from '../components/iu/MyIcon';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigations/MenuPrincipalNavigator';
import {useState} from 'react';
import {useAuthStore} from '../store/auth/useAuthStore';

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> {}
export const LoginScreen = ({navigation}: Props) => {
  const {login} = useAuthStore();
  const [isPosting, setIsPosting] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const {height} = useWindowDimensions();
  const onLogin = async () => {
    if (form.email.length === 0 || form.password.length === 0) {
      return;
    }
    setIsPosting(true);
    const wasSuccessful = await login(form.email, form.password);
    setIsPosting(false);
    if (wasSuccessful) {
      return;
    }
    Alert.alert('Error', 'Usuario o contraseña incorrectos');
  };

  return (
    <Layout
      style={{
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
      }}>
      <ScrollView style={{marginHorizontal: 40}}>
        {/* <Layout style={{alignItems: 'center', paddingTop: height * 0.35}}>
        </Layout> */}
        <Layout style={{paddingTop: height * 0.15}}>
          <Layout style={{alignItems: 'center', paddingBottom: 50}}>
            <Image
              source={require('../../assets/logoConnect.svg')}
              style={{width: 100, height: 100}}
            />
          </Layout>
          <Text category="h1">Ingresar</Text>
          <Text category="p2">Por favor, ingrese para continuar</Text>
        </Layout>
        <Layout style={{marginTop: 20}}>
          <Input
            placeholder="Correo electronico"
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={value => setForm({...form, email: value})}
            accessoryLeft={<MyIcon name="email-outline" />}
            style={{marginTop: 10}}
          />
          <Input
            placeholder="Contraseña"
            autoCapitalize="none"
            value={form.password}
            onChangeText={value => setForm({...form, password: value})}
            secureTextEntry
            accessoryLeft={<MyIcon name="lock-outline" />}
            style={{marginTop: 10}}
          />
        </Layout>
        <Layout>
          <Button
            disabled={isPosting}
            accessoryRight={<MyIcon name="arrow-forward-outline" white />}
            style={{marginTop: 20}}
            onPress={onLogin}>
            Ingresar
          </Button>
        </Layout>

        <Layout
          style={{
            marginTop: 20,
            alignItems: 'flex-end',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text>¿No tienes una cuenta? </Text>
          <Text
            status="primary"
            category="s1"
            onPress={() => navigation.navigate('RegisterScreen')}>
            crea una
          </Text>
        </Layout>
      </ScrollView>
    </Layout>
  );
};
