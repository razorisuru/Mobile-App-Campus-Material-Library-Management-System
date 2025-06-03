import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
} from "react-native";

import GoogleIcon from "../icons/GoogleIcon";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import Spinner from 'react-native-loading-spinner-overlay';

import FormTextField from "../components/FormTextField";
import { login, loadUser } from "../services/AuthService";
import AuthContext from "../contexts/AuthContext";

export default function ({ navigation }) {
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin() {
    setErrors({});
    setIsLoading(true);
    try {
      await login({
        email,
        password,
        device_name: `${Platform.OS} ${Platform.Version}`,
      });

      const user = await loadUser();
      setUser(user);

      console.log(user);
    } catch (e) {
      console.log(e.response.data);
      if (e.response?.status === 422) {
        setErrors(e.response.data.errors);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      {/* Logo Section */}
      <Image
        source={require("../../assets/SIBA-E-LIB.png")}
        style={styles.logo}
      />
      <Text style={styles.title}></Text>
      <Text style={styles.subtitle}></Text>

      {/* Input Section */}
      <View style={[styles.inputContainer]}>
        <AntDesign name="user" size={20} color="#6e6e6e" style={styles.icon} />
        <FormTextField
          // label="Email : "
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          errors={errors.email}
          placeholder="Email"

        />
      </View>
      <View style={[styles.inputContainer]}>
        <FontAwesome
          name="lock"
          size={20}
          color="#6e6e6e"
          style={styles.icon}
        />
        <FormTextField
          // label="Password : "
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          errors={errors.password}
          placeholder="Password"
        />
      </View>

      {/* Login Button */}
      <TouchableOpacity 
        style={[
          styles.loginButton,
          isLoading && styles.disabledButton
        ]} 
        onPress={handleLogin}
        disabled={isLoading}
      >
        <Text style={styles.loginButtonText}>
          {isLoading ? 'LOGGING IN...' : 'LOGIN'}
        </Text>
      </TouchableOpacity>

      {/* Social Login */}
      <Text style={styles.orText}>or login with</Text>
      <View style={styles.socialContainer}>
        <TouchableOpacity>
          <GoogleIcon />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign name="facebook-square" size={30} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign name="apple1" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", marginTop: 20, marginBottom: -20 }}>
        <Text style={{ color: "#6e6e6e", fontSize: 16 }}>
          Don't have an account?{" "}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={{ color: "#4C0070", fontSize: 16, fontWeight: "bold" }}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 200,
    height: 110,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  subtitle: {
    fontSize: 16,
    color: "#6e6e6e",
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5E6FA",
    borderRadius: 10,
    width: "80%",
    height: 50,
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  errorInputContainer: {
    borderWidth: 1,
    borderColor: "red",
  },
  icon: {
    marginRight: 10,
  },

  loginButton: {
    backgroundColor: "#4C0070",
    width: "80%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  orText: {
    fontSize: 16,
    color: "#6e6e6e",
    marginVertical: 20,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
  },
  disabledButton: {
    backgroundColor: '#8B4B8B',
    opacity: 0.7,
  },
});
