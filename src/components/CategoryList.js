import React from "react";
import { FlatList, TouchableOpacity, Text, StyleSheet } from "react-native";

const CategoryList = ({ data, selectedCategory, onSelectCategory }) => {
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === item.name && styles.selectedCategoryButton,
      ]}
      onPress={() => onSelectCategory(item.name)}
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

  return (
    <FlatList
      data={data}
      renderItem={renderCategoryItem}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.categoryList}
    />
  );
};

const styles = StyleSheet.create({
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
});

export default CategoryList;