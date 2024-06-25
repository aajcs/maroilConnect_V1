import {Layout, List, Text} from '@ui-kitten/components';
import {Post} from '../../../domain/entities/post';
import {PostCard} from './PostCard';
import {useState} from 'react';
import {RefreshControl} from 'react-native';
import {useQueryClient} from '@tanstack/react-query';

interface Props {
  post: Post[];
}

export const PostList = ({post}: Props) => {
  const queryClient = useQueryClient();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onPullToRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 200));
    queryClient.invalidateQueries({queryKey: ['posts', 'infinite']});
    setIsRefreshing(false);
  };

  return (
    <List
      style={{padding: 0}}
      data={post}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={({item}) => <PostCard post={item} />}
      ListFooterComponent={() => <Layout style={{height: 100}} />}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onPullToRefresh} />
      }
    />
  );
};
