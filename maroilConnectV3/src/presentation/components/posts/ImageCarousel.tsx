import {Layout, Button} from '@ui-kitten/components';
import {Image, Platform, StyleSheet} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Video from 'react-native-video';
import FastImage from 'react-native-fast-image';
import VideoPlayer from 'react-native-media-console';
import {useEffect, useRef, useState} from 'react';
import {MyIcon} from '../iu/MyIcon';

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
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [imageSizes, setImageSizes] = useState<{
    [url: string]: {width: number; height: number};
  }>({});

  useEffect(() => {
    images.forEach(image => {
      Image.getSize(image.url, (width, height) => {
        setImageSizes(prevSizes => ({
          ...prevSizes,
          [image.url]: {width, height},
        }));
      });
    });
  }, [images]);

  const handleMute = () => {
    setMuted(!muted);
  };
  const MuteIcon = (props: any) => (
    <MyIcon
      {...props}
      name={muted ? 'volume-off-outline' : 'volume-up-outline'}
    />
  );
  const renderItem = ({item, index}: {item: {url: string}; index: number}) => {
    const isVideo = /\.(mp4|avi|mov)/i.test(item.url.toString());
    const isImage = /\.(jpg|png|jpeg|gif)/i.test(item.url);
    const imageSize = imageSizes[item.url] || {width: 0, height: 0};
    const aspectRatio = imageSize.width / imageSize.height;
    const containerHeight = aspectRatio > 1 ? 400 : 600;

    return (
      <Layout style={{flex: 1}}>
        {isVideo && (
          <>
            <Video
              ref={videoRef}
              source={{uri: item.url.toString()}}
              style={styles.mediaImage}
              resizeMode="none"
              controls={true}
              fullscreenAutorotate={true}
              paused={!isViewable}
              muted={muted}
              repeat={true}
            />
            {Platform.OS === 'android' && (
              <Button
                appearance="ghost"
                onPress={handleMute}
                style={styles.muteButton}
                accessoryLeft={MuteIcon}
              />
            )}
          </>
        )}
        {isImage && (
          <TouchableWithoutFeedback onPress={() => onImagePress(images, index)}>
            {/* <FastImage
              style={{width: '100%', height: 400}}
              source={{
                uri: item.url,
                headers: {Authorization: 'someAuthToken'},
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            /> */}
            <FastImage
              style={{
                width: '100%',
                height: images.length > 1 ? 400 : containerHeight,
              }}
              source={{
                uri: item.url,
                headers: {Authorization: 'someAuthToken'},
                priority: FastImage.priority.normal,
              }}
              // resizeMode={FastImage.resizeMode.none}
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
        vertical={false} // Add this line
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
  muteButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});
