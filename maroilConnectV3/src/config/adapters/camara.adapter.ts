import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Video} from 'react-native-compressor';
import Toast from 'react-native-toast-message';

export class CameraAdapter {
  static async takePicture(): Promise<string[]> {
    const response = await launchCamera({
      mediaType: 'photo',
      quality: 0.7,
      cameraType: 'back',
      saveToPhotos: true,
    });

    if (response.assets && response.assets[0].uri) {
      return [response.assets[0].uri];
    }

    return [];
  }
  static async getPicturesFromLibrary(): Promise<string[]> {
    const response = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.7,
      selectionLimit: 10,
    });
    if (response.assets && response.assets.length > 0) {
      return response.assets.map(asset => asset.uri!);
    }

    return [];
  }
  static async takeVideo(): Promise<string[]> {
    const response = await launchCamera({
      mediaType: 'video',
      // videoQuality: 'low', // puedes ajustar la calidad del video aquí
      cameraType: 'back',
      saveToPhotos: true,
    });

    if (response.assets && response.assets[0].uri) {
      const result = await Video.compress(
        response.assets[0].uri,
        {
          progressDivider: 10,
          downloadProgress: progress => {
            // console.log('downloadProgress: ', progress);
            Toast.show({
              type: 'info',
              text1: 'Compressing video...',
              text2: `Progress: ${progress}%`,
            });
          },
        },
        // progress => {
        //   // console.log('Compression Progress: ', progress);
        // },
      );
      return [result];
    }

    return [];
  }

  static async getVideosFromLibrary(): Promise<string[]> {
    const response = await launchImageLibrary({
      mediaType: 'video',
      videoQuality: 'high', // puedes ajustar la calidad del video aquí
      selectionLimit: 1,
    });

    if (response.assets && response.assets.length > 0) {
      const compressedUris = await Promise.all(
        response.assets.map(async asset => {
          const result = await Video.compress(
            asset.uri!,
            {
              minimumFileSizeForCompress: 16,

              progressDivider: 10,

              // downloadProgress: progress => {
              //   console.log('downloadProgress: ', progress);
              // },
            },
            progress => {
              progress = parseFloat(progress.toFixed(2));

              Toast.show({
                type: 'info',
                text1: 'Compressing video...',
                text2: `Progress: ${progress * 100}%`,
              });
            },
          );

          return result;
        }),
      );

      return compressedUris;
    }

    return [];
  }
}
