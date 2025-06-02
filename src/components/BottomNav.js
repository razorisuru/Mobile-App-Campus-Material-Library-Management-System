import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const BottomNav = ({ navigation, activeScreen }) => {
  const handleNavigate = (screenName) => {
    if (screenName !== activeScreen) {
      navigation.navigate(screenName);
    }
  };

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity 
        style={[
          styles.navButton,
          activeScreen === 'Chat' && styles.activeNavButton
        ]} 
        onPress={() => handleNavigate('Chat')}
      >
        <Text style={styles.navIcon}>
            <MaterialIcons name="chat" size={24} color="#5D4FE8" />
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[
          styles.navButton,
          activeScreen === 'Pdf' && styles.activeNavButton
        ]} 
        onPress={() => handleNavigate('Pdf')}
      >
        <Text style={styles.navIcon}>
            <MaterialIcons name="picture-as-pdf" size={24} color="#5D4FE8" />
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[
          styles.navButton,
          activeScreen === 'Home' && styles.activeNavButton
        ]} 
        onPress={() => handleNavigate('Home')}
      >
        <Text style={styles.navIcon}>
            <MaterialIcons name="home" size={24} color="#5D4FE8" />
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[
          styles.navButton,
          activeScreen === 'Profile' && styles.activeNavButton
        ]} 
        onPress={() => handleNavigate('Profile')}
      >
        <Text style={styles.navIcon}>
            <MaterialIcons name="person" size={24} color="#5D4FE8" />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
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
    backgroundColor: '#f3c4ff',
    borderRadius: 10,
  },
  navIcon: {
    fontSize: 24,
  },
});

export default BottomNav;