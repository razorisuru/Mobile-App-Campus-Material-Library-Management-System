import React from "react";
import { FlatList, TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";

const BookList = ({ data }) => {
  const renderBookItem = ({ item }) => (
    <TouchableOpacity style={styles.bookItem}>
      <View style={styles.bookImageContainer}>
        <View style={styles.imagePlaceholder}>
          <Image source={require("../../assets/placeholder.jpg")} style={styles.placeholderImage} />
        </View>
      </View>
      <View style={styles.bookInfo}>
        <Text style={styles.bookCategory}>{item.category}</Text>
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
      keyExtractor={(item) => item.id}
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
    alignItems: "center",
  },
  bookImageContainer: {
    width: 80,
    height: 80,
    backgroundColor: "#E5E5E5",
    borderRadius: 8,
    marginRight: 15,
  },
  imagePlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderImage: {
    width: 40,
    height: 40,
    tintColor: "#AAAAAA",
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