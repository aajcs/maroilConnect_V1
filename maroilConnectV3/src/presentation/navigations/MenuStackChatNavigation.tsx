import {createStackNavigator} from '@react-navigation/stack';
import {Layout, Text} from '@ui-kitten/components';
import {ChatsScreen} from '../screens/ChatsScreen';
import {CreateChatScreen} from '../screens/CreateChatScreen';
import {ChatScreen} from '../screens/ChatScreen';

const Stack = createStackNavigator();

export const MenuStackChatNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardOverlayEnabled: true,
        cardOverlay: () => (
          <Layout style={{flex: 1, backgroundColor: '#fff'}} />
          // Reemplaza '#yourColor' con el color de tu tema
        ),
      }}>
      <Stack.Screen
        //  options={{cardStyleInterpolator: fadeAnimation}}
        name="ChatScreens"
        component={ChatsScreen}
      />
      <Stack.Screen
        name="CreateChatScreen"
        component={CreateChatScreen}
        options={{
          title: 'Nuevo Chat',
          presentation: 'modal',
          headerLeft: null,
          // headerShown: false,
        }}
      />
      {/* <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          title: 'Nuevo Chat',
          presentation: 'modal',
          headerLeft: null,

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
