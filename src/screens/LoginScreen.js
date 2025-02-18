import React, { useState, useContext } from "react";
import { View, SafeAreaView, Button, Platform } from "react-native";

import axios from "../utils/axios";

import FormTextField from "../components/FormTextField";
import { login, loadUser } from "../services/AuthService";
import AuthContext from "../contexts/AuthContext";

export default function ({ navigation }) {
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  async function handleLogin() {
    setErrors({});
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
    }
  }

  return (
    <>
      <SafeAreaView>
        <View style={{ padding: 20 }}>
          <FormTextField
            label="Email : "
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            errors={errors.email}
          />
          <FormTextField
            label="Password : "
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            errors={errors.password}
          />
          <Button title="Login" onPress={handleLogin} />
          <Button
            title="Create account"
            onPress={() => {
              navigation.navigate("Register");
            }}
          />
        </View>
      </SafeAreaView>
    </>
  );
}
