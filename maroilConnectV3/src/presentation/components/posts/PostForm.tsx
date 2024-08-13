import {Picker} from '@react-native-picker/picker';
import {
  Layout,
  Input,
  Button,
  Text,
  // MenuItem,
  ButtonGroup,
  Spinner,
} from '@ui-kitten/components';
import {useFormik} from 'formik';
import {
  FlatList,
  Image,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import {Post} from '../../../domain/entities/post';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {updateCreatePostAction} from '../../../actions/posts/updateCreatePostAction';
import {useNavigation} from '@react-navigation/native';
import {CameraAdapter} from '../../../config/adapters/camara.adapter';
import {MyIcon} from '../iu/MyIcon';
import {useState} from 'react';
import Video from 'react-native-video';
import Toast from 'react-native-toast-message';
import {CategoryPicker} from '../iu/CategoryPicker';

interface Props {
  post: Post;
  postIdRef: React.MutableRefObject<string | undefined>;
}
export const PostForm = ({post, postIdRef}: Props) => {
  const [visible, setVisible] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: Post) => {
      setIsLoading(true);
      await updateCreatePostAction({
        ...data,
        id: post.id,
        estatusPost: 'Borrador',
      });
      return data;
    },

    onSuccess: (data: Post) => {
      setIsLoading(false);
      postIdRef.current = data.id;
      queryClient.invalidateQueries({queryKey: ['posts', 'infinite']});
      queryClient.invalidateQueries({queryKey: ['post', data.id]});
      navigation.goBack();
    },
  });
  const toggleModal = () => {
    setVisible(!visible);
  };

  const formik = useFormik({
    initialValues: {...post, categoriaPost: 'Maroil Connect'},
    onSubmit: values => {
      // Aquí puedes manejar la lógica de envío del formulario
      mutation.mutate(values);
    },
  });
  const options = [
    {title: 'Cámara', icon: 'camera-outline'},
    {title: 'Galeria', icon: 'image-outline'},
    {title: 'Videos', icon: 'video-outline'},
    {title: 'Biblioteca de Videos', icon: 'film-outline'},
    // {title: 'Eventos', icon: 'calendar-outline'},
    // {title: 'Encuesta', icon: 'question-mark-circle-outline'},
  ];
  const theme = useColorScheme();
  const renderIcon = (name: string) => (
    <MyIcon name={name} color={theme === 'light' ? '#002885' : ''} />
  );
  // const renderTitle = (title: string) => (
  //   <Text style={{color: '#333', fontWeight: 'bold', textAlign: 'left'}}>
  //     {title}
  //   </Text>
  // );
  const handleSelect = async (option: string) => {
    let media;
    let mediaUrl;

    switch (option) {
      case 'Cámara':
        media = await CameraAdapter.takePicture();
        mediaUrl = media.map(item => ({
          public_id: '',
          url: item,
        }));
        formik.setFieldValue('mediaPost', [
          ...(formik.values.mediaPost ?? []),
          ...mediaUrl,
        ]);
        break;
      case 'Galeria':
        media = await CameraAdapter.getPicturesFromLibrary();
        mediaUrl = media.map(item => ({
          public_id: '',
          url: item,
        }));
        formik.setFieldValue('mediaPost', [
          ...(formik.values.mediaPost ?? []),
          ...mediaUrl,
        ]);
        break;
      case 'Videos':
        media = await CameraAdapter.takeVideo();
        mediaUrl = media.map(item => ({
          public_id: '',
          url: item,
        }));
        formik.setFieldValue('mediaPost', [
          ...(formik.values.mediaPost ?? []),
          ...mediaUrl,
        ]);
        break;
      case 'Biblioteca de Videos':
        media = await CameraAdapter.getVideosFromLibrary();
        mediaUrl = media.map(item => ({
          public_id: '',
          url: item,
        }));
        formik.setFieldValue('mediaPost', [
          ...(formik.values.mediaPost ?? []),
          ...mediaUrl,
        ]);
        break;
      case 'Eventos':
        console.log('Eventos');

        Toast.show({
          type: 'success',
          text1: 'Hello',
          text2: 'This is some something 👋',
        });
        break;
      // Aquí puedes agregar más casos para las otras opciones
      // case 'eventos':
      //   // Código para manejar la selección de 'eventos'
      //   break;
      // case 'encuesta':
      //   // Código para manejar la selección de 'encuesta'
      //   break;
      default:
        break;
    }
  };
  const renderItem = (item, index) => {
    const isVideo = /\.(mp4|avi|mov)/i.test(item.url.toString());
    const isImage = /\.(jpg|png|jpeg|gif)$/i.test(item.url);
    return (
      <View style={styles.mediaItem}>
        {isVideo && (
          <Video
            source={{uri: item.url.toString()}}
            style={styles.mediaVideo}
            resizeMode="cover"
            controls={true}
          />
        )}
        {isImage && (
          <Image
            source={{uri: item.url.toString()}}
            style={styles.mediaImage}
          />
        )}
        {/* <Image source={{uri: item.url.toString()}} style={styles.mediaImage} /> */}
        {/* <Video
          source={{uri: item.url.toString()}}
          style={styles.mediaImage}
          resizeMode="cover"
          controls={true}
        /> */}
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => {
            const newMediaPost = [...(formik.values.mediaPost || [])]; // Add the [Symbol.iterator]() method to the mediaPost[] | undefined type declaration
            newMediaPost.splice(index, 1);
            formik.setFieldValue('mediaPost', newMediaPost);
          }}>
          <Text style={styles.deleteButtonText}>X</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const handleTextChange = text => {
    if (text.length <= 60) {
      formik.handleChange('titlePost')(text);
      setCharCount(text.length);
    }
  };
  return (
    <ScrollView nestedScrollEnabled={true}>
      <Layout style={styles.container}>
        <Layout
          style={{
            backgroundColor: 'red',
            alignContent: 'space-between',
            flexDirection: 'row',
          }}>
          <Layout style={{flexDirection: 'row', alignItems: 'center'}}>
            <Button
              size="tiny"
              style={styles.submitButton}
              onPress={() => navigation.goBack()}
              // disabled={mutation.isPending}
              appearance="outline"
              status="basic">
              Cancelar
            </Button>
          </Layout>
          {/* <Layout>
            <Text category="s2">Crear Publicacion</Text>
          </Layout> */}
          <Layout style={{flex: 1, alignItems: 'center'}}>
            <Text category="h6">Crear publicacion</Text>
          </Layout>
          <Layout style={{flexDirection: 'row', alignItems: 'center'}}>
            <Button
              size="tiny"
              style={styles.submitButton}
              onPress={() => formik.handleSubmit()}
              appearance="outline"
              status="basic"
              disabled={
                !formik.values.titlePost ||
                !formik.values.contentPost ||
                !(formik.values.mediaPost && formik.values.mediaPost.length)
              }>
              {isloading ? <Spinner size="small" /> : 'Publicar'}
            </Button>
          </Layout>
        </Layout>

        <Input
          style={{marginTop: 10}}
          placeholder="Titulo"
          value={formik.values.titlePost}
          onChangeText={handleTextChange}
          maxLength={60}
        />
        <Text style={{textAlign: 'right'}}>{charCount}/60</Text>
        <Input
          style={{marginTop: 10}}
          placeholder="Contenido"
          value={formik.values.contentPost}
          onChangeText={formik.handleChange('contentPost')}
          multiline={true}
          textStyle={{minHeight: 64}}
        />
        <CategoryPicker
          selectedCategory={formik.values.categoriaPost}
          onCategoryChange={category =>
            formik.setFieldValue('categoriaPost', category)
          }
          visible={visible}
          toggleModal={toggleModal}
        />

        {/* {options.map((option, index) => (
          <MenuItem
            key={index}
            title={renderTitle(option.title)}
            accessoryLeft={() => renderIcon(option.icon)}
            style={{
              backgroundColor: '#f2f6fc',
              margin: 2,
              borderRadius: 10,
              height: 40,
              padding: 0,
            }} // Estilo del contenedor
            onPress={() => handleSelect(option.title)}
          />
        ))} */}
        {formik.values.mediaPost?.length > 0 && (
          <View style={{marginTop: 10}}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              nestedScrollEnabled={true}>
              <FlatList
                scrollEnabled={false}
                nestedScrollEnabled={true}
                data={formik.values.mediaPost}
                keyExtractor={(item, index) => index.toString()}
                numColumns={3} // Ajusta este valor para cambiar el número de columnas en el collage
                renderItem={({item, index}) => renderItem(item, index)}
              />
            </ScrollView>
          </View>
        )}
        <ButtonGroup
          appearance="outline"
          status="basic"
          style={{
            flexDirection: 'column',
            marginTop: 10,
          }}>
          {options.map((option, index) => (
            <Button
              key={index}
              onPress={() => handleSelect(option.title)}
              accessoryLeft={() => renderIcon(option.icon)}
              style={{justifyContent: 'flex-start'}}>
              {option.title}
            </Button>
          ))}
        </ButtonGroup>

        {/* <Text>{JSON.stringify(formik.values, null, 2)}</Text> */}
      </Layout>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    paddingTop: 0,
  },
  submitButton: {
    // marginTop: 20,
    minWidth: 70,
  },
  mediaItem: {
    flex: 1,
    margin: 5,
    position: 'relative', // Esto permite posicionar el botón de eliminación en la esquina superior derecha
  },
  mediaImage: {
    width: '100%',
    height: 120, // Ajusta este valor para cambiar la altura de las imágenes
  },
  mediaVideo: {
    width: '100%',
    height: 333, // Ajusta este valor para cambiar la altura de las imágenes
  },
  deleteButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'red',
  },
});
