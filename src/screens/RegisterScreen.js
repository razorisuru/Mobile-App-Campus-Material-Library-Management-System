import React, { useState, useContext } from "react";
import { View, SafeAreaView, Button, Platform } from "react-native";

import axios from "../utils/axios";

import FormTextField from "../components/FormTextField";
import { register, loadUser } from "../services/AuthService";
import AuthContext from "../contexts/AuthContext";

export default function () {
  const {setUser} = useContext(AuthContext);
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
    <>
      <SafeAreaView>
        <View style={{ padding: 20 }}>
        <FormTextField
            label="Name : "
            value={name}
            onChangeText={(text) => setName(text)}
            errors={errors.name}
          />
          <FormTextField
            label="Email : "
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            errors={errors.email}
          />
          <FormTextField
            label="Password : "
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            errors={errors.password}
          />
          <FormTextField
            label="Password Confirmation : "
            value={passwordConfirmation}
            onChangeText={(text) => setPasswordConfirmation(text)}
            secureTextEntry={true}
            errors={errors.password_confirmation}
          />
          <Button title="Register" onPress={handleRegister} />
        </View>
      </SafeAreaView>
    </>
  );
}
