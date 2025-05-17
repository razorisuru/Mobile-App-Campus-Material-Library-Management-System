import React, { useState } from "react";
import { 
  View, 
  SafeAreaView, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  Linking,
  Alert,
  ActivityIndicator,
  Share,
  ScrollView,
  Platform 
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { EXPO_BACKEND_URL } from "@env";

const BookDetailScreen = ({ route, navigation }) => {
  const { book } = route.params;
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadFile = async () => {
    setIsDownloading(true);
    try {
      const fileUrl = `${EXPO_BACKEND_URL}/storage/${book.file_path}`;
      const supported = await Linking.canOpenURL(fileUrl);
      
      if (supported) {
        await Linking.openURL(fileUrl);
      } else {
        Alert.alert("Error", "Cannot open this file type");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to download file");
    } finally {
      setIsDownloading(false);
    }
  };

  const shareBook = async () => {
    try {
      await Share.share({
        message: `Check out this book: ${book.title} by ${book.author} \n\n${book.description}\n\nDownload it here: ${EXPO_BACKEND_URL}/storage/${book.file_path}`,
        url: `${EXPO_BACKEND_URL}/storage/${book.file_path}`,
        title: book.title,
      });
    } catch (error) {
      Alert.alert("Error", "Failed to share book");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButtonContainer} 
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#5D4FE8" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={shareBook} style={styles.shareButton}>
          <MaterialIcons name="share" size={24} color="#5D4FE8" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: `${EXPO_BACKEND_URL}/storage/${book.cover_image}` }}
            style={styles.coverImage}
          />
        </View>

        <View style={styles.bookInfo}>
          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.author}>By {book.author}</Text>
          
          <View style={styles.metadata}>
            {book.genre && (
              <View style={styles.metadataItem}>
                <MaterialIcons name="category" size={20} color="#666" />
                <Text style={styles.metadataText}>{book.genre}</Text>
              </View>
            )}
            {book.published_date && (
              <View style={styles.metadataItem}>
                <MaterialIcons name="date-range" size={20} color="#666" />
                <Text style={styles.metadataText}>{book.published_date}</Text>
              </View>
            )}
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitle}>About this book</Text>
            <Text style={styles.description}>{book.description}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.downloadButton, isDownloading && styles.downloadingButton]}
          onPress={downloadFile}
          disabled={isDownloading}
        >
          {isDownloading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <MaterialIcons name="file-download" size={24} color="#FFFFFF" />
              <Text style={styles.downloadButtonText}>Download PDF</Text>
            </>
          )}
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
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  backButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButtonText: {
    fontSize: 16,
    color: "#5D4FE8",
    marginLeft: 4,
  },
  shareButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    backgroundColor: "#F5F5F5",
    padding: 20,
    alignItems: "center",
  },
  coverImage: {
    width: 200,
    height: 300,
    resizeMode: "contain",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bookInfo: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 8,
  },
  author: {
    fontSize: 18,
    color: "#666666",
    marginBottom: 16,
  },
  metadata: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  metadataItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
    marginBottom: 8,
  },
  metadataText: {
    marginLeft: 4,
    color: "#666666",
  },
  descriptionContainer: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333333",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#666666",
  },
  bottomContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    backgroundColor: "#FFFFFF",
  },
  downloadButton: {
    backgroundColor: "#5D4FE8",
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  downloadingButton: {
    backgroundColor: "#8B83E3",
  },
  downloadButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});

export default BookDetailScreen;