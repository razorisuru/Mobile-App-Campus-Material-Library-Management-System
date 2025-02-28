import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <Image
        source={require("../../assets/SIBA-E-LIB.png")} 
        style={styles.logo}
      />

      {/* Title Section */}
      <Text style={styles.title}>SIBA CAMPUS</Text>
      <Text style={styles.subtitle}>E-LIBRARY</Text>

      {/* Placeholder Text */}
      <Text style={styles.description}></Text>
      <Text style={styles.description}></Text>
      <Text style={styles.description}></Text>
      <Text style={styles.description}></Text>
      <Text style={styles.description}></Text>

      {/* Buttons Section */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.buttonText}>REGISTER</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4C0070",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#4C0070",
    marginBottom: 40,
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    color: "#6e6e6e",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#4C0070",
    borderRadius: 25,
    width: "80%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#D6D6FF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default WelcomeScreen;
