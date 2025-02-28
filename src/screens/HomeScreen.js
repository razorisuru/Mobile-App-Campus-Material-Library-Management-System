import React, { useState,useContext } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
  FlatList,
  StatusBar,
} from "react-native";

import AuthContext from "../contexts/AuthContext";
import { logout } from "../services/AuthService";

// Mock data for the application
const pdfData = [
  { id: "1", title: "BSc", image: require("../../assets/placeholder.jpg") },
  { id: "2", title: "BTech", image: require("../../assets/placeholder.jpg") },
  { id: "3", title: "BAG", image: require("../../assets/placeholder.jpg") },
  { id: "4", title: "MBA", image: require("../../assets/placeholder.jpg") },
  { id: "5", title: "MCA", image: require("../../assets/placeholder.jpg") },
];

const categories = [
  { id: "1", name: "Fiction" },
  { id: "2", name: "Non-Fiction" },
  { id: "3", name: "Education" },
  { id: "4", name: "Business" },
  { id: "5", name: "Science" },
  { id: "6", name: "Technology" },
];

const booksData = [
  { id: "1", title: "Non-Fiction", author: "Author", category: "Non-Fiction" },
  { id: "2", title: "Non-Fiction", author: "Author", category: "Non-Fiction" },
  { id: "3", title: "Non-Fiction", author: "Author", category: "Non-Fiction" },
  { id: "4", title: "Non-Fiction", author: "Author", category: "Non-Fiction" },
  {
    id: "5",
    title: "The Great Novel",
    author: "Jane Doe",
    category: "Fiction",
  },
  { id: "6", title: "Learn Math", author: "Prof Smith", category: "Education" },
  {
    id: "7",
    title: "Business Tactics",
    author: "CEO Jones",
    category: "Business",
  },
];

const ReadingApp = () => {
  const { user, setUser } = useContext(AuthContext);

  async function handleLogout() {
    await logout();
    setUser(null);
  }
  const [activeTab, setActiveTab] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("Non-Fiction");

  const renderPdfItem = ({ item }) => (
    <TouchableOpacity style={styles.pdfCard}>
      <View style={styles.pdfImageContainer}>
        <View style={styles.imagePlaceholder}>
          <Image
            source={require("../../assets/placeholder.jpg")}
            style={styles.placeholderImage}
          />
        </View>
      </View>
      <Text style={styles.pdfTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === item.name && styles.selectedCategoryButton,
      ]}
      onPress={() => setSelectedCategory(item.name)}
    >
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item.name && styles.selectedCategoryText,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderBookItem = ({ item }) => (
    <TouchableOpacity style={styles.bookItem}>
      <View style={styles.bookImageContainer}>
        <View style={styles.imagePlaceholder}>
          <Image
            source={require("../../assets/placeholder.jpg")}
            style={styles.placeholderImage}
          />
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

  // Filter books based on selected category
  const filteredBooks = booksData.filter(
    (book) => selectedCategory === "All" || book.category === selectedCategory
  );

  const screenContent =
    activeTab === 0 ? (
      <>
        <Text style={styles.sectionTitle}>Latest PDF</Text>
        <FlatList
          data={pdfData}
          renderItem={renderPdfItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.pdfList}
        />
      </>
    ) : null;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header with search */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <TouchableOpacity>
            <Text style={styles.searchIcon}>🔍</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#A79FC9"
          />
        </View>
      </View>

      {/* Main content */}
      <View style={styles.content}>
        {screenContent}

        {/* Categories */}
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryList}
        />

        {/* White background card for books list */}
        <View style={styles.booksContainer}>
          <FlatList
            data={filteredBooks}
            renderItem={renderBookItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            style={styles.booksList}
          />
        </View>
      </View>

      {/* Bottom navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setActiveTab(0)}
        >
          <Text style={styles.navIcon}>☰</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setActiveTab(1)}
        >
          <Text style={styles.navIcon}>📖</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          // onPress={() => setActiveTab(2)}
          onPress={handleLogout}
        >
          <Text style={styles.navIcon}>👤</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5D4FE8",
  },
  header: {
    padding: 15,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4F43C2",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  searchIcon: {
    marginRight: 10,
    fontSize: 16,
    color: "#A79FC9",
  },
  searchInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  pdfList: {
    marginBottom: 15,
  },
  pdfCard: {
    marginLeft: 15,
    marginRight: 5,
    width: 125,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
  },
  pdfImageContainer: {
    height: 100,
    backgroundColor: "#E5E5E5",
  },
  pdfTitle: {
    padding: 10,
    fontSize: 14,
    fontWeight: "500",
  },
  categoryList: {
    marginBottom: 15,
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginLeft: 15,
  },
  selectedCategoryButton: {
    borderBottomWidth: 2,
    borderBottomColor: "#FFFFFF",
  },
  categoryText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 16,
  },
  selectedCategoryText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  booksContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
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
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    paddingVertical: 10,
  },
  navButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  navIcon: {
    fontSize: 24,
  },
});

export default ReadingApp;
