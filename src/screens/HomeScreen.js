import React, { useContext } from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";

import AuthContext from "../contexts/AuthContext";
import { logout } from "../services/AuthService";

export default function () {
  const { user, setUser } = useContext(AuthContext);

  async function handleLogout() {
    await logout();
    setUser(null);
  }
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

      <Text style={styles.subtitle}>Welcome Home {user.name}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

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
