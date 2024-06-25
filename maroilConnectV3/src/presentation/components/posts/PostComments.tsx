import React, {useState} from 'react';
import {Layout, List, ListItem, Input, Modal} from '@ui-kitten/components';
import {Post} from '../../../domain/entities/post';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {updateCreateCommentAction} from '../../../actions/coments/updateCreateCommentAction';
import {Button} from '@ui-kitten/components';
import {
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
} from 'react-native';
import {TouchableWithoutFeedback} from '@ui-kitten/components/devsupport';

interface Props {
  post: Post;
  visible: boolean;
  onClose: () => void;
}

const PostComments = ({post, visible, onClose}: Props) => {
  const {height: viewportHeight} = useWindowDimensions();
  const [text, setText] = useState('');

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
      }
    },
  });

  const handleAddComment = () => {
    mutation.mutate({post, text});
    setText('');
  };

  const renderComment = ({item}) => (
    <ListItem
      title={item.authorComment.nombre}
      description={item.contentComment}
    />
  );

  return (
    <Modal
      visible={visible}
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
          style={{height: viewportHeight - 450, backgroundColor: 'transparent'}}
        />
      </TouchableWithoutFeedback>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        // keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        style={{position: 'absolute', bottom: 0, width: '100%'}}>
        <Layout
          style={{
            height: 400,
            backgroundColor: 'red',
            alignContent: 'center',
            justifyContent: 'center',
            width: '100%',
          }}>
          <List
            data={post.commentsPost}
            renderItem={renderComment}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
        </Layout>
        <Input
          value={text}
          onChangeText={setText}
          placeholder="Add a comment..."
        />
        <Button onPress={handleAddComment}>Add Comment</Button>
        <Layout style={{height: 20}} />
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default PostComments;
