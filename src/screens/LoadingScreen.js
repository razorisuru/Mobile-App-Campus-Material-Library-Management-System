import React, { useContext } from "react";
import {
    View,
    SafeAreaView,
    Text,
    ActivityIndicator,
    ImageBackground,
    StyleSheet,
} from "react-native";

import AuthContext from "../contexts/AuthContext";

export default function LoadingScreen() {
    return (
        <ImageBackground
            // source={require("../../assets/SIBA-E-LIB.png")}
            style={styles.background}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>Welcome to Your Ebook Library</Text>
                    <ActivityIndicator size="large" color="#ffffff" />
                    <Text style={styles.loadingText}>Loading your books...</Text>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#ffffff",
        marginBottom: 20,
    },
    loadingText: {
        fontSize: 16,
        color: "#ffffff",
        marginTop: 10,
    },
});
