import {
  Avatar,
  Button,
  Icon,
  Layout,
  MenuItem,
  OverflowMenu,
  Text,
  TopNavigationAction,
  useTheme,
} from '@ui-kitten/components';
import {Post} from '../../../domain/entities/post';
import {MyIcon} from '../iu/MyIcon';
import {
  ActivityIndicator,
  Image,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  useColorScheme,
  useWindowDimensions,
} from 'react-native';
import {useState} from 'react';
import {getRelativeTime} from '../../utils/timeUtil';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams2} from '../../navigations/MenuStackPostNavigation';
import Carousel, {Pagination} from 'react-native-snap-carousel';
interface Props {
  post: Post;
  onEdit: () => void;
  onDelete: () => void;
}

export const PostCard = ({post, onEdit, onDelete}: Props) => {
  const theme = useTheme();
  const {width: viewportWidth} = useWindowDimensions();
  const [menuVisible, setMenuVisible] = useState(false);

  const [activeSlide, setActiveSlide] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleImageLoad = () => {
    setLoading(false);
  };

  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [selectedImages, setSelectedImages] = useState(null);

  const handleImagePress = (images, index) => {
    setSelectedImages(images);
    setSelectedImageIndex(index);
    setModalVisible(true);
  };
  const handleModalClose = () => {
    setModalVisible(false);
  };
  const pagination = () => {
    return (
      <Layout
        style={{
          position: 'absolute',
          top: 435,
          zIndex: 1000,
          // bottom: 100,
          // left: viewportWidth * 0.25,
          alignSelf: 'center',
          backgroundColor: 'transparent',
        }}>
        <Pagination
          dotsLength={post.mediaPost?.length || 0}
          activeDotIndex={activeSlide}
          containerStyle={{backgroundColor: 'transparent'}}
          dotStyle={{
            width: 5,
            height: 5,
            borderRadius: 5,
            marginHorizontal: 1,
            backgroundColor: theme['background-alternative-color-4'],
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </Layout>
    );
  };
  const navigation = useNavigation<NavigationProp<RootStackParams2>>();
  const colorScheme = useColorScheme();

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
  );
  const renderItem = ({item, index}: {item: {url: string}; index: number}) => {
    return (
      <Layout style={{flex: 1}}>
        <TouchableWithoutFeedback
          onPress={() => handleImagePress(post.mediaPost, index)}>
          <Image
            source={{uri: item.url}}
            style={{width: '100%', height: 400}}
            // resizeMode="stretch"
          />
        </TouchableWithoutFeedback>
      </Layout>
    );
  };
  const renderItemModal = ({
    item,
    index,
  }: {
    item: {url: string};
    index: number;
  }) => {
    return (
      <Layout
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent',
        }}>
        <TouchableWithoutFeedback
          onPress={() => handleImagePress(post.mediaPost, index)}>
          <Image
            source={{uri: item.url}}
            style={{
              width: '100%',
              height: '100%',
            }}
            resizeMode="contain"
          />
        </TouchableWithoutFeedback>
      </Layout>
    );
  };
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
      <Layout>
        {post.mediaPost && post.mediaPost.length > 0 ? (
          <Carousel
            data={post.mediaPost}
            renderItem={renderItem}
            sliderWidth={viewportWidth - 23}
            itemWidth={viewportWidth - 20}
            onSnapToItem={index => setActiveSlide(index)}
          />
        ) : (
          <Image
            source={require('../../../assets/no-product-image.png')}
            style={{width: '100%', height: 200}}
          />
        )}
      </Layout>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModalClose}>
        <Layout
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <Button
            size="tiny"
            onPress={handleModalClose}
            style={{
              position: 'absolute',
              top: 50,
              right: 20,
              zIndex: 1000,
              backgroundColor: 'rgba(0,0,0,0.5)',
              borderRadius: 50,
              borderColor: 'rgba(0,0,0,0.5)',
            }}>
            <MyIcon name="close" white />
          </Button>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <Carousel
              data={selectedImages}
              renderItem={renderItemModal}
              sliderWidth={viewportWidth - 23}
              itemWidth={viewportWidth - 20}
              firstItem={selectedImageIndex}
              onSnapToItem={index => setActiveSlide(index)}
            />
          )}
        </Layout>
      </Modal>
      {pagination()}
      {/* {post.mediaPost &&
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
      /> */}
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
            <Text category="c1">{post.likesPost?.length}</Text>
          </Layout>
          <Layout style={{flexDirection: 'row', alignItems: 'center'}}>
            <MyIcon name="eye-outline" />
            <Text category="c1">{post.viewsPost?.length}</Text>
          </Layout>
          <Layout style={{flexDirection: 'row', alignItems: 'center'}}>
            <MyIcon name="message-circle-outline" />
            <Text category="c1">{post.commentsPost?.length}</Text>
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
