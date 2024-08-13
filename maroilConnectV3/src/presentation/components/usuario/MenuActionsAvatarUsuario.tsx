import React, {useState} from 'react';
import {Avatar, Layout, Text, useTheme} from '@ui-kitten/components';
import {Alert, Modal} from 'react-native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useFormik} from 'formik';
import {FaidUser} from '../../../domain/entities/user';
import {updateAvatarUsersActions} from '../../../actions/auth/updateCreateUsersActions';
import AwesomeAlert from 'react-native-awesome-alerts';
import {MyIcon} from '../iu/MyIcon';
import {CameraAdapter} from '../../../config/adapters/camara.adapter';

interface MenuActionsAvatarUsuarioProps {
  onEdit?: () => void;
  onDelete?: () => void;
  user: FaidUser;
}

export const MenuActionsAvatarUsuario = ({
  onEdit,
  onDelete,
  user,
}: MenuActionsAvatarUsuarioProps) => {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const [menuVisible, setMenuVisible] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);

  const [showAlert, setShowAlert] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const onGaleria = async () => {
    try {
      const avatarUnicoUser = await CameraAdapter.getPicturesFromLibrary(1);

      if (avatarUnicoUser[0]) {
        formik.setFieldValue('avatarUnicoUser', avatarUnicoUser[0]);
        setShowAlert(true);
        setAvatar(avatarUnicoUser[0]);
      } else {
        Alert.alert('Error', 'No se pudo obtener la imagen de la galería.');
      }
    } catch (error) {
      console.error('Error al obtener imagen de la galería:', error);
    }
    toggleMenu();
  };

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      setIsLoading(true);
      await updateAvatarUsersActions(data);
      return data;
    },
    onSuccess: (data: any) => {
      setIsLoading(false);
      queryClient.invalidateQueries({queryKey: ['usuario', 'infinite']});
      queryClient.invalidateQueries({queryKey: ['postsUser', 'infinite']});
    },
  });

  const formik = useFormik({
    initialValues: {...user},
    onSubmit: values => {
      mutation.mutate(values);
    },
  });

  return (
    <>
      <Layout>
        <Text onPress={onGaleria}>
          <MyIcon name="camera-outline" />
        </Text>
      </Layout>
      <Layout>
        {avatar && (
          <AwesomeAlert
            // overlayStyle={{backgroundColor: theme['background-basic-color-1']}}
            titleStyle={{color: theme['text-basic-color']}}
            messageStyle={{color: theme['text-basic-color']}}
            contentContainerStyle={{
              backgroundColor: theme['background-basic-color-1'],
            }}
            show={showAlert}
            title="Confirmar Avatar"
            message="¿Quieres usar esta imagen como tu avatar?"
            customView={
              <Avatar
                source={{uri: avatar || ''}}
                style={{width: 100, height: 100}}
                onError={() => {
                  console.log('Error al cargar avatar');
                }}
              />
            }
            showCancelButton={true}
            showConfirmButton={true}
            cancelText="No, cancelar"
            confirmText="Sí, confirmar"
            onCancelPressed={() => {
              setShowAlert(false);
            }}
            onConfirmPressed={() => {
              setShowAlert(false);
              formik.handleSubmit();
            }}
            onDismiss={() => {
              setShowAlert(false);
            }}
          />
        )}
      </Layout>
    </>
  );
};
