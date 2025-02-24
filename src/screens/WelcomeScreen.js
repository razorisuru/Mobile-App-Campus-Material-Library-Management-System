import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen = () => {
  const navigation = useNavigation();

  // Animation Values
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);
  const buttonScale = new Animated.Value(1);

  // Fade-in Animation
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  // Button Press Animation
  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      friction: 4,
      tension: 50,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      {/* Top Logo */}
      <Animated.Image
        source={require("../../assets/SIBA-E-LIB.png")} // Add your logo image here
        style={[styles.logo, { opacity: fadeAnim }]}
      />

      {/* Animated Categories */}
      <View style={styles.imageContainer}>
        <Animated.View
          style={[
            styles.categoryBox,
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          <Image
            source={require("../../assets/placeholder.jpg")}
            style={styles.categoryImage}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.categoryBox,
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          <Image
            source={require("../../assets/placeholder.jpg")}
            style={styles.categoryImage}
          />
        </Animated.View>
      </View>

      {/* Category Labels */}
      <Animated.Text style={[styles.categoryLabel, { opacity: fadeAnim }]}>
        Education
      </Animated.Text>
      <Animated.Text
        style={[styles.categoryLabel, styles.labelLower, { opacity: fadeAnim }]}
      >
        Technology
      </Animated.Text>

      {/* Bottom Section */}
      <View style={styles.bottomContainer}>
        <Animated.Text style={[styles.heading, { opacity: fadeAnim }]}>
          Let’s Read{"\n"}Something New Today?
        </Animated.Text>

        {/* Button */}
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate("Login")}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Animated.View
            style={[styles.button, { transform: [{ scale: buttonScale }] }]}
          >
            <Text style={styles.buttonText}>LET’S GO</Text>
          </Animated.View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 60,
    height: 60,
    position: "absolute",
    top: 50,
  },
  imageContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  categoryBox: {
    backgroundColor: "#e0e0e0",
    width: 120,
    height: 120,
    borderRadius: 20,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryImage: {
    width: 80,
    height: 80,
    tintColor: "#aaa",
  },
  categoryLabel: {
    position: "absolute",
    top: "38%",
    backgroundColor: "#FFCF7B",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    fontWeight: "bold",
    color: "#000",
    fontSize: 14,
    transform: [{ rotate: "-15deg" }],
  },
  labelLower: {
    top: "50%",
    transform: [{ rotate: "-10deg" }],
  },
  bottomContainer: {
    width: "100%",
    height: "40%",
    backgroundColor: "#6A5ACD",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#4C0070",
    width: 140,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default WelcomeScreen;
