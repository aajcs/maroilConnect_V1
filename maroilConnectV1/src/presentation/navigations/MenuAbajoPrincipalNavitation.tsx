/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {Animated, StyleSheet, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {HomeScreen} from '../screens/HomeScreen';

import {createContext, useContext, useEffect, useRef} from 'react';

import {MyIcon} from '../components/iu/MyIcon';
import {MensajeriaScreen} from '../screens/MensajeriaScreen';
import {ModulosScreen} from '../screens/ModulosScreen';
import {PublicarScreen} from '../screens/PublicarScreen';
import {useNavigation} from '@react-navigation/native';
import {Layout} from '@ui-kitten/components';

//
const Tab = createBottomTabNavigator();
export const AnimationContext = createContext(new Animated.Value(0.2));
// export const TabBarVisibleContext = createContext(new Animated.Value(0.2));

export const MenuAbajoPrincipalNavitation: React.FC = () => {
  const navigation = useNavigation();
  const EventListenerComponent = () => {
    return <Layout />;
  };
  return (
    <Tab.Navigator
      // tabBar={props => <CustomTabBar {...props} />}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName: string = '';
          switch (route.name) {
            case 'HomeScreen':
              iconName = 'home-outline';
              break;
            case 'NotificacionesScreen':
              iconName = 'bell-outline';
              break;
            case 'EventListener':
              iconName = 'copy-outline';
              break;
            case 'MensajeriaScreen':
              iconName = 'message-square-outline';
              break;
            case 'ModulosScreen':
              iconName = 'options-2-outline';
              break;
          }

          // You can return any component that you like here!
          return <MyIcon name={iconName} color={color} />;
        },

        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 15,
        },
        // tabBarStyle: {position: 'absolute', bottom: 0, height: 75},
        // tabBarStyle: {bottom: 0},
      })}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{title: 'Inicio'}}
      />

      {/* <Tab.Screen
        name="NotificacionesScreen"
        component={MenuTopNotificacionesNavigator}
        options={{title: 'Notificaciones'}}
      /> */}
      {/* <Tab.Screen
        name="PublicarScreen"
        component={PublicarScreen}
        options={{title: 'Publicar'}}
        initialParams={{postId: 'new'}}
        // listeners={{
        //   tabPress: e => {
        //     // Prevent default action
        //     e.preventDefault();

        //     // Do something on tab press
        //     console.log('Tab pressed');

        //     // Navigate to the screen
        //     // navigation.navigate('PublicarScreen', {
        //     //   postId: 'new',
        //     // });
        //     navigation.reset({
        //       index: 0,
        //       routes: [{name: 'PublicarScreen', params: {postId: post.id}}],
        //     });
        //   },
        // }}
      /> */}
      <Tab.Screen
        name="EventListener"
        component={EventListenerComponent}
        listeners={{
          tabPress: e => {
            // Prevent default action
            e.preventDefault();

            // Do something on tab press
            console.log('Tab pressed');

            // Navigate to the screen
            // navigation.navigate('PublicarScreen', {
            //   postId: 'new',
            // });
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: 'pantallas',
                  state: {
                    routes: [
                      {
                        name: 'PublicarScreen',
                        params: {postId: 'new'},
                      },
                    ],
                  },
                },
              ],
            });
          },
        }}
      />
      <Tab.Screen
        name="MensajeriaScreen"
        component={MensajeriaScreen}
        options={{
          title: 'Mensajeria',
        }}
      />
      <Tab.Screen
        name="ModulosScreen"
        component={ModulosScreen}
        options={{title: 'Modulos'}}
      />
      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  view: {
    // position: 'absolute',
    // left: 0,
    // right: 0,
    // bottom: 0,
    // backgroundColor: 'red',
  },
});
