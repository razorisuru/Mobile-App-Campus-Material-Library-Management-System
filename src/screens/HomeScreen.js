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
let categories = [{ id: "0", name: "All" }];

const HomeScreen = () => {
  const { user, setUser } = useContext(AuthContext);
//   const BACKEND_URL = process.env.BACKEND_URL;
// console.log("Backend URL:", BACKEND_URL); // Log the backend URL for debugging


  async function handleLogout() {
    await logout();
    setUser(null);
  }

  const [activeTab, setActiveTab] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [pdfData, setPdfData] = useState([]);
  const [booksData, setBooksData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchPdfData = async () => {
      try {
        const response = await axios.get("/pdf/category");
        setPdfData(response.data);
      } catch (error) {
        console.error("Error fetching PDF data:", error);
      }
    };

    const fetchBooksData = async () => {
      try {
        const response = await axios.get("/ebooks");
        setBooksData(response.data);
      } catch (error) {
        console.error("Error fetching books data:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get("/ebook/category");
        setCategories([{ id: "0", name: "All" }, ...response.data]);
      } catch (error) {
        console.error("Error fetching ebook category data:", error);
      }
    };

    fetchPdfData();
    fetchBooksData();
    fetchCategories();
  }, []);

  // Filter books based on selected category
  const filteredBooks = booksData.filter(
    (book) =>
      selectedCategory === "All" ||
      book.categories.some((category) => category.name === selectedCategory)
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

        <TouchableOpacity style={styles.navButton} onPress={handleLogout}>
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
