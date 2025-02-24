import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image source={require('../../assets/SIBA-E-LIB.png')} style={styles.bookIcon} />
        <View style={styles.cardContainer}>
          <View style={styles.card} />
          <View style={styles.card} />
        </View>
        <View style={styles.tagContainer}>
          <Text style={styles.tag}>Education</Text>
          <Text style={styles.tag}>Technology</Text>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.title}>Let's Read Something New Today?</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>LET'S GO</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
  },
  topContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  bookIcon: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  card: {
    width: 100,
    height: 100,
    backgroundColor: '#E0E0E0',
    margin: 10,
    borderRadius: 15,
  },
  tagContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  tag: {
    backgroundColor: '#FFC266',
    padding: 8,
    borderRadius: 15,
    marginHorizontal: 5,
    fontSize: 12,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#836FFF',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4A235A',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default WelcomeScreen;