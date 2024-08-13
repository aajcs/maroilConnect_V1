import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {PublicarScreen} from '../screens/PublicarScreen';
import {ChatScreen} from '../screens/ChatScreen';
import {PerfilUsuarioScreen} from '../screens/PerfilUsuarioScreen';

export type RootStackParams3 = {
  ChatScreen: undefined;
};

const Stack = createStackNavigator<RootStackParams3>();

export const MenuStackChatUnicoNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
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
      />
    </Stack.Navigator>
  );
};
