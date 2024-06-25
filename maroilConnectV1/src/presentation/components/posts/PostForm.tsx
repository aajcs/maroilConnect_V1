import {Picker} from '@react-native-picker/picker';
import {Layout, Input, Button, Text} from '@ui-kitten/components';
import {useFormik} from 'formik';
import {ScrollView, StyleSheet} from 'react-native';
import {Post} from '../../../domain/entities/post';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {updateCreatePostAction} from '../../../actions/posts/updateCreatePostAction';
import {useNavigation} from '@react-navigation/native';
import {CameraAdapter} from '../../../config/adapters/camara.adapter';

interface Props {
  post: Post;
  postIdRef: React.MutableRefObject<string | undefined>;
}
export const PostForm = ({post, postIdRef}: Props) => {
  const navigation = useNavigation();
  console.log(postIdRef.current);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: Post) => {
      updateCreatePostAction({...data, id: post.id});
      return data;
    },

    onSuccess: (data: Post) => {
      postIdRef.current = data.id;
      queryClient.invalidateQueries({queryKey: ['posts', 'infinite']});
      queryClient.invalidateQueries({queryKey: ['post', data.id]});
      console.log('Post updated:', {data});
    },
  });

  const categories = ['Category 1', 'Category 2', 'Category 3'];

  const formik = useFormik({
    initialValues: {...post, category: 'Category 1'},
    onSubmit: values => {
      // Aquí puedes manejar la lógica de envío del formulario
      mutation.mutate(values);
    },
  });

  return (
    <ScrollView>
      <Layout style={styles.container}>
        <Input
          placeholder="Title"
          value={formik.values.titlePost}
          onChangeText={formik.handleChange('titlePost')}
        />
        <Input
          placeholder="Content"
          value={formik.values.contentPost}
          onChangeText={formik.handleChange('contentPost')}
          multiline={true}
          textStyle={{minHeight: 64}}
        />
        <Picker
          selectedValue={formik.values.category}
          onValueChange={itemValue =>
            formik.setFieldValue('category', itemValue)
          }>
          {categories.map((category, index) => (
            <Picker.Item label={category} value={category} key={index} />
          ))}
        </Picker>
        <Button
          style={styles.submitButton}
          onPress={() => formik.handleSubmit()}
          // disabled={mutation.isPending}
        >
          Submit
        </Button>
        <Button
          style={styles.submitButton}
          onPress={() => navigation.goBack()}
          // disabled={mutation.isPending}
        >
          Submit
        </Button>
        <Button
          style={styles.submitButton}
          onPress={async () => {
            // console.log('fotos');
            const fotos = await CameraAdapter.takePicture();
            console.log(fotos);
          }}
          // disabled={mutation.isPending}
        >
          fotos
        </Button>
        <Button
          style={styles.submitButton}
          onPress={async () => {
            // console.log('fotos');
            const fotos = await CameraAdapter.getPicturesFromLibrary();
            const fotosUrl = fotos.map(foto => ({
              public_id: '',
              url: foto,
            }));
            formik.setFieldValue('mediaPost', [
              ...(formik.values.mediaPost ?? []),
              ...fotosUrl,
            ]);
            console.log(fotos);
          }}
          // disabled={mutation.isPending}
        >
          galeria
        </Button>

        <Text>{JSON.stringify(formik.values, null, 2)}</Text>
      </Layout>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  submitButton: {
    marginTop: 20,
  },
});
