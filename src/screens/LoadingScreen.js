import React, { useContext } from "react";
import {
    View,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    Alert,
    Platform,
} from "react-native";

import FormTextField from "../components/FormTextField";
import AuthContext from "../contexts/AuthContext";


export default function () {
    return (
        <>
            <SafeAreaView>
                <View style={{ padding: 20 }}>
                    <Text>Loading ...</Text>
                </View>
            </SafeAreaView>
        </>
    );
}
