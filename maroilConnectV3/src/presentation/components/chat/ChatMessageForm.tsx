import {useState, useEffect} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Input, Layout, Button} from '@ui-kitten/components';
import {MyIcon} from '../iu/MyIcon';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Chat} from '../../../domain/entities/chat';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {updateCreateChatMessageAction} from '../../../actions/chat/updateCreateChatMessageAction';

// const chatMessageController = new ChatMessage();
interface Props {
  chat: Chat;
}

export const ChatMessageForm = ({chat}: Props) => {
  const {_id: chatId} = chat;
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: Chat) => {
      await updateCreateChatMessageAction(data);
      return data;
    },

    onSuccess: () => {
      // queryClient.invalidateQueries({queryKey: ['chatMessage', chatId]});
      // navigation.goBack();
    },
  });

  useEffect(() => {
    if (Platform.OS === 'ios') {
      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        e => setKeyboardHeight(e.endCoordinates.height),
      );
      const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => setKeyboardHeight(0),
      );

      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }
  }, []);
  //   const {chatId} = props;
  //   const {accessToken} = useAuth();
  //   const [keyboardHeight, setKeyboardHeight] = useState(0);

  // useEffect(() => {
  //   const showKeyboardSub = Keyboard.addListener('keyboardDidShow', e => {
  //     const {startCoordinates} = e;

  //     if (Platform.OS === 'ios') {
  //       setKeyboardHeight(startCoordinates.height + 65);
  //     }
  //   });

  //   const hideKeyboardSub = Keyboard.addListener('keyboardDidHide', () => {
  //     setKeyboardHeight(0);
  //   });

  //   return () => {
  //     showKeyboardSub.remove();
  //     hideKeyboardSub.remove();
  //   };
  // }, []);
  const initialValues = () => {
    return {
      message: '',
    };
  };

  const validationSchema = () => {
    return Yup.object({
      message: Yup.string().required(true),
    });
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async formValue => {
      try {
        setKeyboardHeight(0);
        Keyboard.dismiss();
        console.log('formik', formValue);

        // await chatMessageController.sendText(
        //   accessToken,
        //   chatId,
        //   formValue.message,
        // );
        const data = {
          chatId,
          message: formValue.message,
        };
        mutation.mutate(data);

        formik.handleReset();
      } catch (error) {
        console.error(error);
      }
    },
  });

  const sendIcon = props => (
    <TouchableOpacity
      onPress={() => {
        // Aquí va tu código para manejar el evento onPress
        if (!formik.isSubmitting) {
          formik.handleSubmit();
        }
      }}>
      <MyIcon name="paper-plane-outline" {...props} />
    </TouchableOpacity>
  );

  return (
    <Layout style={[styles.content, {bottom: keyboardHeight}]}>
      {/* <SendMedia chatId={chatId} /> */}

      <Layout style={styles.inputContainer}>
        <Input
          placeholder="Enviar un mensaje..."
          style={styles.input}
          //   variant="unstyled"
          value={formik.values.message}
          onChangeText={text => formik.setFieldValue('message', text)}
          //   onEndEditing={!formik.isSubmitting && formik.handleSubmit}
          accessoryRight={sendIcon}
          onEndEditing={() => !formik.isSubmitting && formik.handleSubmit()}
        />
        {/* <IconButton
          icon={<Icon as={MaterialCommunityIcons} name="send" />}
          padding={0}
          style={styles.iconSend}
          onPress={!formik.isSubmitting && formik.handleSubmit}
        /> */}
      </Layout>
    </Layout>
  );
};

export const styles = StyleSheet.create({
  content: {
    position: 'absolute',
    width: '100%',
    left: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
    // backgroundColor: '#171717',
    borderTopWidth: 1,
    // borderTopColor: '#333',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
    position: 'relative',
  },
  input: {
    // backgroundColor: '#29292b',
    // color: '#fff',
    fontSize: 16,
    borderRadius: 50,
    // marginLeft: 15,
  },
  iconSend: {
    position: 'absolute',
    top: 0,
    right: 10,
    height: '100%',
  },
});
