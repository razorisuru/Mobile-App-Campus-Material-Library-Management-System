import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Linking,
  Share,
  Alert,
} from "react-native";
import axios from "../utils/axios";
import BottomNav from "../components/BottomNav";

const EXPO_BACKEND_URL =
  process.env.EXPO_BACKEND_URL || "http://192.168.8.125:8000";

const PdfScreen = ({ navigation }) => {
  const [pdfData, setPdfData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("title"); // 'title', 'date', 'subject'
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [degrees, setDegrees] = useState([]);
  const [selectedDegree, setSelectedDegree] = useState("All");
  const [isDownloading, setIsDownloading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMorePages, setHasMorePages] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchPdfData = async (page = 1) => {
    try {
      const response = await axios.get(`/pdf?page=${page}&per_page=10`);
      if (page === 1) {
        setPdfData(response.data.data);
      } else {
        setPdfData((prev) => [...prev, ...response.data.data]);
      }
      setHasMorePages(response.data.current_page < response.data.last_page);
      setCurrentPage(response.data.current_page);
    } catch (error) {
      console.error("Error fetching PDF data:", error);
    }
  };

  const downloadFile = async (pdfPath) => {
    if (!pdfPath) {
      Alert.alert("Error", "Invalid file path");
      return;
    }

    setIsDownloading(true);
    try {
      const fileUrl = `${EXPO_BACKEND_URL}/storage/${pdfPath}`;
      const supported = await Linking.canOpenURL(fileUrl);

      if (supported) {
        await Linking.openURL(fileUrl);
      } else {
        Alert.alert("Error", "Cannot open this file type");
      }
    } catch (error) {
      console.error("Download error:", error);
      Alert.alert("Error", "Failed to download file");
    } finally {
      setIsDownloading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/pdf/category");
      setCategories([{ id: 0, name: "All" }, ...response.data]);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchDegrees = async () => {
    try {
      const response = await axios.get("/degree/category");
      setDegrees([{ id: 0, name: "All" }, ...response.data]);
    } catch (error) {
      console.error("Error fetching degrees:", error);
    }
  };

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      await Promise.all([fetchPdfData(), fetchCategories(), fetchDegrees()]);
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

  const onRefresh = () => {
    setIsRefreshing(true);
    fetchAllData();
  };

  const loadMoreItems = async () => {
    if (!hasMorePages || isLoadingMore) return;

    setIsLoadingMore(true);
    await fetchPdfData(currentPage + 1);
    setIsLoadingMore(false);
  };

  // Navigation handlers
  const handleNavigateToHome = () => {
    navigation.navigate("Home");
  };

  const handleNavigateToProfile = () => {
    navigation.navigate("Profile");
  };

  // Filter and sort PDFs
  const filteredAndSortedPdfs = pdfData
    .filter((pdf) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        pdf.title.toLowerCase().includes(searchLower) ||
        pdf.subjects.name.toLowerCase().includes(searchLower) ||
        pdf.category.name.toLowerCase().includes(searchLower);

      const matchesCategory =
        selectedCategory === "All" || pdf.category.name === selectedCategory;

      const matchesDegree =
        selectedDegree === "All" || pdf.degree.name === selectedDegree;

      return matchesSearch && matchesCategory && matchesDegree;
    })
    .sort((a, b) => {
      if (sortBy === "title") return a.title.localeCompare(b.title);
      if (sortBy === "date")
        return new Date(b.created_at) - new Date(a.created_at);
      if (sortBy === "subject")
        return a.subjects.name.localeCompare(b.subjects.name);
      return 0;
    });

  const renderPdfItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => downloadFile(item.file_path)}
      style={styles.pdfCard}
      disabled={isDownloading}
    >
      <View style={styles.pdfHeader}>
        <Text style={styles.pdfTitle}>#{index + 1} {item.title}</Text>
        <Text style={styles.categoryTag}>{item.category.name}</Text>
      </View>
      <View style={styles.pdfDetails}>
        <Text style={styles.subjectCode}>{item.degree.name}</Text>
        <Text style={styles.subjectName}>{item.subjects.name}</Text>
      </View>
      <View style={styles.pdfFooter}>
        <Text style={styles.uploadedBy}>By: {item.user.name}</Text>
        <Text style={styles.uploadedBy}>Size: {item.file_size_formatted}</Text>
        <Text style={styles.date}>
          {new Date(item.created_at).toLocaleDateString()}
        </Text>
      </View>
      {isDownloading && (
        <ActivityIndicator
          size="small"
          color="#5D4FE8"
          style={styles.downloadingIndicator}
        />
      )}
    </TouchableOpacity>
  );

  const CategoryFilter = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.categoryContainer}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.categoryButton,
            selectedCategory === category.name && styles.activeCategoryButton,
          ]}
          onPress={() => setSelectedCategory(category.name)}
        >
          <Text
            style={[
              styles.categoryButtonText,
              selectedCategory === category.name &&
                styles.activeCategoryButtonText,
            ]}
          >
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const DegreeFilter = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.degreeContainer}
    >
      {degrees.map((degree) => (
        <TouchableOpacity
          key={degree.id}
          style={[
            styles.degreeButton,
            selectedDegree === degree.name && styles.activeDegreeButton,
          ]}
          onPress={() => setSelectedDegree(degree.name)}
        >
          <Text
            style={[
              styles.degreeButtonText,
              selectedDegree === degree.name && styles.activeDegreeButtonText,
            ]}
          >
            {degree.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <TouchableOpacity>
            <Text style={styles.searchIcon}>🔍</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.searchInput}
            placeholder="Search PDFs..."
            placeholderTextColor="#A79FC9"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <CategoryFilter />
        <DegreeFilter />
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              sortBy === "title" && styles.activeFilter,
            ]}
            onPress={() => setSortBy("title")}
          >
            <Text style={styles.filterText}>Title</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              sortBy === "subject" && styles.activeFilter,
            ]}
            onPress={() => setSortBy("subject")}
          >
            <Text style={styles.filterText}>Subject</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              sortBy === "date" && styles.activeFilter,
            ]}
            onPress={() => setSortBy("date")}
          >
            <Text style={styles.filterText}>Latest</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={filteredAndSortedPdfs}
        renderItem={renderPdfItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={["#5D4FE8"]}
          />
        }
        onEndReached={loadMoreItems}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator
              size="large"
              color="#5D4FE8"
              style={styles.loader}
            />
          ) : (
            <Text style={styles.emptyText}>No PDFs found</Text>
          )
        }
        ListFooterComponent={() =>
          isLoadingMore ? (
            <ActivityIndicator size="small" color="#5D4FE8" style={styles.footerLoader} />
          ) : null
        }
      />

      {/* Bottom navigation */}
      <BottomNav navigation={navigation} activeScreen="Pdf" />
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
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
    backgroundColor: "#4F43C2",
  },
  activeFilter: {
    backgroundColor: "#7A6FF0",
  },
  filterText: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  listContainer: {
    padding: 15,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  pdfCard: {
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
  },
  pdfHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  pdfTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "#2C3E50",
  },
  categoryTag: {
    backgroundColor: "#5D4FE8",
    color: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    marginLeft: 10,
  },
  pdfDetails: {
    marginBottom: 10,
  },
  subjectCode: {
    color: "#5D4FE8",
    fontSize: 14,
    fontWeight: "600",
  },
  subjectName: {
    color: "#7F8C8D",
    fontSize: 14,
  },
  pdfFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    paddingTop: 10,
  },
  uploadedBy: {
    color: "#95A5A6",
    fontSize: 12,
  },
  date: {
    color: "#95A5A6",
    fontSize: 12,
  },
  loader: {
    marginTop: 20,
  },
  emptyText: {
    textAlign: "center",
    color: "#666",
    marginTop: 20,
    fontSize: 16,
  },
  categoryContainer: {
    flexGrow: 0,
    marginVertical: 10,
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#4F43C2",
    marginRight: 8,
  },
  activeCategoryButton: {
    backgroundColor: "#7A6FF0",
  },
  categoryButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  activeCategoryButtonText: {
    fontWeight: "bold",
  },
  degreeContainer: {
    flexGrow: 0,
    marginBottom: 10,
  },
  degreeButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#4F43C2",
    marginRight: 8,
  },
  activeDegreeButton: {
    backgroundColor: "#7A6FF0",
  },
  degreeButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  activeDegreeButtonText: {
    fontWeight: "bold",
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
  activeNavButton: {
    backgroundColor: "#F0F0F0",
  },
  navIcon: {
    fontSize: 24,
  },
  downloadingIndicator: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  footerLoader: {
    paddingVertical: 20,
  },
});

export default PdfScreen;
