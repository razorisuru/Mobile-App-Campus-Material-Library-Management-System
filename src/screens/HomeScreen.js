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
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import axios from "../utils/axios"; // Import the custom Axios instance

import AuthContext from "../contexts/AuthContext";
import { logout } from "../services/AuthService";
import PdfList from "../components/PdfList";
import CategoryList from "../components/CategoryList";
import BookList from "../components/BookList";

// Mock data for the application
let categories = [{ id: "0", name: "All" }];

const HomeScreen = ({navigation}) => {
  const { user, setUser } = useContext(AuthContext);

  async function handleLogout() {
    await logout();
    setUser(null);
  }

  const [activeTab, setActiveTab] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [pdfData, setPdfData] = useState([]);
  const [booksData, setBooksData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("title"); // 'title', 'author', 'date'

  const onRefresh = React.useCallback(() => {
    setIsRefreshing(true);
    fetchAllData();
  }, []);

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

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      await Promise.all([fetchPdfData(), fetchBooksData(), fetchCategories()]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Filter and sort books based on selected category and search query
  const filteredAndSortedBooks = booksData
    .filter((book) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        (selectedCategory === "All" ||
          book.categories.some((category) => category.name === selectedCategory)) &&
        (book.title.toLowerCase().includes(searchLower) ||
          book.author.toLowerCase().includes(searchLower))
      );
    })
    .sort((a, b) => {
      if (sortBy === "title") return a.title.localeCompare(b.title);
      if (sortBy === "author") return a.author.localeCompare(b.author);
      if (sortBy === "date") return new Date(b.created_at) - new Date(a.created_at);
      return 0;
    });

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
          <BookList data={filteredAndSortedBooks} />
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

  const SearchHeader = () => (
    <View style={styles.header}>
      <View style={styles.searchContainer}>
        <TouchableOpacity>
          <Text style={styles.searchIcon}>🔍</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Search books..."
          placeholderTextColor="#A79FC9"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <View style={styles.filterContainer}>
        <TouchableOpacity 
          style={[styles.filterButton, sortBy === 'title' && styles.activeFilter]}
          onPress={() => setSortBy('title')}
        >
          <Text style={styles.filterText}>Title</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, sortBy === 'author' && styles.activeFilter]}
          onPress={() => setSortBy('author')}
        >
          <Text style={styles.filterText}>Author</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, sortBy === 'date' && styles.activeFilter]}
          onPress={() => setSortBy('date')}
        >
          <Text style={styles.filterText}>Latest</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleNavigateToPdf = () => {
    navigation.navigate('Pdf');
  };

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
            value={searchQuery}
            onChangeText={setSearchQuery}
          /> 
        </View>
      </View>

      {/* Main content */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={["#5D4FE8"]}
          />
        }
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator size="large" color="#5D4FE8" style={{ marginTop: 20 }} />
          ) : (
            <Text style={styles.emptyText}>No items found</Text>
          )
        }
      />

      {/* Bottom navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={handleNavigateToPdf}
        >
          <Text style={styles.navIcon}>📖</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setActiveTab(1)}
        >
          <Text style={styles.navIcon}>☰</Text>
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
  emptyText: {
    textAlign: "center",
    color: "#666",
    marginTop: 20,
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
    backgroundColor: '#4F43C2',
  },
  activeFilter: {
    backgroundColor: '#7A6FF0',
  },
  filterText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});

export default HomeScreen;
