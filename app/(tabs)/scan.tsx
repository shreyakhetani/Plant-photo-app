import React, { useState, useRef , useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { addPlant } from '@/redux/plantsSlice';

export default function ScanView() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [photoUri, setPhotoUri] = useState<string | undefined>(undefined);
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [key, setKey] = useState(0);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setKey(prevKey => prevKey + 1);
    });
    return unsubscribe;
  }, [navigation]);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionMessage}>We need your permission to show the camera</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={() => requestPermission()}>
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  };

  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        setPhotoUri(photo?.uri);
      } catch (error) {
        console.error('Error taking photo:', error);
      }
    }
  };

  const handleSave = () => {
    if (!name.trim()) {
      alert("Please enter a Plant Name.");
      return;
    }
  
    if (!photoUri) {
      alert("Please take a photo of the plant.");
      return;
    }

    const newPlant: Plant = {
      id: new Date().toISOString(),
      name,
      notes,
      dateAdded: new Date().toLocaleDateString(),
      photoUri: photoUri,
    };
    dispatch(addPlant(newPlant));
    navigation.reset({
      index: 0,
      routes: [{ name: 'index' } as never],
    });
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {photoUri ? (
            <View style={styles.previewContainer}>
              <Image source={{ uri: photoUri }} style={styles.preview} />
              <TouchableOpacity style={styles.retakeButton} onPress={() => setPhotoUri(undefined)}>
                <Text style={styles.retakeButtonText}>Retake Photo</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.cameraButton} onPress={toggleCameraFacing}>
                  <Text style={styles.buttonText}>Flip</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.captureButton} onPress={takePhoto}>
                  <View style={styles.captureInnerCircle} />
                </TouchableOpacity>
              </View>
            </CameraView>
          )}
  
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Plant Name"
              placeholderTextColor="#888"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Notes (Optional)"
              placeholderTextColor="#888"
              value={notes}
              onChangeText={setNotes}
            />
          </View>
        </ScrollView>
  
        <View style={styles.saveButtonWrapper}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Plant</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },

  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 100,
  },

  camera: {
    height: 450,
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10,
  },

  cameraButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 6,
    elevation: 5,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },

  captureButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },

  captureInnerCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
  },

  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  previewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },

  preview: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 16,
  },

  retakeButton: {
    backgroundColor: '#FF5252',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginTop: 10,
  },

  retakeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  formContainer: {
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginBottom: 10,
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: 'white',
  },

  saveButtonWrapper: {
    position: 'absolute',
    bottom: 70,
    left: 20,
    right: 20,
  },

  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 5,
  },

  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  
  permissionMessage: {
    fontSize: 18,
    textAlign: 'center',
    color: '#f8f8f8',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  
  permissionButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 3, 
  },
  
  permissionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

