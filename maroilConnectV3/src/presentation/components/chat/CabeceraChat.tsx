import {useState, useEffect} from 'react';
import {View, SafeAreaView, Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useAuthStore} from '../../store/auth/useAuthStore';
import {Avatar, Layout, Text, TopNavigationAction} from '@ui-kitten/components';
import {Chat} from '../../../domain/entities/chat';
import {MyIcon} from '../iu/MyIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CabeceraChatProps {
  chat: Chat;
}

export function CabeceraChat({chat}: CabeceraChatProps) {
  const {chat: chatCabeera} = chat;
  const [userChat, setUserChat] = useState(null);

  //   const [userChat, setUserChat] = useState(null);
  //   const [showDelete, setShowDelete] = useState(false);
  const navigation = useNavigation();
  const {user} = useAuthStore();

  useEffect(() => {
    (() => {
      try {
        const otherUser =
          user.id !== chatCabeera.participanteOne.id
            ? chatCabeera.participanteOne
            : chatCabeera.participanteTwo;
        setUserChat(otherUser);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [chatCabeera]);

  //   const openCloseDelete = () => setShowDelete(prevState => !prevState);

  //   const deleteChat = async () => {
  //     try {
  //       await chatController.remove(accessToken, chatId);
  //       openCloseDelete();
  //       navigation.goBack();
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   const goToUserProfile = () => {
  //     navigation.navigate(screens.global.userProfileScreen, {
  //       userId: userChat._id,
  //     });
  //   };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Layout style={styles.content}>
          <Layout style={styles.info}>
            <TopNavigationAction
              icon={<MyIcon name="chevron-left" width={40} height={40} />}
              onPress={async () => {
                await AsyncStorage.removeItem('ACTIVE_CHAT_ID');

                navigation.goBack();
              }}
              style={{marginRight: -5}}
            />

            {userChat && (
              <Pressable onPress={() => {}} style={styles.info}>
                {userChat?.avatarUnicoUser ? (
                  <Avatar
                    style={styles.avatar}
                    shape="round"
                    source={{
                      uri: userChat?.avatarUnicoUser,
                    }}
                  />
                ) : (
                  <Layout
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                      backgroundColor: '#ccc',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontSize: 20}}>
                      {userChat.nombre.substring(0, 2).toUpperCase()}
                    </Text>
                  </Layout>
                )}
                <Text style={styles.identity}>{userChat.nombre}</Text>
              </Pressable>
            )}
          </Layout>
          <Layout>
            {/* <IconButton
              icon={<DeleteIcon />}
              padding={0}
              onPress={openCloseDelete}
            /> */}
            {/* <TopNavigationAction
              icon={<MyIcon name="trash" />}
              onPress={() => {}}
            /> */}
          </Layout>
        </Layout>
      </SafeAreaView>

      {/* <AlertConfirm
        show={showDelete}
        onClose={openCloseDelete}
        textConfirm="Eliminar"
        onConfirm={deleteChat}
        title="Eliminar chat"
        message="¿Estas seguro de que quieres eliminar el chat?"
        isDanger
      /> */}
    </>
  );
}
export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#171717',
    height: 95,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingHorizontal: 0,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginLeft: 30,
    width: 50,
    height: 50,
  },
  identity: {
    // color: '#fff',
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
