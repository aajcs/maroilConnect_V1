import {Layout} from '@ui-kitten/components';
import {useAuthStore} from '../store/auth/useAuthStore';
import {getPostsAprobados} from '../../actions/posts/getPostsActions';
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {FullScreenLoader} from '../components/iu/FullScreenLoader';
import {PostList} from '../components/posts/PostList';
import {FullScreenAccessDenied} from '../components/iu/FullScreenAccessDenied';

export const HomeScreen = () => {
  const {user} = useAuthStore();
  const {rolesMaroilConnect} = user || {}; // Add type guard to ensure 'user' is defined

  const hasNotRol = rolesMaroilConnect?.includes('NotRol');

  // const {isLoading, data: posts} = useQuery({
  //   queryKey: ['posts', 'infinite'],
  //   staleTime: 1000 * 60 * 5,
  //   queryFn: () => getPostsStatusPublicado(),
  // });

  const {isLoading, data, fetchNextPage} = useInfiniteQuery({
    queryKey: ['posts', 'infinite'],
    staleTime: 1000 * 60 * 60, // 1 hour
    initialPageParam: 0,

    queryFn: async params => await getPostsAprobados(params.pageParam),
    getNextPageParam: (lastPage, allPages) => allPages.length,
  });

  return (
    <Layout
      style={{
        flex: 1,
      }}>
      {!hasNotRol ? (
        isLoading ? (
          <FullScreenLoader />
        ) : (
          <PostList
            post={data?.pages.flat() || []}
            fetchNextPage={fetchNextPage}
          />
        )
      ) : (
        <FullScreenAccessDenied />
      )}
    </Layout>
  );
};
