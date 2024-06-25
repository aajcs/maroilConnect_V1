import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {PublicarScreen} from '../screens/PublicarScreen';

export type RootStackParams2 = {
  Pagina1Screens: undefined;
  Pagina2Screens: undefined;
  Pagina3Screens: undefined;
  PersonaScreens: {id: number; nombre: string};
  PublicarScreen: {postId: string};
};

const Stack = createStackNavigator<RootStackParams2>();

export const MenuStackPostNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        // options={{cardStyleInterpolator: fadeAnimation}}
        name="PublicarScreen"
        component={PublicarScreen}
      />
    </Stack.Navigator>
  );
};
