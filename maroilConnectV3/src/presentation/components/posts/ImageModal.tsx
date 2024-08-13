import {Button, Layout, useTheme} from '@ui-kitten/components';
import {Image, Modal, StyleSheet} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {MyIcon} from '../iu/MyIcon';
import Video from 'react-native-video';
import FastImage from 'react-native-fast-image';
import {useState} from 'react';

interface Props {
  images: {url: string}[];
  viewportWidth: number;
  activeSlide: number;
  visible: boolean;
  onClose: () => void;
  initialSlideIndex: number;
  onSlideChange: (index: number) => void;
}

const ImageModal = ({
  activeSlide,
  images,
  viewportWidth,
  visible,
  onClose,
  initialSlideIndex,
  onSlideChange,
}: Props) => {
  const theme = useTheme();

  const pagination = () => {
    return (
      <Layout
        style={{
          position: 'absolute',
          bottom: 20,
          zIndex: 10300,
          // bottom: 100,
          // left: viewportWidth * 0.25,
          alignSelf: 'center',
          backgroundColor: 'transparent',
        }}>
        <Pagination
          dotsLength={images?.length || 0}
          activeDotIndex={activeSlide}
          containerStyle={{backgroundColor: 'transparent'}}
          dotStyle={{
            width: 5,
            height: 5,
            borderRadius: 5,
            marginHorizontal: 1,
            backgroundColor: 'white',
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </Layout>
    );
  };
  const renderItem = ({item, index}: {item: {url: string}; index: number}) => {
    const isVideo = /\.(mp4|avi|mov)/i.test(item.url.toString());
    const isImage = /\.(jpg|png|jpeg|gif)/i.test(item.url);

    return (
      <Layout
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent',
        }}>
        {isVideo && (
          <Video
            source={{uri: item.url.toString()}}
            style={styles.mediaImage}
            resizeMode="cover"
            controls={true}
          />
        )}
        {isImage && (
          <FastImage
            style={{width: '100%', height: '100%'}}
            source={{
              uri: item.url,
              headers: {Authorization: 'someAuthToken'},
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        )}
        {/* <Image
          source={{uri: item.url}}
          style={{width: '100%', height: '100%'}}
          resizeMode="contain"
        /> */}
      </Layout>
    );
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <Layout
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.9)',
        }}>
        <Button
          size="tiny"
          onPress={onClose}
          style={{
            position: 'absolute',
            top: 50,
            right: 20,
            zIndex: 1000,
            backgroundColor: 'rgba(0,0,0,0.5)',
            borderRadius: 50,
            borderColor: 'rgba(0,0,0,0.5)',
          }}>
          <MyIcon name="close" white />
        </Button>

        <Carousel
          data={images}
          renderItem={renderItem} // Call the renderItem function directly
          sliderWidth={viewportWidth}
          itemWidth={viewportWidth}
          firstItem={initialSlideIndex}
          onSnapToItem={onSlideChange}
        />
        {pagination()}
      </Layout>
    </Modal>
  );
};

export default ImageModal;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    paddingTop: 0,
  },
  submitButton: {
    // marginTop: 20,
    minWidth: 70,
  },
  mediaItem: {
    flex: 1,
    margin: 5,
    position: 'relative', // Esto permite posicionar el botón de eliminación en la esquina superior derecha
  },
  mediaImage: {
    width: '50%',
    height: 333, // Ajusta este valor para cambiar la altura de las imágenes
  },
  deleteButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'red',
  },
});
