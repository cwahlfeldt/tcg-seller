import { useState } from 'react';
import { Button, Image, View, StyleSheet } from 'react-native';
import * as Picker from 'expo-image-picker';
import { ThemedText } from './ThemedText';
import ThemedButton from './ThemedButton';
import { chatWithGPT } from '@/services/chatGpt';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';

export default function ImagePicker() {
  const [image, setImage] = useState<string | null>(null);
  const [permission, requestPermission] = Picker.useCameraPermissions();

    if (!permission) {
      return <View />;
    }
  
    if (!permission.granted) {
      return (
        <View>
          <ThemedText>No access to camera</ThemedText>
          <Button title="Request" onPress={requestPermission} />
        </View>
      );
    }

  const pickImage = async () => {

    // const chat = await chatWithGPT('hi');
    // console.log(chat);

    let result = await Picker.launchCameraAsync({
      mediaTypes: Picker.MediaTypeOptions.All,
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    if (!result.canceled) {
      const image = result.assets[0];
      // const text = await extractTextFromImage(result.assets[0].uri);
      // console.log(text);
      const compressedImage = await ImageManipulator.manipulateAsync(
        image.uri,
        [{ resize: { width: image.width * 0.1, height: image.height * 0.1 } }],
        { compress: 0.001, format: ImageManipulator.SaveFormat.JPEG }
      );
      console.log(compressedImage);
      const imageURIBase64 = await encodeImageToBase64(compressedImage.uri);
      const chat = await chatWithGPT(`What is this an image https://images.pokemontcg.io/sm12/1_hires.png`);
      console.log(chat.choices[0].message.content);
      setImage(compressedImage.uri);
    }
  };

  return (
    <View style={styles.container}>
      <ThemedButton title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
}


/**
 * Encode an image at the given URI to a base64 string.
 * @param {string} uri - The URI of the image to encode.
 * @returns {Promise<string>} - A promise that resolves to the base64 encoded string.
 */
const encodeImageToBase64 = async (uri: string): Promise<string> => {
  try {
    const base64String = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return base64String;
  } catch (error) {
    console.error('Error encoding image to base64:', error);
    throw error;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});
