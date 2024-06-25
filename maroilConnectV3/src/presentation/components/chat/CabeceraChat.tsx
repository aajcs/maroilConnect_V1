import {useState, useEffect} from 'react';
import {View, SafeAreaView, Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useAuthStore} from '../../store/auth/useAuthStore';
import {Avatar, Layout, Text, TopNavigationAction} from '@ui-kitten/components';
import {Chat} from '../../../domain/entities/chat';
import {MyIcon} from '../iu/MyIcon';

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
              icon={<MyIcon name="chevron-left" />}
              onPress={navigation.goBack}
            />

            {userChat && (
              <Pressable onPress={() => {}} style={styles.info}>
                {userChat?.avatar ? (
                  <Avatar
                    style={styles.avatar}
                    shape="round"
                    source={{
                      uri: 'https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2022/03/avatar-facebook-2632445.jpg?tf=3840x',
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
                    <Text style={styles.avatar}>
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
            <TopNavigationAction
              icon={<MyIcon name="trash" />}
              onPress={() => {}}
            />
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
    paddingHorizontal: 16,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginLeft: 30,
  },
  identity: {
    // color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
