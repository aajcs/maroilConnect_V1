import {Layout, List, Text} from '@ui-kitten/components';
import {useContext, useRef, useState} from 'react';
import {Animated, RefreshControl} from 'react-native';
import {useQueryClient} from '@tanstack/react-query';
import {TabBarVisibleContext} from '../../providers/TabBarVisibleContext';
import {Usuario} from '../../../domain/entities/usuario';
import {UsuarioCardList} from './UsuarioCardList';
import {UsuarioCardListAdministracion} from './UsuarioCardListAdministracion';

interface Props {
  usuarios: Usuario[];
  administracion: boolean;
}

export const UsuarioList = ({usuarios, administracion}: Props) => {
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
    queryClient.invalidateQueries({
      queryKey: ['usuariosAdministracion', 'infinite'],
    });
    setIsRefreshing(false);
  };

  return (
    <List
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      viewabilityConfig={viewabilityConfig}
      bounces={!isRefreshing}
      style={{padding: 0}}
      data={usuarios}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={({item, index}) =>
        administracion ? (
          <UsuarioCardListAdministracion
            usuario={item}
            index={`${item.id}-${index}`}
          />
        ) : (
          <UsuarioCardList usuario={item} index={`${item.id}-${index}`} />
        )
      }
      ListFooterComponent={() => (
        <Layout style={{height: 100, backgroundColor: 'trasparente'}} />
      )}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onPullToRefresh} />
      }
    />
  );
};
