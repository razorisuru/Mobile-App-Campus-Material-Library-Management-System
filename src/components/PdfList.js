import React from "react";
import { FlatList, TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";

const PdfList = ({ data }) => {
  const renderPdfItem = ({ item }) => (
    <TouchableOpacity style={styles.pdfCard}>
      <View style={styles.pdfImageContainer}>
        <View style={styles.imagePlaceholder}>
          <Image source={require("../../assets/placeholder.jpg")} style={styles.placeholderImage} />
          {/* <Text >{item.description}</Text> */}
        </View>
      </View>
      <Text style={styles.pdfTitle}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderPdfItem}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.pdfList}
    />
  );
};

const styles = StyleSheet.create({
  pdfList: {
    marginBottom: 15,
  },
  pdfCard: {
    marginLeft: 15,
    marginRight: 5,
    width: 100,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
  },
  pdfImageContainer: {
    height: 80,
    backgroundColor: "#E5E5E5",
  },
  pdfTitle: {
    padding: 10,
    fontSize: 14,
    fontWeight: "500",
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
});

export default PdfList;