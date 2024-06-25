import {
  MenuItem,
  OverflowMenu,
  TopNavigationAction,
} from '@ui-kitten/components';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams2} from '../../navigations/MenuStackPostNavigation';
import {useState} from 'react';
import {MyIcon} from '../iu/MyIcon';

interface MenuActionsProps {
  onEdit: () => void;
  onDelete: () => void;
  postId: string;
}

export const MenuActions = ({onEdit, onDelete, postId}: MenuActionsProps) => {
  const [menuVisible, setMenuVisible] = useState(false);
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

  return (
    <OverflowMenu
      anchor={renderMenuAction}
      visible={menuVisible}
      onBackdropPress={toggleMenu}>
      <MenuItem
        accessoryLeft={<MyIcon name="edit" />}
        title="Edit"
        onPress={() => {
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
        }}
      />
      <MenuItem
        accessoryLeft={<MyIcon name="trash" />}
        title="Delete"
        onPress={onDelete}
      />
    </OverflowMenu>
  );
};
