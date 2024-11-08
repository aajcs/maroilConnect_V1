import {Button, Layout, List} from '@ui-kitten/components';
import {Post} from '../../../domain/entities/post';
import {PostCard} from './PostCard';
import {useContext, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  RefreshControl,
  ViewToken,
} from 'react-native';
import {useQueryClient} from '@tanstack/react-query';
import {TabBarVisibleContext} from '../../providers/TabBarVisibleContext';

interface Props {
  post: (Post | null)[];
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  borrador?: boolean;
  handleGoToTop: () => void;
  listRef: any;
}

export const PostList = ({
  post,
  fetchNextPage,
  isFetchingNextPage,
  borrador,
  handleGoToTop,
  listRef,
}: Props) => {
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
    queryClient.invalidateQueries({queryKey: ['postsBorrador', 'infinite']});
    queryClient.invalidateQueries({queryKey: ['postsUser', 'infinite']});
    setIsRefreshing(false);
  };

  const handleScroll = (event: any) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    const isScrollingDown = currentScrollY > previousScrollY.current;
    previousScrollY.current = currentScrollY;

    if (currentScrollY > 300) {
      Animated.spring(scrollY, {
        toValue: isScrollingDown ? 1 : -1,
        tension: 25,
        friction: 10,
        useNativeDriver: false,
      }).start();
    }
  };
  const renderItem = ({item, index}) => (
    <PostCard
      post={item}
      index={`${item.id}-${index}`}
      viewableItems={viewableItems}
      borrador={borrador}
    />
  );
  return (
    <>
      <List
        ref={listRef}
        onScroll={!borrador ? handleScroll : undefined}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        bounces={!isRefreshing}
        style={{paddingBottom: 0}}
        data={post}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={renderItem}
        ListFooterComponent={() => (
          <Layout style={{height: 100, backgroundColor: 'trasparente'}} />
        )}
        // ListFooterComponent={
        //   () => <Layout style={{height: 100}} />
        //   //   isFetchingNextPage && <ActivityIndicator size="large" color="#0000ff" />
        // }
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onPullToRefresh}
          />
        }
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.8}
      />
    </>
  );
};
