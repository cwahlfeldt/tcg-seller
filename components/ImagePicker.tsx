import { useState } from 'react';
import { Button, Image, View, StyleSheet } from 'react-native';
import * as Picker from 'expo-image-picker';
import { ThemedText } from './ThemedText';
import ThemedButton from './ThemedButton';
import { chatWithGPT } from '@/services/chat-gpt';
import extractTextFromImage from '@/services/tesseract';

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

    const chat = await chatWithGPT('hi');
    // console.log(chat);

    let result = await Picker.launchCameraAsync({
      mediaTypes: Picker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    if (!result.canceled) {
      const text = await extractTextFromImage(result.assets[0].uri);
      console.log(text);
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <ThemedButton title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
}

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


