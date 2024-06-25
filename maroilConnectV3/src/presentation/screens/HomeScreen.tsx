import {Button, Icon, Layout, Text} from '@ui-kitten/components';
import {useAuthStore} from '../store/auth/useAuthStore';
import {getPosts} from '../../actions/posts/getPostsActions';
import {useQuery} from '@tanstack/react-query';
import {FullScreenLoader} from '../components/iu/FullScreenLoader';
import {PostList} from '../components/posts/PostList';
import {FullScreenAccessDenied} from '../components/iu/FullScreenAccessDenied';

export const HomeScreen = () => {
  const {logout, user} = useAuthStore();

  console.log('chatMaroilConnect', user);

  const {isLoading, data: posts} = useQuery({
    queryKey: ['posts', 'infinite'],
    staleTime: 1000 * 60 * 5,
    queryFn: () => getPosts(),
  });

  return (
    <Layout
      style={{
        flex: 1,
      }}>
      <FullScreenAccessDenied />
      {/* {isLoading ? <FullScreenLoader /> : <PostList post={posts || []} />} */}
      {/* <FullScreenLoader /> */}
      {/* <Text>{JSON.stringify(posts, null, 2)}</Text> */}
      {/* <Icon name="facebook" /> */}
      {/* <Button onPress={logout} accessoryLeft={<Icon name="log-out-outline" />}>
        Cerrar secion
      </Button> */}
    </Layout>
  );
};
