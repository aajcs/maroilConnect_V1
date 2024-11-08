import React, {useEffect, useRef, useState} from 'react';
import {
  Layout,
  List,
  ListItem,
  Input,
  Modal,
  Avatar,
  Text,
  Button,
} from '@ui-kitten/components';
import {TouchableWithoutFeedback} from '@ui-kitten/components/devsupport';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import * as yup from 'yup';

import {Post} from '../../../domain/entities/post';
import {updateCreateCommentAction} from '../../../actions/coments/updateCreateCommentAction';
import {getRelativeTime} from '../../utils/timeUtil';
import {AvatarNombre} from '../iu/AvatarNombre';
import FastImage from 'react-native-fast-image';

interface Props {
  post: Post;
  visible: boolean;
  onClose: () => void;
}

const PostComments = ({post, visible, onClose}: Props) => {
  const {height: viewportHeight} = useWindowDimensions();
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const listRef = useRef(null);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({post, text}: {post: Post; text: string}) => {
      await updateCreateCommentAction(
        {
          ...post,
          id: post.id,
        },
        text,
      );
      return post;
    },

    onSuccess: (data: Post) => {
      if (data) {
        queryClient.invalidateQueries({queryKey: ['posts', 'infinite']});
        queryClient.invalidateQueries({queryKey: ['postsUser', 'infinite']});
        setIsLoading(false);
      }
    },
  });

  const handleAddComment = () => {
    const schema = yup.object().shape({
      text: yup.string().required('El comentario no puede estar vacío'),
    });

    schema
      .validate({text})
      .then(() => {
        setIsLoading(true);
        mutation.mutate({post, text});
        setText('');
      })
      .catch(error => {
        console.log(error.errors);
      });
  };

  const renderComment = ({item}: any) => {
    return (
      <ListItem
        style={{
          marginVertical: 5,
          backgroundColor: 'rgba(143, 155, 179, 0.34)',
          // maxWidth: '80%',
          borderRadius: 10,
          paddingVertical: 6,
          paddingHorizontal: 10,
        }}
        title={item.authorComment.nombre}
        description={item.contentComment}
        accessoryLeft={() =>
          item.authorComment && <AvatarNombre usuario={item.authorComment} />
        }
        accessoryRight={() => (
          <Text style={{fontSize: 10, paddingHorizontal: 2}}>
            {item.createdAt && getRelativeTime(item.createdAt.toString())}
          </Text>
        )}
      />
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
      onBackdropPress={onClose}
      style={{
        height: viewportHeight,
        width: '100%',
        // backgroundColor: 'red',
        flex: 1,
      }}>
      <TouchableWithoutFeedback onPress={onClose}>
        <Layout
          style={{height: viewportHeight - 50, backgroundColor: 'transparent'}}
        />
      </TouchableWithoutFeedback>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        // keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        style={{position: 'absolute', bottom: 0, width: '100%'}}>
        <Layout
          style={{
            // height: 400,
            maxHeight: 400,
            // backgroundColor: 'red',
            alignContent: 'center',
            justifyContent: 'center',
            width: '100%',
          }}>
          <List
            inverted
            data={post.commentsPost}
            renderItem={renderComment}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
        </Layout>
        <Input
          value={text}
          onChangeText={setText}
          placeholder="Añade un comentario..."
        />
        <Button onPress={handleAddComment}>Añade comentario</Button>
        <Layout style={{height: 20}} />
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  listItem: {
    marginVertical: 5,
    backgroundColor: 'rgba(143, 155, 179, 0.54)',
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  avatar: {
    width: 50,
    height: 50,
  },
  layout: {
    borderRadius: 50,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 25,
  },
  textSmall: {
    fontSize: 10,
    paddingHorizontal: 2,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    height: '100%',
    width: '100%',
    flex: 1,
  },
  layoutTouchable: {
    height: '100%',
    backgroundColor: 'transparent',
  },
  keyboardAvoidingView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  layoutKeyboard: {
    maxHeight: 400,
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  layoutBottom: {
    height: 20,
  },
});
export default PostComments;
