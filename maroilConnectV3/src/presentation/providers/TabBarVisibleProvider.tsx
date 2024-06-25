import {Animated} from 'react-native';
import {TabBarVisibleContext} from './TabBarVisibleContext';

export const TabBarVisibleProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const scrollY = new Animated.Value(0);

  return (
    <TabBarVisibleContext.Provider value={scrollY}>
      {children}
    </TabBarVisibleContext.Provider>
  );
};
