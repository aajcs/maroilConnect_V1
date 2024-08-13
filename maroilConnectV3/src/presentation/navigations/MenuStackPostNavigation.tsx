import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {PublicarScreen} from '../screens/PublicarScreen';
import {ChatScreen} from '../screens/ChatScreen';
import {PerfilUsuarioScreen} from '../screens/PerfilUsuarioScreen';

export type RootStackParams2 = {
  ChatScreens: undefined;
  ChatScreen: undefined;
  Pagina3Screens: undefined;
  CreateChatScreen: undefined;
  PersonaScreens: {id: number; nombre: string};
  PublicarScreen: {postId: string};
  PerfilUsuarioScreen: {usertId: string};
  pantallas: {
    routes: {
      name: string;
      state: {routes: {name: string; params: {postId: string}}[]}[];
    }[];
  };
};

const Stack = createStackNavigator<RootStackParams2>();

export const MenuStackPostNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        // options={{cardStyleInterpolator: fadeAnimation}}
        name="PublicarScreen"
        component={PublicarScreen}
        options={{
          headerShown: false,
          title: 'Crear Publicacion',
          presentation: 'modal',
        }}
      />
      {/* <Stack.Screen
        // options={{cardStyleInterpolator: fadeAnimation}}
        name="PerfilUsuarioScreen"
        component={PerfilUsuarioScreen}
      /> */}
      {/* <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          headerShown: false,
          title: 'Nuevo Chat',
          presentation: 'modal',
          // headerLeft: null,

          // headerShown: false,
          // cardStyle: {backgroundColor: 'transparent', opacity: 0.9},
          // cardOverlayEnabled: true,
          // cardStyleInterpolator: ({current: {progress}}) => {
          //   return {
          //     cardStyle: {
          //       opacity: progress,
          //     },
          //   };
          // },
        }}
      /> */}
    </Stack.Navigator>
  );
};
