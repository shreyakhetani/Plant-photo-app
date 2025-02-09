import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useColorScheme, SafeAreaView, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

interface Plant {
  id: string;
  name: string;
  notes: string;
  dateAdded: string;
  photoUri: string;
}

export default function ListScreen() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const route = useRoute();
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (route?.params?.plant) {
        const newPlant = route.params.plant;
        setPlants((prevPlants) => [...prevPlants, newPlant]);
        console.log('New plant received:', newPlant);
      }
    });

    return unsubscribe;
  }, [navigation, route?.params?.plant]);

  const themeStyles = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <SafeAreaView style={[styles.safeContainer, themeStyles.container]}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* "Add New Plant" button fixed at the top */}
        <View style={styles.fixedButtonContainerTop}>
          <TouchableOpacity
            style={[styles.addButton, themeStyles.addButton]}
            onPress={() => navigation.navigate('scan')}
          >
            <Text style={[styles.addButtonText, themeStyles.addButtonText]}>+ Add New Plant</Text>
          </TouchableOpacity>
        </View>

        {/* "Plant List" header with top margin */}
        <Text style={[styles.header, themeStyles.text, styles.headerMargin]}>
          Plant List
        </Text>

        {/* New ScrollView style */}
        <ScrollView contentContainerStyle={[styles.scrollViewContent]}>
          {plants.length > 0 ? (
            plants.map((plant) => (
              <View key={plant.id} style={[styles.plantItem, themeStyles.plantItem]}>
                <View style={styles.plantDetails}>
                  {/* Left side: Name, Notes, and Date */}
                  <View style={styles.textContainer}>
                    <Text style={[styles.plantName, themeStyles.text]}>{plant.name}</Text>
                    <Text style={[styles.plantNotes, themeStyles.text]}>{plant.notes}</Text>
                    <Text style={[styles.plantDate, themeStyles.text]}>{plant.dateAdded}</Text>
                  </View>
                  
                  {/* Right side: Image */}
                  <Image source={{ uri: plant.photoUri }} style={styles.image} />
                </View>
              </View>
            ))
          ) : (
            <Text style={[styles.noPlantsText, themeStyles.text]}>No plants found. Add some plants!</Text>
          )}
        </ScrollView>
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
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerMargin: {
    marginTop: 100, // Adds margin to move the header below the button
    marginBottom: 20, // Adds margin to move the header below the button
  },
  scrollViewContent: {
    paddingBottom: 80, // Ensure there's space at the bottom (if needed)
  },
  plantItem: {
    marginBottom: 16,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f9f9f9', // Light background for plant items
    elevation: 2, // Adds subtle shadow for depth
  },
  plantDetails: {
    flexDirection: 'row', // Layout as row
    justifyContent: 'space-between', // Space out the name and the image
    alignItems: 'center', // Vertically center the content
  },
  textContainer: {
    flex: 1, // Take up remaining space
    paddingRight: 10, // Space between text and image
  },
  plantName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  plantNotes: {
    fontSize: 18,
    color: '#555',
  },
  plantDate: {
    fontSize: 12,
    color: '#888',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  noPlantsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
  },
  fixedButtonContainerTop: {
    position: 'absolute',
    top: 20, // Fixed to the top
    left: 20,
    right: 20,
    alignItems: 'center',
    zIndex: 1,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    width: '100%',
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const darkTheme = StyleSheet.create({
  container: { backgroundColor: 'black' },
  text: { color: 'white' },
  plantItem: { backgroundColor: '#2A2A2A' },
  addButton: { backgroundColor: '#4CAF50' },
  addButtonText: { color: 'white' },
});

const lightTheme = StyleSheet.create({
  container: { backgroundColor: 'white' },
  text: { color: 'black' },
  plantItem: { backgroundColor: '#F0F0F0' },
  addButton: { backgroundColor: '#4CAF50' },
  addButtonText: { color: 'white' },
});
