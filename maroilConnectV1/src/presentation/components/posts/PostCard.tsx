import {
  Avatar,
  Icon,
  Layout,
  MenuItem,
  OverflowMenu,
  Text,
  TopNavigationAction,
} from '@ui-kitten/components';
import {Post} from '../../../domain/entities/post';
import {MyIcon} from '../iu/MyIcon';
import {Image, StyleSheet, useColorScheme} from 'react-native';
import {useState} from 'react';
import {getRelativeTime} from '../../utils/timeUtil';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams2} from '../../navigations/MenuStackPostNavigation';
import ImageGallery from 'react-native-image-gallery';

interface Props {
  post: Post;
  onEdit: () => void;
  onDelete: () => void;
}

export const PostCard = ({post, onEdit, onDelete}: Props) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParams2>>();
  const colorScheme = useColorScheme();

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
  );

  const MenuIcon = props => <Icon {...props} name="more-vertical" />;
  const renderRightActions = () => (
    <>
      <OverflowMenu
        anchor={renderMenuAction}
        visible={menuVisible}
        onBackdropPress={toggleMenu}>
        <MenuItem
          accessoryLeft={EditIcon}
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
                        params: {postId: post.id},
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
          accessoryLeft={DeleteIcon}
          title="Delete"
          onPress={onDelete}
        />
      </OverflowMenu>
    </>
  );
  const EditIcon = props => <Icon {...props} name="edit" />;

  const DeleteIcon = props => <Icon {...props} name="trash" />;
  return (
    <Layout
      style={[
        styles.container,
        {
          marginVertical: 5,
          shadowColor: colorScheme !== 'dark' ? '#000' : '#fff',
          padding: 2,
        },
      ]}>
      <Layout style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
        <Avatar
          source={require('../../../assets/no-product-image.png')}
          style={{marginRight: 10}}
        />
        <Text category="s1">{post.authorPost.nombre}</Text>
        <Text category="p2">{getRelativeTime(post.createdAt.toString())}</Text>
        {renderRightActions()}
      </Layout>
      {post.mediaPost && (
        <ImageGallery
          style={{flex: 1, backgroundColor: 'black'}}
          images={post.mediaPost.map(media => ({
            source: {uri: media.url},
            dimensions: {width: 100, height: 100},
          }))}
        />
      )}
      {post.mediaPost &&
        post.mediaPost.map((media, index) => (
          <Image
            key={index}
            source={{uri: media.url}}
            style={{width: '100%', height: 200}}
          />
        ))}
      <Image
        source={require('../../../assets/no-product-image.png')}
        style={{width: '100%', height: 200}}
      />

      <Layout style={{padding: 10}}>
        <Text category="h5">{post.titlePost}</Text>
        <Text category="s1">{post.contentPost}</Text>
        <Layout
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <Layout style={{flexDirection: 'row', alignItems: 'center'}}>
            <MyIcon name="heart-outline" />
            <Text category="c1">{post.likesPost.length}</Text>
          </Layout>
          <Layout style={{flexDirection: 'row', alignItems: 'center'}}>
            <MyIcon name="eye-outline" />
            <Text category="c1">{post.viewsPost.length}</Text>
          </Layout>
          <Layout style={{flexDirection: 'row', alignItems: 'center'}}>
            <MyIcon name="message-circle-outline" />
            <Text category="c1">{post.commentsPost.length}</Text>
          </Layout>
        </Layout>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#fff',
    borderRadius: 8,
    margin: 10,
    padding: 10,

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
