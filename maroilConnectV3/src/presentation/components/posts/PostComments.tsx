import React, {useEffect, useRef, useState} from 'react';
import {
  Layout,
  List,
  ListItem,
  Input,
  Modal,
  Avatar,
  Text,
} from '@ui-kitten/components';
import {Post} from '../../../domain/entities/post';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {updateCreateCommentAction} from '../../../actions/coments/updateCreateCommentAction';
import {Button} from '@ui-kitten/components';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {TouchableWithoutFeedback} from '@ui-kitten/components/devsupport';
import {getRelativeTime} from '../../utils/timeUtil';

interface Props {
  post: Post;
  visible: boolean;
  onClose: () => void;
}

const PostComments = ({post, visible, onClose}: Props) => {
  const {height: viewportHeight} = useWindowDimensions();
  const [text, setText] = useState('');
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
      }
    },
  });

  const handleAddComment = () => {
    mutation.mutate({post, text});
    setText('');
  };
  // useEffect(() => {
  //   if (listRef.current) {
  //     listRef.current.scrollToEnd({animated: true});
  //   }
  // }, [post.commentsPost]);

  const renderComment = ({item}) => {
    return (
      <ListItem
        style={{
          marginVertical: 5,
          backgroundColor: 'rgba(143, 155, 179, 0.54)',
          // maxWidth: '80%',
          borderRadius: 10,
          paddingVertical: 6,
          paddingHorizontal: 10,
        }}
        title={item.authorComment.nombre}
        description={item.contentComment}
        accessoryLeft={() =>
          item.authorComment?.avatarUnicoUser ? (
            <Avatar
              style={styles.avatar}
              shape="round"
              source={{uri: item.authorComment?.avatarUnicoUser}}
              defaultSource={require('../../../assets/no-product-image.png')}
            />
          ) : (
            <Layout
              style={{
                ...styles.avatar,

                borderRadius: 50,
                backgroundColor: '#ccc',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  textAlign: 'center', // Centra el texto
                  fontSize: 25, // Ajusta el tamaño del texto
                }}>
                {item.authorComment?.nombre.substring(0, 2).toUpperCase()}
              </Text>
            </Layout>
          )
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
            // ref={listRef}
            data={post.commentsPost}
            renderItem={renderComment}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            // onContentSizeChange={() => {
            //   listRef.current?.scrollToEnd({animated: true});
            // }}
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

export default PostComments;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#fff',
    // borderRadius: 8,
    // margin: 5,
    // padding: 0,
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
    paddingHorizontal: 10,
    // marginBottom: 50,
    // paddingBottom: 50,
  },
  avatar: {
    // margin: 8,
    width: 50,
    height: 50,
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
});
