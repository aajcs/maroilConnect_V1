/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {Animated, StyleSheet, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {HomeScreen} from '../screens/HomeScreen';

import {createContext, useContext, useEffect, useRef, useState} from 'react';

import {MyIcon} from '../components/iu/MyIcon';
import {MensajeriaScreen} from '../screens/MensajeriaScreen';
import {ModulosScreen} from '../screens/ModulosScreen';
import {PublicarScreen} from '../screens/PublicarScreen';
import {useNavigation} from '@react-navigation/native';
import {Layout} from '@ui-kitten/components';
import {NotificacionesScreen} from '../screens/NotificacionesScreen';
import {TabBarVisibleContext} from '../providers/TabBarVisibleContext';
import {useAuthStore} from '../store/auth/useAuthStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

//
const Tab = createBottomTabNavigator();
export const AnimationContext = createContext(new Animated.Value(0.2));
// export const TabBarVisibleContext = createContext(new Animated.Value(0.2));

const CustomTabBar = (props: any) => {
  // const animationValue = useContext(AnimationContext);
  const scrollDirection = useContext(TabBarVisibleContext);

  const translateY = scrollDirection.interpolate({
    inputRange: [0, 1], // Ajusta estos valores según tus necesidades
    outputRange: [0, 75],
    extrapolate: 'clamp',
  });

  const tabBarStyle = StyleSheet.create({
    tabBar: {
      transform: [{translateY}],
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
    },
  });

  return (
    <Animated.View style={tabBarStyle.tabBar}>
      {/* <Animated.View style={[styles.view, {transform: [{translateY}]}]}> */}
      <BottomTabBar {...props} />
    </Animated.View>
  );
};

export const MenuAbajoPrincipalNavitation: React.FC = () => {
  const {user} = useAuthStore();
  const [totalMessage, setTotalMessage] = useState<string | null>(null);

  useEffect(() => {
    const getTotalMessage = async () => {
      const value = await AsyncStorage.getItem('totalMessage');

      setTotalMessage(value || null); // Provide a default value of null if value is null
    };

    getTotalMessage();
  }, []);
  const navigation = useNavigation();
  const EventListenerComponent = () => {
    return <Layout />;
  };

  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName: string = '';
          switch (route.name) {
            case 'HomeScreen':
              iconName = 'home';
              break;
            case 'NotificacionesScreen':
              iconName = 'bell';
              break;
            case 'Publicar':
              iconName = 'plus-circle';
              break;
            case 'MensajeriaScreen':
              iconName = 'message-square';
              break;
            case 'ModulosScreen':
              iconName = 'layout';
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
        options={({navigation}) => ({
          title: 'Inicio',
          tabBarLabel: ({focused, color, position}) => (
            <Text
              style={{fontSize: focused ? 14 : 12, color}}
              numberOfLines={1}
              ellipsizeMode="tail">
              Inicio
            </Text>
          ),
          listeners: {
            tabPress: e => {
              // Prevent default action
              console.log('clicked');
              e.preventDefault();

              // Get the current screen's params
              const params = navigation
                .dangerouslyGetState()
                .routes.find(r => r.name === 'HomeScreen').params;

              // Update the `tabPressed` state in the `HomeScreen` component
              params?.setTabPressed(true);
            },
          },
        })}
      />

      <Tab.Screen
        name="NotificacionesScreen"
        component={NotificacionesScreen}
        options={{
          title: 'Notificaciones',
          tabBarLabel: ({focused, color, position}) => (
            <Text
              style={{
                fontSize: focused ? 14 : 12,
                color,
              }}
              numberOfLines={1}
              ellipsizeMode="tail">
              Notificaciones
            </Text>
          ),
        }}
      />
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

        //     // Navigate to the screen
        //     // navigation.navigate('PublicarScreen', {
        //     //   postId: 'new',
        //     // });
        //     navigation.reset({
        //       index: 0,
        //       routes: [{name: 'PublicarScreen', params: {postId: post.id}}],
        //     });
        //   },
        // }}colaborador
moderador
administrador
      /> */}
      {user?.rolesMaroilConnect.some(role =>
        ['administrador', 'superadmin', 'colaborador', 'moderador'].includes(
          role,
        ),
      ) && (
        <Tab.Screen
          name="Publicar"
          component={EventListenerComponent}
          options={{
            title: 'Publicar',
            tabBarLabel: ({focused, color, position}) => (
              <Text
                style={{fontSize: focused ? 14 : 12, color}}
                numberOfLines={1}
                ellipsizeMode="tail">
                Publicar
              </Text>
            ),
          }}
          listeners={{
            tabPress: e => {
              // Prevent default action
              e.preventDefault();

              // Do something on tab press

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
      )}

      <Tab.Screen
        name="MensajeriaScreen"
        component={MensajeriaScreen}
        options={{
          title: 'Mensajeria',
          tabBarLabel: ({focused, color, position}) => (
            <Text
              style={{fontSize: focused ? 14 : 12, color}}
              numberOfLines={1}
              ellipsizeMode="tail">
              Mensajeria
            </Text>
          ),
          tabBarBadge: totalMessage || undefined,
        }}
      />
      <Tab.Screen
        name="ModulosScreen"
        component={ModulosScreen}
        options={{
          title: 'Modulos',
          tabBarLabel: ({focused, color, position}) => (
            <Text
              style={{fontSize: focused ? 14 : 12, color}}
              numberOfLines={1}
              ellipsizeMode="tail">
              Modulos
            </Text>
          ),
        }}
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
