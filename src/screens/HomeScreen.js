import React, { useContext } from "react";
import {
    View,
    SafeAreaView,
    Text,
    Button
} from "react-native";

import AuthContext from "../contexts/AuthContext";
import { logout } from "../services/AuthService";


export default function () {
    const { user, setUser } = useContext(AuthContext);

    async function handleLogout() {
        await logout();
        setUser(null);
    }
    return (
        <>
            <SafeAreaView>
                <View style={{ padding: 20 }}>
                    <Text>Welcome Home {user.name}</Text>
                    <Button title="Logout" onPress={handleLogout} />
                </View>
            </SafeAreaView>
        </>
    );
}
