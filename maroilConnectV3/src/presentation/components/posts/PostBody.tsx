import {Layout, useTheme} from '@ui-kitten/components';
import {useWindowDimensions} from 'react-native';
import {Post} from '../../../domain/entities/post';
import {useState} from 'react';
import {ImageCarousel} from './ImageCarousel';
import ImageModal from './ImageModal';
import {Pagination} from 'react-native-snap-carousel';
import {UseMutationResult} from '@tanstack/react-query';

interface Props {
  post: Post;
  mutationView: UseMutationResult<Post, Error, Post, unknown>;
  isViewable: boolean;
}

export const PostBody = ({post, mutationView, isViewable}: Props) => {
  const {width: viewportWidth} = useWindowDimensions();
  const theme = useTheme();

  const [activeSlide, setActiveSlide] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedImages, setSelectedImages] = useState(null);

  const handleImagePress = (images, index) => {
    setSelectedImages(images);
    setSelectedImageIndex(index);
    setModalVisible(true);
    mutationView.mutate(post);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };
  const pagination = () => {
    return (
      <Layout
        style={{
          position: 'absolute',
          top: 435,
          zIndex: 10300,
          // bottom: 100,
          // left: viewportWidth * 0.25,
          alignSelf: 'center',
          backgroundColor: 'transparent',
        }}>
        <Pagination
          dotsLength={post.mediaPost?.length || 0}
          activeDotIndex={activeSlide}
          containerStyle={{backgroundColor: 'transparent'}}
          dotStyle={{
            width: 5,
            height: 5,
            borderRadius: 5,
            marginHorizontal: 1,
            backgroundColor: theme['background-alternative-color-4'],
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </Layout>
    );
  };
  return (
    <>
      <Layout>
        <ImageCarousel
          images={post.mediaPost}
          viewportWidth={viewportWidth}
          onImagePress={handleImagePress}
          onSlideChange={setActiveSlide}
          activeSlide={activeSlide}
          isViewable={isViewable}
        />
        <ImageModal
          images={selectedImages}
          viewportWidth={viewportWidth}
          visible={modalVisible}
          onClose={handleModalClose}
          initialSlideIndex={selectedImageIndex}
          onSlideChange={setActiveSlide}
          activeSlide={activeSlide}
        />
      </Layout>
      {pagination()}
    </>
  );
};
