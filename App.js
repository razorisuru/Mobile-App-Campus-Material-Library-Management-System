import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import HomeScreen from "./src/screens/HomeScreen";
import AuthContext from "./src/contexts/AuthContext";
import { loadUser } from "./src/services/AuthService";
import LoadingScreen from "./src/screens/LoadingScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import BookDetailScreen from "./src/screens/BookDetailScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState("loading");

  useEffect(() => {
    async function runEffect() {
      try {
        const user = await loadUser();
        console.log(user);
        setUser(user);
      } catch (e) {
        console.log("Failed to load user ", e);
      }

      setLoading("idle");
    }

    runEffect();
  }, []);

  if (loading === "loading") {
    return <LoadingScreen />;
  }
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer >
        <Stack.Navigator  screenOptions={{ headerShown: false }}>
          {user ? (
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="BookDetail" component={BookDetailScreen} />
            </>
          ) : (
            <>
              {/* <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}}/> */}
              <Stack.Screen name="Welcome" component={WelcomeScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
            </>
          )}
          {/* <Stack.Screen name="Register" component={LoginScreen} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
