import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {GruposScreen} from './GruposScreen';
import {MenuStackChatNavigation} from '../navigations/MenuStackChatNavigation';

const Tab = createMaterialTopTabNavigator();

export const MensajeriaScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Chat" component={MenuStackChatNavigation} />
      <Tab.Screen name="Grupos" component={GruposScreen} />
    </Tab.Navigator>
  );
};
