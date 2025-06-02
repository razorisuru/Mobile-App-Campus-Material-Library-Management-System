import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  Animated,
  StatusBar,
} from 'react-native';

const WelcomeScreen = ({ navigation, onGetStarted }) => {
  // Animation values
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(30);
  const scaleAnim = new Animated.Value(0.95);

  const handlePress = () => {
    onGetStarted;
    navigation.navigate('Login');
  };

  useEffect(() => {
    // Entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Book icon animation
  const renderBookIcon = () => (
    <Animated.View 
      style={[
        styles.bookIconContainer,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }]
        }
      ]}
    >
      <View style={styles.bookIcon}>
        <View style={styles.bookCover} />
        <View style={styles.bookPages} />
      </View>
    </Animated.View>
  );

  // Categories preview
  const renderCategoryPreviews = () => (
    <Animated.View 
      style={[
        styles.previewContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }
      ]}
    >
      <View style={styles.imageRow}>
        <View style={styles.imageContainer}>
          <View style={styles.imagePlaceholder} />
          <View style={styles.label}>
            <Text style={styles.labelText}>Technology</Text>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <View style={styles.imagePlaceholder} />
          <View style={styles.label}>
            <Text style={styles.labelText}>Education</Text>
          </View>
        </View>
      </View>
      <View style={styles.imageRow}>
        <View style={styles.imageContainer}>
          <View style={styles.imagePlaceholder} />
          <View style={styles.label}>
            <Text style={styles.labelText}>Technology</Text>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <View style={styles.imagePlaceholder} />
          <View style={styles.label}>
            <Text style={styles.labelText}>Education</Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {renderBookIcon()}
      {renderCategoryPreviews()}

      <Animated.View 
        style={[
          styles.bottomCard,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <Text style={styles.title}>Let's Read{'\n'}Something New{'\n'}Today?</Text>
        
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity 
            style={styles.button}
            onPress={handlePress}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>LET'S GO</Text>
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.dots}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bookIconContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  bookIcon: {
    width: 40,
    height: 40,
    position: 'relative',
  },
  bookCover: {
    width: 30,
    height: 40,
    backgroundColor: '#6B2FB5',
    borderRadius: 3,
  },
  bookPages: {
    position: 'absolute',
    right: 0,
    width: 15,
    height: 36,
    top: 2,
    backgroundColor: '#8144C5',
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
  },
  previewContainer: {
    padding: 20,
    marginTop: 40,
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  imageContainer: {
    width: '48%',
    position: 'relative',
  },
  imagePlaceholder: {
    width: '100%',
    height: 150,
    backgroundColor: '#E5E5E5',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    position: 'absolute',
    bottom: -10,
    right: 10,
    backgroundColor: '#FFD7A8',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  labelText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '500',
  },
  bottomCard: {
    backgroundColor: '#6C63FF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
    marginTop: 'auto',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#2D1B4F',
    padding: 15,
    borderRadius: 25,
    width: 120,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  dots: {
    flexDirection: 'row',
    marginTop: 30,
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 4,
    marginRight: 5,
  },
  activeDot: {
    backgroundColor: '#fff',
    width: 20,
  },
});

export default WelcomeScreen;