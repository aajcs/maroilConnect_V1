import {Layout, Text} from '@ui-kitten/components';
import {useRef} from 'react';

import {chatMenssage} from '../../../domain/entities/chatMenssage';
import {ScrollView} from 'react-native-gesture-handler';
import {ChatMessageCard} from './ChatMessageCard';

interface Props {
  chatMenssages: chatMenssage[];
}

export const ChatMessageList = ({chatMenssages}: Props) => {
  const {chatsMessages: chatMenssagesMAP} = chatMenssages;
  const scrollViewRef = useRef<ScrollView>(null);

  return (
    <ScrollView
      alwaysBounceVertical={false}
      showsVerticalScrollIndicator={false}
      ref={scrollViewRef}
      onContentSizeChange={() =>
        scrollViewRef.current?.scrollToEnd({animated: false})
      }>
      <Layout style={{flex: 1}}>
        {(chatMenssagesMAP &&
          chatMenssagesMAP.map(chatMenssageData => (
            <ChatMessageCard
              key={chatMenssageData.id}
              chatMenssage={chatMenssageData}
            />
          ))) || <Text>No hay mensajes</Text>}
      </Layout>
    </ScrollView>
  );
};
