import React from "react";
import { View, SafeAreaView, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
// import RNFS from 'react-native-fs';

const BookDetailScreen = ({ route, navigation }) => {
  const { book } = route.params;

  const downloadFile = async () => {
    // const fileUrl = `http://192.168.8.114:8000/storage/${book.file_path}`; //Lap
    const fileUrl = `http://192.168.8.125:8000/storage/${book.file_path}`; //PC
    const downloadDest = `${RNFS.DocumentDirectoryPath}/${book.title}.pdf`;

    try {
      const downloadResult = await RNFS.downloadFile({
        fromUrl: fileUrl,
        toFile: downloadDest,
      }).promise;

      if (downloadResult.statusCode === 200) {
        Alert.alert('Download Complete', `File saved to: ${downloadDest}`);
      } else {
        Alert.alert('Download Failed', 'Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while downloading the file.');
      console.error('Download Error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>‹ Back</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Image
          // source={{ uri: `http://192.168.8.114:8000/storage/${book.cover_image}` }} //Lap
          source={{ uri: `http://192.168.8.125:8000/storage/${book.cover_image}` }} //PC
          style={styles.coverImage}
        />
        <Text style={styles.title}>{book.title}</Text>
        {/* <Text style={styles.title}>{book.file_path}</Text> */}
        <Text style={styles.author}>{book.author}</Text>
        <Text style={styles.description}>{book.description}</Text>
        <TouchableOpacity
          style={styles.downloadButton}
          onPress={() => {
            downloadFile();
          }}
        >
          <Text style={styles.downloadButtonText}>Download</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    fontSize: 18,
    color: "#5D4FE8",
  },
  content: {
    padding: 15,
  },
  coverImage: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  author: {
    fontSize: 18,
    color: "#555555",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#333333",
    marginBottom: 20,
  },
  downloadButton: {
    backgroundColor: "#5D4FE8",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  downloadButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default BookDetailScreen;