import {
  MenuItem,
  OverflowMenu,
  TopNavigationAction,
} from '@ui-kitten/components';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams2} from '../../navigations/MenuStackPostNavigation';
import {useState} from 'react';
import {MyIcon} from '../iu/MyIcon';
import {updateCreatePostAction} from '../../../actions/posts/updateCreatePostAction';
import {Alert} from 'react-native';
import {useQueryClient} from '@tanstack/react-query';
import {FaidUser} from '../../../domain/entities/user';

interface MenuActionsProps {
  onEdit: () => void;
  onDelete: () => void;
  postId: string;
  postEstatus: string | undefined;
  postAuthorId: string;
  user: FaidUser;
}

export const MenuActions = ({
  onEdit,
  onDelete,
  postId,
  postEstatus,
  postAuthorId,
  user,
}: MenuActionsProps) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const queryClient = useQueryClient();

  const navigation = useNavigation<NavigationProp<RootStackParams2>>();

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuAction = () => (
    <TopNavigationAction
      icon={<MyIcon name="more-vertical" />}
      onPress={toggleMenu}
    />
  );
  const handlePressAprobar = () => {
    Alert.alert(
      'Confirmación',
      '¿Estás seguro de que quieres aprobar este post?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            await updateCreatePostAction({
              id: postId,
              estatusPost: 'Aprobado',
              fechaAprobadoPost: new Date(),
            });
            await queryClient.refetchQueries({
              queryKey: ['posts', 'infinite'],
            });

            await queryClient.refetchQueries({
              queryKey: ['postsBorrador', 'infinite'],
            });
          },
        },
      ],
    );
  };
  const handlePressEliminar = () => {
    Alert.alert(
      'Confirmación',
      '¿Estás seguro de que quieres eliminar este post?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            updateCreatePostAction({id: postId, estatusPost: 'Eliminado'});
            queryClient.invalidateQueries({
              queryKey: ['posts', 'infinite'],
            });
            queryClient.invalidateQueries({
              queryKey: ['postsBorrador', 'infinite'],
            });
          },
        },
      ],
    );
  };
  const handlePressEditar = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'pantallas',
          state: {
            routes: [
              {
                name: 'PublicarScreen',
                params: {postId: postId},
              },
            ],
          },
        },
      ],
    });

    toggleMenu();
  };
  return (
    <OverflowMenu
      anchor={renderMenuAction}
      visible={menuVisible}
      onBackdropPress={toggleMenu}>
      {postAuthorId === user?.id ? (
        <MenuItem
          accessoryLeft={<MyIcon name="edit" />}
          title="Editar"
          onPress={handlePressEditar}
        />
      ) : (
        <></>
      )}

      {user?.rolesMaroilConnect.some(role =>
        ['administrador', 'superadmin'].includes(role),
      ) ? (
        <MenuItem
          accessoryLeft={<MyIcon name="trash" />}
          title="Eliminar"
          onPress={handlePressEliminar}
        />
      ) : (
        <></>
      )}

      {postEstatus === 'Borrador' ? (
        <MenuItem
          accessoryLeft={<MyIcon name="checkmark-square-outline" />}
          title="Aprobar"
          onPress={handlePressAprobar}
        />
      ) : (
        <></>
      )}
    </OverflowMenu>
  );
};
