import {Button, Input, Layout, Text} from '@ui-kitten/components';
import {Alert, Image, ScrollView, useWindowDimensions} from 'react-native';
import {MyIcon} from '../components/iu/MyIcon';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigations/MenuPrincipalNavigator';
import {useFormik} from 'formik';
import {useMutation} from '@tanstack/react-query';
import {Usuario} from '../../domain/entities/usuario';
import {updateCreateUsersActions} from '../../actions/auth/updateCreateUsersActions';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
import {useAuthStore} from '../store/auth/useAuthStore';
import {CategoryPicker} from '../components/iu/CategoryPicker';
import {useState} from 'react';

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> {}
export const RegisterScreen = ({navigation}: Props) => {
  const {height} = useWindowDimensions();
  const {login} = useAuthStore();
  const [visible, setVisible] = useState(false);
  const mutation = useMutation({
    mutationFn: async (data: Usuario) => {
      const userCreateData = await updateCreateUsersActions({
        ...data,
        id: 'new',
      });
      return userCreateData;
    },

    onSuccess: async (data: Usuario & {message?: string}) => {
      if (data.message) {
        return Toast.show({
          type: 'error',
          text1: 'Error',
          text2: data.message,
        });
      }
      const wasSuccessful = await login(data.correo, formik.values.password);
      if (wasSuccessful) {
        return;
      }
      Alert.alert('Error', 'Usuario o contraseña incorrectos');
    },
  });
  const toggleModal = () => {
    setVisible(!visible);
  };
  const formik = useFormik({
    initialValues: {
      nombre: '',
      correo: '',
      password: '',
      departamento: '',
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required('El nombre es requerido'),
      correo: Yup.string()
        .email('Correo inválido')
        .required('El correo es requerido'),
      password: Yup.string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .matches(
          /[A-Z]/,
          'La contraseña debe contener al menos una letra mayúscula',
        )
        .matches(/[0-9]/, 'La contraseña debe contener al menos un número')
        .matches(
          /[!@#$%^&*(),.?":{}|<>]/,
          'La contraseña debe contener al menos un carácter especial',
        )
        .required('La contraseña es requerida'),
      departamento: Yup.string().required('La categoría es requerida'),
    }),

    onSubmit: values => {
      // Aquí puedes manejar la lógica de envío del formulario
      mutation.mutate(values);
    },
  });

  return (
    <Layout
      style={{
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
      }}>
      <ScrollView style={{marginHorizontal: 40}}>
        <Layout style={{paddingTop: height * 0.1}}>
          <Layout style={{alignItems: 'center', paddingBottom: 50}}>
            <Image
              source={require('../../assets/logoConnect.svg')}
              style={{width: 100, height: 100}}
            />
          </Layout>
          <Text category="h1">Crear cuenta</Text>
          <Text category="p2">Por favor, crea una cuenta para continuar</Text>
        </Layout>
        <Layout style={{marginTop: 20}}>
          <Input
            placeholder="Nombre completo"
            accessoryLeft={<MyIcon name="person-outline" />}
            style={{marginBottom: 10}}
            value={formik.values.nombre}
            onChangeText={formik.handleChange('nombre')}
          />
          {formik.errors.nombre && (
            <Text style={{color: 'red'}}>{formik.errors.nombre}</Text>
          )}
          <Input
            placeholder="Correo electronico"
            keyboardType="email-address"
            autoCapitalize="none"
            accessoryLeft={<MyIcon name="email-outline" />}
            style={{marginTop: 10}}
            value={formik.values.correo}
            onChangeText={formik.handleChange('correo')}
          />
          {formik.errors.correo && (
            <Text style={{color: 'red'}}>{formik.errors.correo}</Text>
          )}
          <Input
            placeholder="Contraseña"
            autoCapitalize="none"
            secureTextEntry
            accessoryLeft={<MyIcon name="lock-outline" />}
            style={{marginTop: 10}}
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
          />
          {formik.errors.password && (
            <Text style={{color: 'red'}}>{formik.errors.password}</Text>
          )}
          <CategoryPicker
            selectedCategory={formik.values.departamento}
            onCategoryChange={category =>
              formik.setFieldValue('departamento', category)
            }
            visible={visible}
            toggleModal={toggleModal}
          />
          {formik.errors.departamento && (
            <Text style={{color: 'red'}}>{formik.errors.departamento}</Text>
          )}
        </Layout>
        <Layout>
          <Button
            accessoryRight={<MyIcon name="arrow-forward-outline" white />}
            style={{marginTop: 20}}
            onPress={() => {
              formik.handleSubmit();
            }}>
            Registrar
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
