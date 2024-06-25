import {Layout, List} from '@ui-kitten/components';
import {Post} from '../../../domain/entities/post';
import {PostCard} from './PostCard';
import {useContext, useRef, useState} from 'react';
import {Animated, RefreshControl, ViewToken} from 'react-native';
import {useQueryClient} from '@tanstack/react-query';
import {TabBarVisibleContext} from '../../providers/TabBarVisibleContext';

interface Props {
  post: Post[];
}

export const PostList = ({post}: Props) => {
  const queryClient = useQueryClient();
  const scrollY = useContext(TabBarVisibleContext);
  const previousScrollY = useRef(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [viewableItems, setViewableItems] = useState<string[]>([]);

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  const onViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      setViewableItems(viewableItems.map(item => item.key));
    },
  ).current;

  const onPullToRefresh = async () => {
    setIsRefreshing(true);
    queryClient.invalidateQueries({queryKey: ['posts', 'infinite']});
    setIsRefreshing(false);
  };

  const handleScroll = (event: any) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    const isScrollingDown = currentScrollY > previousScrollY.current;
    previousScrollY.current = currentScrollY;

    Animated.spring(scrollY, {
      toValue: isScrollingDown ? 1 : -1,
      tension: 25,
      friction: 10,
      useNativeDriver: false,
    }).start();
  };

  return (
    <List
      onScroll={handleScroll}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
      bounces={!isRefreshing}
      style={{padding: 0}}
      data={post}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={({item, index}) => (
        <PostCard
          post={item}
          index={`${item.id}-${index}`}
          viewableItems={viewableItems}
        />
      )}
      ListFooterComponent={() => <Layout style={{height: 100}} />}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onPullToRefresh} />
      }
    />
  );
};
