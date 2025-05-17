import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
  Linking,
} from "react-native";
import AuthContext from "../contexts/AuthContext";
import { logout } from "../services/AuthService";
import BottomNav from "../components/BottomNav";

const ProfileScreen = ({ navigation }) => {
  const { user, setUser } = useContext(AuthContext);

  //   console.log(`${user.profile_photo_path}`);

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: async () => {
          await logout();
          setUser(null);
        },
        style: "destructive",
      },
    ]);
  };

  // Add this after the existing handleLogout function
  const handleVerifyEmail = () => {
    Linking.openURL(`${process.env.EXPO_BACKEND_URL}/email/verify`);
  };

  const handleNavigateToHome = () => {
    navigation.navigate("Home");
  };

  const handleNavigateToPdf = () => {
    navigation.navigate("Pdf");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const ProfileSection = ({ title, value }) => (
    <View style={styles.infoSection}>
      <Text style={styles.infoLabel}>{title}</Text>
      <Text style={styles.infoValue}>{value || "Not provided"}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      <ScrollView style={styles.content}>
        {/* Profile Image */}
        <View style={styles.profileImageContainer}>
          <Image
            source={{
              uri: `${process.env.EXPO_BACKEND_URL}/storage/${user.profile_photo_path}`,
            }}
            style={styles.profileImage}
            defaultSource={require("../../assets/default-avatar.png")}
          />
          <View style={styles.badgeContainer}>
            <Text style={styles.roleBadge}>{user.role}</Text>
          </View>
        </View>

        {/* Name and Email */}
        <View style={styles.nameContainer}>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>

        {/* Profile Information */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Account Status</Text>
          <View style={styles.statusContainer}>
            <Text style={styles.infoValue}>
              {user.email_verified_at ? "Verified" : "Unverified"}
            </Text>
            {!user.email_verified_at && (
              <TouchableOpacity
                style={styles.verifyButton}
                onPress={handleVerifyEmail}
              >
                <Text style={styles.verifyButtonText}>Verify Email</Text>
              </TouchableOpacity>
            )}
          </View>
          <ProfileSection
            title="Member Since"
            value={formatDate(user.created_at)}
          />
          <ProfileSection
            title="Last Updated"
            value={formatDate(user.updated_at)}
          />
          <ProfileSection
            title="Role"
            value={user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          />
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
      {/* Bottom Navigation */}
      <BottomNav navigation={navigation} activeScreen="Profile" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5D4FE8",
  },
  header: {
    padding: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  content: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  profileImageContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
  badgeContainer: {
    position: "absolute",
    bottom: 0,
    right: "35%",
    backgroundColor: "#5D4FE8",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  roleBadge: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  nameContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2C3E50",
  },
  userEmail: {
    fontSize: 16,
    color: "#7F8C8D",
    marginTop: 5,
  },
  infoContainer: {
    padding: 20,
  },
  infoSection: {
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 14,
    color: "#7F8C8D",
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 16,
    color: "#2C3E50",
    fontWeight: "500",
  },
  logoutButton: {
    backgroundColor: "#FF6B6B",
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  logoutButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    paddingVertical: 10,
  },
  navButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  activeNavButton: {
    backgroundColor: "#F0F0F0",
  },
  navIcon: {
    fontSize: 24,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  verifyButton: {
    backgroundColor: "#5D4FE8",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 10,
  },
  verifyButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default ProfileScreen;
