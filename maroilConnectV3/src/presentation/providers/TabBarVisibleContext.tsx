import {createContext} from 'react';
import {Animated} from 'react-native';

export const TabBarVisibleContext = createContext(new Animated.Value(0));
