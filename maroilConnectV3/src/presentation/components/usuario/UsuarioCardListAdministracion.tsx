// UsuarioCardList.tsx
import React, {SetStateAction, useState} from 'react';
import {
  Alert,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import {
  Avatar,
  Button,
  Input,
  Layout,
  Radio,
  RadioGroup,
  Text,
  Toggle,
  useTheme,
} from '@ui-kitten/components';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import Collapsible from 'react-native-collapsible';
import AwesomeAlert from 'react-native-awesome-alerts';
import * as Yup from 'yup';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

import {Usuario} from '../../../domain/entities/usuario';
import {updateCreateUsersActions} from '../../../actions/auth/updateCreateUsersActions';
import {MyIcon} from '../iu/MyIcon';
import {AvatarNombre} from '../iu/AvatarNombre';
import {useConfigStore} from '../../store/iu/useConfigStore';

interface Props {
  usuario: Usuario;
  index: string;
}
// Define una función que mapea los roles a los índices
const mapRoleToIndex = (roles: string[]): number => {
  if (roles.includes('administrador')) {
    return 4;
  } else if (roles.includes('moderador')) {
    return 3;
  } else if (roles.includes('colaborador')) {
    return 2;
  } else if (roles.includes('lector')) {
    return 1;
  } else {
    return 0; // Por defecto, si el rol no se reconoce, se selecciona 'No Rol'
  }
};
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')

    .matches(/[0-9]/, 'La contraseña debe contener al menos un número')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'La contraseña debe contener al menos un carácter especial',
    )
    .required('La contraseña es requerida'),
});
export const UsuarioCardListAdministracion = ({usuario}: Props) => {
  const theme = useTheme();
  const {checked} = useConfigStore();

  const colorScheme = useColorScheme();
  const queryClient = useQueryClient();

  const [showAlert, setShowAlert] = useState(false);
  const [passwordChange, setPasswordChange] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [isCollapsible, setIsCollapsible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(
    mapRoleToIndex(usuario.rolesMaroilConnect!),
  );

  const accesoAppMaroil =
    usuario.roles != null &&
    usuario.apps != null &&
    usuario.roles.some(() => true) &&
    usuario.apps.some(() => true);

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      setIsLoading(true);
      await updateCreateUsersActions(data);
      return data;
    },
    onSuccess: (data: any) => {
      setIsLoading(false);
      queryClient.invalidateQueries({
        queryKey: ['usuariosAdministracion', 'infinite'],
      });
      setShowAlert(false);
    },
  });

  const handleChange = (index: SetStateAction<number>) => {
    setSelectedIndex(index);
    switch (index) {
      case 1:
        mutation.mutate({
          id: usuario.id,
          rolesMaroilConnect: ['lector'],
        });
        Alert.alert('Ahora eres un lector.');
        break;
      case 2:
        mutation.mutate({
          id: usuario.id,
          rolesMaroilConnect: ['colaborador'],
        });
        Alert.alert('¡Bienvenido al equipo de colaboradores!');
        break;
      case 3:
        mutation.mutate({
          id: usuario.id,
          rolesMaroilConnect: ['moderador'],
        });
        Alert.alert('¡Bienvenido al equipo de moderadores!');
        break;
      case 4:
        mutation.mutate({
          id: usuario.id,
          rolesMaroilConnect: ['administrador'],
        });
        Alert.alert('¡Bienvenido al equipo de administradores!');
        break;
      // ... otros casos
      default:
        mutation.mutate({
          id: usuario.id,
          rolesMaroilConnect: ['NotRol'],
        });
        Alert.alert('Rol no asignado.');
    }
  };

  const validatePassword = async () => {
    try {
      await validationSchema.validate({password: passwordChange});
      setErrorMessage('');
      setIsPasswordValid(true); // Si la validación es exitosa, borra el mensaje de error
    } catch (error: any) {
      // Explicitly type 'error' as 'Error'
      // Si la validación falla, muestra el mensaje de error
      setErrorMessage(error.message);
      setIsPasswordValid(false);
    }
  };

  const toggleSecureEntry = (): void => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props: any): React.ReactElement => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <MyIcon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  return (
    <>
      <Layout
        style={[styles.container, {shadowColor: checked ? '#fff' : '#000'}]}>
        <TouchableOpacity
          key={usuario.id}
          style={styles.item}
          onPress={() => setIsCollapsible(!isCollapsible)} // Add this line;
        >
          <AvatarNombre usuario={usuario} />

          <Layout>
            <Text style={styles.name}>{usuario.nombre}</Text>
            <Text style={styles.email}>{usuario.correo}</Text>
          </Layout>
        </TouchableOpacity>
        <Collapsible collapsed={isCollapsible}>
          <Layout style={styles.Collapsible}>
            <Toggle
              style={styles.toggle}
              status="primary"
              checked={usuario.chatMaroilConnect}
              onChange={() =>
                mutation.mutate({
                  id: usuario.id,
                  chatMaroilConnect: !usuario.chatMaroilConnect,
                })
              }>
              {evaProps =>
                usuario.chatMaroilConnect ? (
                  <Text category="h2" {...evaProps}>
                    Chat Activado
                  </Text>
                ) : (
                  <Text category="h2" {...evaProps}>
                    Chat Desactivado
                  </Text>
                )
              }
            </Toggle>
            <Toggle
              style={styles.toggle}
              status="primary"
              checked={accesoAppMaroil}
              onChange={() =>
                mutation.mutate({
                  id: usuario.id,
                  roles: accesoAppMaroil ? [] : ['LECTURA'],
                  apps: accesoAppMaroil ? [] : ['CONTROLAPPS'],
                })
              }>
              {evaProps =>
                accesoAppMaroil ? (
                  <Text category="h2" {...evaProps}>
                    Acceso App Maroil Activado
                  </Text>
                ) : (
                  <Text category="h2" {...evaProps}>
                    Acceso App Maroil Desactivado
                  </Text>
                )
              }
            </Toggle>
            <Text category="h6">{`Selecciones el rol: `}</Text>

            <RadioGroup
              selectedIndex={selectedIndex}
              onChange={index => handleChange(index)}>
              <Radio>No Rol</Radio>
              <Radio>Lector</Radio>
              <Radio>Colaborador</Radio>
              <Radio>Moderador</Radio>
              <Radio>Administrador</Radio>
            </RadioGroup>
            <Button
              style={styles.button}
              // appearance="ghost"
              status="danger"
              onPress={() => setShowAlert(true)}>
              Restablecer contraseña
            </Button>
          </Layout>
        </Collapsible>
      </Layout>
      <Layout>
        <AwesomeAlert
          // overlayStyle={{backgroundColor: theme['background-basic-color-1']}}
          titleStyle={{color: theme['text-basic-color']}}
          messageStyle={{color: theme['text-basic-color']}}
          contentContainerStyle={{
            backgroundColor: theme['background-basic-color-1'],
          }}
          show={showAlert}
          title="Restablecer contraseña"
          message="¿Estás seguro de que deseas restablecer la contraseña?"
          customView={
            <>
              <Input
                // style={{width: 100, height: 100}}
                value={passwordChange}
                onChangeText={text => setPasswordChange(text)}
                placeholder="Nueva contraseña"
                onBlur={validatePassword}
                secureTextEntry={secureTextEntry}
                accessoryRight={renderIcon}
              />
              <Button onPress={validatePassword} size="small">
                Validar contraseña
              </Button>
              <Text style={{color: 'red'}}>{errorMessage}</Text>
            </>
          }
          showCancelButton={true}
          showConfirmButton={isPasswordValid}
          cancelText="No, cancelar"
          confirmText="Sí, confirmar"
          onCancelPressed={() => {
            setShowAlert(false);
          }}
          onConfirmPressed={() => {
            mutation.mutate({
              id: usuario.id,
              password: passwordChange,
            });
          }}
          onDismiss={() => {
            setShowAlert(false);
          }}
        />
      </Layout>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },

  item: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingVertical: 3,
    alignItems: 'center',
  },
  name: {
    fontWeight: '600',
    // color: '#fff',
    fontSize: 16,
  },
  email: {
    // color: '#fff',
    opacity: 0.6,
    marginTop: 2,
  },
  toggle: {
    margin: 2,
  },
  button: {
    margin: 2,
  },
  Collapsible: {
    padding: 10,
    alignItems: 'flex-start',
  },
});
