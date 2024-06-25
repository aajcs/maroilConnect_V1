import {Layout, List} from '@ui-kitten/components';
import {useContext, useRef, useState} from 'react';
import {Animated, RefreshControl} from 'react-native';
import {useQueryClient} from '@tanstack/react-query';
import {TabBarVisibleContext} from '../../providers/TabBarVisibleContext';
import {Chat} from '../../../domain/entities/chat';
import {ChatCardList} from './ChatCardList';

interface Props {
  chats: Chat[];
  upTopChat: (chatId: string) => void;
}

export const ChatList = ({chats, upTopChat}: Props) => {
  const queryClient = useQueryClient();
  const scrollY = useContext(TabBarVisibleContext);
  const previousScrollY = useRef(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  const onPullToRefresh = async () => {
    setIsRefreshing(true);
    queryClient.invalidateQueries({queryKey: ['chats', 'infinite']});
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
      viewabilityConfig={viewabilityConfig}
      bounces={!isRefreshing}
      style={{padding: 0}}
      data={chats}
      keyExtractor={(item, index) => `${item._id}-${index}`}
      renderItem={({item, index}) => (
        <ChatCardList
          chat={item}
          index={`${item._id}-${index}`}
          upTopChat={upTopChat}
        />
      )}
      ListFooterComponent={() => <Layout style={{height: 100}} />}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onPullToRefresh} />
      }
    />
  );
};
