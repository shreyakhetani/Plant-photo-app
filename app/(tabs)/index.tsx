import { RootState } from '@/redux/store';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useColorScheme, SafeAreaView, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

export default function ListScreen() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const plants = useSelector((state: RootState) => state.plants.plants);
  const themeStyles = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <SafeAreaView style={[styles.safeContainer, themeStyles.container]}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.fixedButtonContainerTop}>
          <TouchableOpacity
            style={[styles.addButton, themeStyles.addButton]}
            onPress={() => navigation.navigate('scan' as never)}
          >
            <Text style={[styles.addButtonText, themeStyles.addButtonText]}>+ Add New Plant</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.header, themeStyles.text, styles.headerMargin]}>
          Plant List
        </Text>

        <ScrollView contentContainerStyle={[styles.scrollViewContent]}>
          {plants.length > 0 ? (
            plants.map((plant) => (
              <View key={plant.id} style={[styles.plantItem, themeStyles.plantItem]}>
                <View style={styles.plantDetails}>
                  <View style={styles.textContainer}>
                    <Text style={[styles.plantName, themeStyles.text]}>{plant.name}</Text>
                    <Text style={[styles.plantNotes, themeStyles.text]}>{plant.notes}</Text>
                    <Text style={[styles.plantDate, themeStyles.text]}>{plant.dateAdded}</Text>
                  </View>
                  
                  <Image source={{ uri: plant.photoUri }} style={styles.image} />
                </View>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => navigation.navigate('scan', { plant: plant })}
                >
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={[styles.noPlantsText, themeStyles.text]}>No plants found.</Text>
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
    marginTop: 100,
    marginBottom: 20,
  },
  scrollViewContent: {
    paddingBottom: 80,
  },
  plantItem: {
    marginBottom: 16,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    elevation: 2,
  },
  plantDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    paddingRight: 10,
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
    top: 20,
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
  editButton: {
    marginTop: 10,
    backgroundColor: '#FF9800',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 6,
    alignItems: 'center',
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
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
