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
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {getRelativeTime} from '../../utils/timeUtil';
import {useNavigation} from '@react-navigation/native';
import {AvatarNombre} from '../iu/AvatarNombre';

interface Props {
  post: Post;
  mutationView: UseMutationResult<Post, Error, Post, unknown>;
  modalVisibleComentarios: boolean;
  setModalVisibleComentarios: (value: boolean) => void;
}

export const PostStats = ({
  post,
  mutationView,
  modalVisibleComentarios,
  setModalVisibleComentarios,
}: Props) => {
  const {user} = useAuthStore();
  const navigation = useNavigation();
  const theme = useTheme();
  const queryClient = useQueryClient();
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [liked, setLiked] = useState(() => {
    return (
      post.likesPost?.some(like => like.authorLike?.id === user?.id) ?? false
    );
  });
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
        queryClient.invalidateQueries({queryKey: ['postsUser', 'infinite']});
      }
      // queryClient.invalidateQueries({queryKey: ['post', data.id]});
    },
  });

  const handleClick = () => {
    // Actualiza el estado local inmediatamente
    setLiked(!liked);

    // Realiza la mutación en segundo plano
    mutation.mutate(post);
    mutationView.mutate(post);
  };

  const handleModalClose = () => {
    setModalVisibleComentarios(false);
  };
  return (
    <>
      <Layout
        style={{
          flexDirection: 'row',
          // justifyContent: 'space-between',
          marginTop: 10,
        }}>
        {post.likesPost && (
          <>
            <StatItem
              icon={liked ? 'heart' : 'heart-outline'}
              color={liked ? 'red' : undefined}
              // count={post.likesPost?.length ?? 0}
              onClick={handleClick}
            />
            <StatItem
              // icon={handleLike() ? 'heart' : 'heart-outline'}
              // color={handleLike() ? 'red' : undefined}
              count={post.likesPost?.length ?? 0}
              onClick={() => setVisible(true)}
            />
          </>
        )}
        {post.commentsPost && (
          <>
            <StatItem
              icon="message-circle-outline"
              count={post.commentsPost?.length ?? 0}
              onClick={() => setModalVisibleComentarios(true)}
            />

            <PostComments
              post={post}
              visible={modalVisibleComentarios}
              onClose={handleModalClose}
            />
          </>
        )}
        {post.viewsPost?.length > 0 && (
          <StatItem
            icon="eye-outline"
            count={post.viewsPost?.length ?? 0}
            onClick={() => setVisible1(true)}
          />
        )}
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
          <SafeAreaView>
            <Layout
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                // backgroundColor: '#f9f9f9',
                padding: 2,
                marginVertical: 2,
                borderRadius: 5,
              }}>
              <Button
                size="tiny"
                onPress={() => setVisible(false)}
                style={{
                  backgroundColor: 'transparent',
                  borderRadius: 50,
                  borderColor: 'transparent',
                  // marginLeft: -20,
                  marginRight: 10,
                }}>
                <MyIcon name="close" white />
              </Button>
              <Text style={{fontSize: 20, fontWeight: 'bold', paddingRight: 4}}>
                Le gusta a
              </Text>
              <Text
                style={{fontSize: 18, fontStyle: 'italic', marginLeft: 'auto'}}>
                {post.likesPost?.length ?? 0} me gusta
              </Text>
            </Layout>
            <Layout
              style={{
                height: 1,
                backgroundColor: theme['background-alternative-color-1'],
                marginVertical: 10,
              }}
            />
            <ScrollView style={{padding: 10}}>
              {post.likesPost?.map((like, index) => (
                <React.Fragment key={index}>
                  {/* <Text>{JSON.stringify(like, null, 2)}</Text> */}
                  {like.authorLike && like.authorLike.nombre && (
                    <Layout
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        // backgroundColor: '#f9f9f9',
                        // padding: 2,
                        marginVertical: 2,
                        borderRadius: 5,
                      }}>
                      {like.authorLike && (
                        <AvatarNombre usuario={like.authorLike} />
                      )}

                      <Layout>
                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                          {like.authorLike.nombre}
                        </Text>
                        <Text style={{fontSize: 14, paddingHorizontal: 2}}>
                          {like.createdAt &&
                            getRelativeTime(like.createdAt.toString())}
                        </Text>
                      </Layout>
                      <Button
                        size="tiny"
                        appearance="outline"
                        status="info"
                        style={{marginLeft: 'auto'}}
                        onPress={() => {
                          navigation.navigate('PerfilUsuarioScreen', {
                            userId: like.authorLike.id,
                          });
                          setVisible(false);
                        }}>
                        Ver Perfil
                      </Button>
                    </Layout>
                  )}
                </React.Fragment>
              ))}
              {/* <Text>{JSON.stringify(post, null, 2)}</Text> */}
            </ScrollView>
          </SafeAreaView>
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
          <SafeAreaView>
            <Layout
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                // backgroundColor: '#f9f9f9',
                padding: 2,
                marginVertical: 2,
                borderRadius: 5,
              }}>
              <Button
                size="tiny"
                onPress={() => setVisible1(false)}
                style={{
                  backgroundColor: 'transparent',
                  borderRadius: 50,
                  borderColor: 'transparent',
                  // marginLeft: -20,
                  marginRight: 10,
                }}>
                <MyIcon name="close" />
              </Button>
              <Text style={{fontSize: 20, fontWeight: 'bold', paddingRight: 4}}>
                Visto por
              </Text>
              <Text
                style={{fontSize: 18, fontStyle: 'italic', marginLeft: 'auto'}}>
                {post.viewsPost?.length ?? 0} vistas
              </Text>
            </Layout>
            <Layout
              style={{
                height: 1,
                backgroundColor: theme['background-alternative-color-1'],
                marginVertical: 10,
              }}
            />
            <ScrollView style={{padding: 10}}>
              {post.viewsPost?.map((view, index) => (
                <React.Fragment key={index}>
                  {/* <Text>{JSON.stringify(view, null, 2)}</Text> */}
                  {view.authorView && view.authorView.nombre && (
                    <Layout
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        // backgroundColor: '#f9f9f9',
                        // padding: 2,
                        marginVertical: 2,
                        borderRadius: 5,
                      }}>
                      {view.authorView && (
                        <AvatarNombre usuario={view.authorView} />
                      )}

                      <Layout>
                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                          {view.authorView.nombre}
                        </Text>
                        <Text style={{fontSize: 14, paddingHorizontal: 2}}>
                          {view.createdAt &&
                            getRelativeTime(view.createdAt.toString())}
                        </Text>
                      </Layout>
                      <Button
                        size="tiny"
                        appearance="outline"
                        status="info"
                        style={{marginLeft: 'auto'}}
                        onPress={() => {
                          navigation.navigate('PerfilUsuarioScreen', {
                            userId: view.authorView?.id,
                          });
                          setVisible1(false);
                        }}>
                        Ver Perfil
                      </Button>
                    </Layout>
                  )}
                </React.Fragment>
              ))}
              {/* <Text>{JSON.stringify(post, null, 2)}</Text> */}
            </ScrollView>
          </SafeAreaView>
        </Layout>
      </Modal>
      {/* <Modal
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
                 <Text>{JSON.stringify(view, null, 2)}</Text>
                {view.authorView && view.authorView.nombre && (
                  <>
                    <Text>{view.authorView.nombre}</Text>
                  </>
                )}
              </React.Fragment>
            ))}
          </Layout>
        </Layout>
      </Modal> */}
    </>
  );
};

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
    marginRight: 10,
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
