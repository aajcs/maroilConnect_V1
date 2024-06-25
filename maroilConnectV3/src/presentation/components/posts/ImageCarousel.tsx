import {Layout, useTheme} from '@ui-kitten/components';
import {Image, StyleSheet} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Video from 'react-native-video';
import FastImage from 'react-native-fast-image';

interface Props {
  images: {url: string}[];
  viewportWidth: number;
  onImagePress: (images: {url: string}[], index: number) => void;
  onSlideChange: (index: number) => void;
  slideIndex: number;
  isViewable: boolean;
}

export const ImageCarousel = ({
  images,
  viewportWidth,
  onImagePress,
  onSlideChange,
  isViewable,
}: Props) => {
  const renderItem = ({item, index}: {item: {url: string}; index: number}) => {
    const isVideo = /\.(mp4|avi|mov)/i.test(item.url.toString());
    const isImage = /\.(jpg|png|jpeg|gif)/i.test(item.url);

    return (
      <Layout style={{flex: 1}}>
        {isVideo && (
          <Video
            source={{uri: item.url.toString()}}
            style={styles.mediaImage}
            resizeMode="cover"
            controls={true}
            paused={!isViewable}
            muted={true}
          />
        )}
        {isImage && (
          <TouchableWithoutFeedback onPress={() => onImagePress(images, index)}>
            <FastImage
              style={{width: '100%', height: 400}}
              source={{
                uri: item.url,
                headers: {Authorization: 'someAuthToken'},
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </TouchableWithoutFeedback>
        )}
        {/* <Video
            source={{uri: item.url.toString()}}
            style={styles.mediaImage}
            resizeMode="cover"
            controls={true}
          />
          <Image
            source={{uri: item.url}}
            style={{width: '100%', height: 400}}
          /> */}
      </Layout>
    );
  };

  return (
    <>
      <Carousel
        data={images}
        renderItem={renderItem}
        sliderWidth={viewportWidth - 20}
        itemWidth={viewportWidth - 20}
        onSnapToItem={onSlideChange}
      />
    </>
  );
};
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
    width: '100%',
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
