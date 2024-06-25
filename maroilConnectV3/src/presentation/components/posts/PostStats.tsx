// PostStats.tsx
import {Button, Layout, Modal, Text, useTheme} from '@ui-kitten/components';
import {StatItem} from './StatItem';
import {Post} from '../../../domain/entities/post';
import {
  useMutation,
  useQueryClient,
  UseMutationResult,
} from '@tanstack/react-query';
import {updateCreateLikeAction} from '../../../actions/likes/updateCreateLikeAction';
import React, {useState} from 'react';
import {MyIcon} from '../iu/MyIcon';
import {useAuthStore} from '../../store/auth/useAuthStore';
import PostComments from './PostComments';

interface Props {
  post: Post;
  mutationView: UseMutationResult<Post, Error, Post, unknown>;
}

export const PostStats = ({post, mutationView}: Props) => {
  const {user} = useAuthStore();

  const theme = useTheme();
  const queryClient = useQueryClient();
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const mutation = useMutation({
    mutationFn: async (data: Post) => {
      await updateCreateLikeAction({...data, id: post.id});
      return data;
    },

    onSuccess: (data: Post) => {
      // postIdRef.current = data.id;
      if (data) {
        // queryClient.invalidateQueries({queryKey: ['likes', data.id]});
        queryClient.invalidateQueries({queryKey: ['posts', 'infinite']});
      }
      // queryClient.invalidateQueries({queryKey: ['post', data.id]});
    },
  });

  const handleLike = () => {
    return (
      post.likesPost?.some(like => like.authorLike?.id === user?.id) ?? false
    );
  };
  const handleModalClose = () => {
    setModalVisible(false);
  };
  return (
    <>
      <Layout
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
        {post.likesPost?.length > 0 && (
          <StatItem
            icon={handleLike() ? 'heart' : 'heart-outline'}
            color={handleLike() ? 'red' : undefined}
            count={post.likesPost?.length ?? 0}
            onClick={() => setVisible(true)}
          />
        )}
        {post.viewsPost?.length > 0 && (
          <StatItem
            icon="eye-outline"
            count={post.viewsPost?.length ?? 0}
            onClick={() => setVisible1(true)}
          />
        )}
        {post.commentsPost?.length > 0 && (
          <StatItem
            icon="message-circle-outline"
            count={post.commentsPost?.length ?? 0}
          />
        )}
      </Layout>
      <Layout
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 10,
        }}>
        <StatItem
          icon={handleLike() ? 'heart' : 'heart-outline'}
          color={handleLike() ? 'red' : undefined}
          count={' Me Gusta'}
          onClick={() => {
            mutation.mutate(post);
            mutationView.mutate(post);
          }}
        />
        <StatItem
          icon="message-circle-outline"
          count={' Comentar'}
          onClick={() => setModalVisible(true)}
        />
        <PostComments
          post={post}
          visible={modalVisible}
          onClose={handleModalClose}
        />
      </Layout>
      <Modal
        animationType="fade"
        visible={visible}
        onBackdropPress={() => setVisible(false)}
        style={{
          width: '100%',
          height: '100%',
        }}>
        <Layout
          style={{
            flex: 1,
            // justifyContent: 'center',
            // alignItems: 'center',
            backgroundColor: theme['background-basic-color-1'],
          }}>
          <Button
            size="tiny"
            onPress={() => setVisible(false)}
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
          <Layout style={{padding: 20}}>
            {post.likesPost?.map((like, index) => (
              <React.Fragment key={index}>
                {/* <Text>{JSON.stringify(like, null, 2)}</Text> */}
                {like.authorLike && like.authorLike.nombre && (
                  <Text>{like.authorLike.nombre}</Text>
                )}
              </React.Fragment>
            ))}
            <Text>{JSON.stringify(post, null, 2)}</Text>
          </Layout>
        </Layout>
      </Modal>
      <Modal
        animationType="fade"
        visible={visible1}
        onBackdropPress={() => setVisible1(false)}
        style={{
          width: '100%',
          height: '100%',
        }}>
        <Layout
          style={{
            flex: 1,
            // justifyContent: 'center',
            // alignItems: 'center',
            backgroundColor: theme['background-basic-color-1'],
          }}>
          <Button
            size="tiny"
            onPress={() => setVisible1(false)}
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
          <Layout style={{padding: 20}}>
            {post.viewsPost?.map((view, index) => (
              <React.Fragment key={index}>
                {/* <Text>{JSON.stringify(view, null, 2)}</Text> */}
                {view.authorView && view.authorView.nombre && (
                  <Text>{view.authorView.nombre}</Text>
                )}
              </React.Fragment>
            ))}
          </Layout>
        </Layout>
      </Modal>
    </>
  );
};
