import React from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {CardNotificaciones} from '../components/CardNotificaciones';
import {postData} from '../data/postData';

export const NotificacionesScreen = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <View>
        {postData.map((post, index) => {
          return <CardNotificaciones key={index} post={post} />;
        })}
      </View>
    </ScrollView>
  );
};
