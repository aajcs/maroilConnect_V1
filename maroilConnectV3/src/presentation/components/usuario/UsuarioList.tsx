import {Layout, List} from '@ui-kitten/components';
import {useContext, useRef, useState} from 'react';
import {Animated, RefreshControl} from 'react-native';
import {useQueryClient} from '@tanstack/react-query';
import {TabBarVisibleContext} from '../../providers/TabBarVisibleContext';
import {Usuario} from '../../../domain/entities/usuario';
import {UsuarioCardList} from './UsuarioCardList';

interface Props {
  usuarios: Usuario[];
}

export const UsuarioList = ({usuarios}: Props) => {
  const queryClient = useQueryClient();
  const scrollY = useContext(TabBarVisibleContext);
  const previousScrollY = useRef(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  const onPullToRefresh = async () => {
    setIsRefreshing(true);
    queryClient.invalidateQueries({queryKey: ['usuarios', 'infinite']});
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
      data={usuarios}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={({item, index}) => (
        <UsuarioCardList usuario={item} index={`${item.id}-${index}`} />
      )}
      ListFooterComponent={() => <Layout style={{height: 100}} />}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onPullToRefresh} />
      }
    />
  );
};
