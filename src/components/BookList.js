import React from "react";
import { FlatList, TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { EXPO_BACKEND_URL } from "@env";

const BookList = ({ data }) => {
  const navigation = useNavigation();

  const renderBookItem = ({ item }) => (
    <TouchableOpacity
      style={styles.bookItem}
      onPress={() => navigation.navigate("BookDetail", { book: item })}
    >
      <View style={styles.bookImageContainer}>
        <View style={styles.imagePlaceholder}>
          <Image
            // source={{ uri: `http://192.168.8.114:8000/storage/${item.cover_image}` }} //Lap
            source={{ uri: `${EXPO_BACKEND_URL}/storage/${item.cover_image}` }} //PC
            style={styles.placeholderImage}
          />
        </View>
      </View>
      <View style={styles.bookInfo}>
        <Text style={styles.bookCategory}>
          {item.categories.map((category) => category.name).join(", ")}
        </Text>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <Text style={styles.bookAuthor}>{item.author}</Text>
      </View>
      <TouchableOpacity style={styles.arrowButton}>
        <Text style={styles.arrowText}>›</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderBookItem}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      style={styles.booksList}
    />
  );
};

const styles = StyleSheet.create({
  booksList: {
    padding: 15,
  },
  bookItem: {
    flexDirection: "row",
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  bookImageContainer: {
    width: 100,
    height: 140,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 15,
  },
  imagePlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bookInfo: {
    flex: 1,
  },
  bookCategory: {
    color: "#888888",
    fontSize: 14,
    marginBottom: 4,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  bookAuthor: {
    color: "#555555",
    fontSize: 14,
  },
  arrowButton: {
    padding: 10,
  },
  arrowText: {
    fontSize: 24,
    color: "#333333",
  },
});

export default BookList;