import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  Platform,
} from "react-native";

import { AntDesign, FontAwesome } from "@expo/vector-icons";

import FormTextField from "../components/FormTextField";
import { register, loadUser } from "../services/AuthService";
import AuthContext from "../contexts/AuthContext";

export default function ({ navigation }) {
  const { setUser } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState({});

  async function handleRegister({ navigation }) {
    setErrors({});
    try {
      await register({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
        device_name: `${Platform.OS} ${Platform.Version}`,
      });

      const user = await loadUser();
      setUser(user);
      navigation.replace("Home");

      console.log(user);
    } catch (e) {
      console.log(e.response.data);
      if (e.response?.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/SIBA-E-LIB.png")}
        style={styles.logo}
      />
      <Text style={styles.title}></Text>
      <Text style={styles.subtitle}></Text>
      <Text style={styles.title}>Register</Text>

      {/* Input Fields */}
      <View
        style={[
          styles.inputContainer,
          errors.name && styles.errorInputContainer,
        ]}
      >
        <AntDesign name="user" size={20} color="#6e6e6e" style={styles.icon} />
        <FormTextField
          // label="Name : "
          value={name}
          onChangeText={(text) => setName(text)}
          errors={errors.name}
          placeholder="Full Name"
        />
      </View>
      <View
        style={[
          styles.inputContainer,
          errors.email && styles.errorInputContainer,
        ]}
      >
        <AntDesign name="mail" size={20} color="#6e6e6e" style={styles.icon} />
        <FormTextField
          // label="Email : "
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          errors={errors.email}
          placeholder="Email"
        />
      </View>
      <View style={[styles.inputContainer,
          errors.password && styles.errorInputContainer,]}>
        <FontAwesome
          name="lock"
          size={20}
          color="#6e6e6e"
          style={styles.icon}
        />
        <FormTextField
          // label="Password : "
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          errors={errors.password}
          placeholder="Password"
        />
      </View>
      <View style={[styles.inputContainer,
          errors.password_confirmation && styles.errorInputContainer,]}>
        <FontAwesome
          name="lock"
          size={20}
          color="#6e6e6e"
          style={styles.icon}
        />
        <FormTextField
          // label="Password Confirmation : "
          value={passwordConfirmation}
          onChangeText={(text) => setPasswordConfirmation(text)}
          secureTextEntry={true}
          errors={errors.password_confirmation}
          placeholder="Password Confirmation"
        />
      </View>

      {/* Register Button */}
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>REGISTER</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text
          style={{
            color: "#4C0070",
            fontSize: 16,
            fontWeight: "bold",
            marginTop: 50,
          }}
        >
          Back to Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 200,
    height: 110,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#6e6e6e",
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5E6FA",
    borderRadius: 10,
    width: "100%",
    height: 50,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  errorInputContainer: {
    borderWidth: 1,
    borderColor: "red",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  registerButton: {
    backgroundColor: "#4C0070",
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorMessage: {
    color: "red",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
  },
});
