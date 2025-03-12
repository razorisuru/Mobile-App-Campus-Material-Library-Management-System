import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from "react-native";
import axios from "../utils/axios"; // Import the custom Axios instance

import AuthContext from "../contexts/AuthContext";
import { logout } from "../services/AuthService";
import PdfList from "../components/PdfList";
import CategoryList from "../components/CategoryList";
import BookList from "../components/BookList";

// Mock data for the application
const categories = [
  { id: "0", name: "All" },
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
  { id: "9", title: "Non-Fiction", author: "Author", category: "Non-Fiction" },
  { id: "8", title: "Non-Fiction", author: "Author", category: "Non-Fiction" },
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

const HomeScreen = () => {
  const { user, setUser } = useContext(AuthContext);

  async function handleLogout() {
    await logout();
    setUser(null);
  }

  const [activeTab, setActiveTab] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [pdfData, setPdfData] = useState([]);

  useEffect(() => {
    const fetchPdfData = async () => {
      try {
        const response = await axios.get("/pdf/category");
        setPdfData(response.data);
      } catch (error) {
        console.error("Error fetching PDF data:", error);
      }
    };

    fetchPdfData();
  }, []);

  // Filter books based on selected category
  const filteredBooks = booksData.filter(
    (book) => selectedCategory === "All" || book.category === selectedCategory
  );

  const screenContent =
    activeTab === 0 ? (
      <>
        <Text style={styles.sectionTitle}>Latest PDF</Text>
        <PdfList data={pdfData} />
      </>
    ) : null;

  const renderItem = ({ item }) => {
    if (item.type === "pdfList") {
      return (
        <>
          <Text style={styles.sectionTitle}>Latest PDF</Text>
          <PdfList data={pdfData} />
        </>
      );
    } else if (item.type === "categoryList") {
      return (
        <CategoryList
          data={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      );
    } else if (item.type === "bookList") {
      return (
        <View style={styles.booksContainer}>
          <BookList data={filteredBooks} />
        </View>
      );
    }
    return null;
  };

  const data = [
    { type: "pdfList" },
    { type: "categoryList" },
    { type: "bookList" },
  ];

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
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.content}
      />

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
  booksContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
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

export default HomeScreen;
