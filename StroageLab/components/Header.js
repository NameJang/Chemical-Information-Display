import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
  ScrollView,
  TextInput, // Import TextInput for the search bar
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AssetExample from './AssetExample';
import DataModal from './DataModal';

export default function HeaderFunction() {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const progress = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [activeScreen, setActiveScreen] = useState('screen1'); // State for changing screens
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  const renderScreenContent = () => {
    switch (activeScreen) {
      case 'screen1':
        return <AssetExample searchQuery={searchQuery} />;
      case 'screen2':
        return (
          <ScrollView>
            <DataModal searchQuery={searchQuery} />
          </ScrollView>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    if (modalVisible) {
      setLoading(true);
      progress.setValue(0);
      fadeAnim.setValue(0);

      Animated.timing(progress, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: false,
      }).start(() => {
        setLoading(false);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      });
    } else {
      progress.setValue(0);
    }
  }, [modalVisible, fadeAnim, progress]);

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity
          style={[styles.buttonnav, modalVisible && styles.buttonnavActive]}
          onPress={() => setModalVisible(true)}
        >
          <Icon name="tasks" size={23} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>Storage</Text>
        </TouchableOpacity>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="gray" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="gray"
          />
        </View>
      </View>

      {/* Sidebar */}
      <View style={styles.sidebar}>
        <Text style={styles.paragraph}>LabStorage</Text>
        
        {/* Moved buttons into the sidebar */}
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setActiveScreen('screen1')}
        >
          <Text style={styles.navButtonText}>Chemical</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setActiveScreen('screen2')}
        >
          <Text style={styles.navButtonText}>All Storage</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.scrollContainer}>
        <View style={styles.cardContainer}>
          {renderScreenContent()}
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <View style={styles.navbarModal}>
            <TouchableOpacity
              style={styles.buttoncs}
              onPress={() => setModalVisible(false)}
            >
              <Icon name="times-circle" size={25} color="white" />
            </TouchableOpacity>
          </View>

          {loading ? (
            <View style={styles.progressBarContainer}>
              <Animated.View
                style={[
                  styles.progressBar,
                  {
                    width: progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0%', '100%'],
                    }),
                  },
                ]}
              />
            </View>
          ) : (
            <Animated.View style={{ opacity: fadeAnim }}>
              <ScrollView contentContainerStyle={styles.scrollContainer}>
                <DataModal searchQuery={searchQuery} />
              </ScrollView>
            </Animated.View>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start', // Left align content
    padding: 20,
    backgroundColor: '#ffffff',
    marginLeft: '15%', // Adjust to avoid overlap with Sidebar
    borderRadius: 10,
  },
  navbar: {
    position: 'absolute',
    top: 10,
    left: '15%', // Adjust navbar position
    right: 10,
    height: 80,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.836)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start', // Align buttons to the left
    alignItems: 'center',
    elevation: 100,
    zIndex: 10,
  },
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 10,
    bottom: 0,
    width: '14%', // Sidebar width
    backgroundColor: 'rgba(255, 255, 255, 0.836)',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20, // Rounded corners at bottom
    zIndex: 5,
    elevation: 50,
    padding: 10,
    justifyContent: 'flex-start', // Align buttons and text to the top
  },
  navbarModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    padding: 35,
    borderRadius: 10,
    backgroundColor: 'rgb(58, 97, 225)',
    borderBottomWidth: 10,
    borderBottomColor: '#EAEAEA',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 100,
    zIndex: 10,
  },
  paragraph: {
    color: '#0077ff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20, // Add margin to separate buttons from title
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 8,
    paddingTop: 100,
  },
  buttonnav: {
    position: 'absolute', // Absolute positioning
    right: 20, // From the right edge
    flexDirection: 'row', // Horizontal layout
    alignItems: 'center', // Vertically center content
    justifyContent: 'center',
    padding: 8,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    backgroundColor: '#1249FF',
  },
  icon: {
    marginLeft: 4, // Space between icon and edge
  },
  buttonText: {
    color: 'white', // Button text color
    padding: 3,
    marginLeft: 5,  // Space between icon and text
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonnavActive: {
    backgroundColor: '#0300F0',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#CBC0F0',
  },
  navButton: {
    flexDirection: 'row', // Horizontal layout
    padding: 10,
    margin: 5,
    backgroundColor: '#0077ff',
    borderRadius: 5,
    alignItems: 'center', // Align button content vertically
    justifyContent: 'center', // Center text horizontally
  },
  navButtonText: {
    color: 'white',
    fontSize: 14,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5', // Light background for a softer look
    borderRadius: 25, // Rounded edges for a cute effect
    borderColor: '#007BFF', // Light pink border for a playful touch
    borderWidth: 2,
    padding: 10, // Increased padding for more spacious input
    width: '70%', // Adjust width to make it stand out
    marginLeft: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, // Shadow effect on Android
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 15, // Extra padding for comfort
    fontSize: 16, // Larger font for a friendlier feel
    color: '#333', // Darker text for readability
  },
  searchIcon: {
    marginRight: 10,
    color: '#007BFF', // Matching the icon color to the border
  },
  buttoncs: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
    borderRadius: 9,
    backgroundColor: 'red',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 50,
    borderRadius: 9,
    backgroundColor: '#FFFFFF',
  },
  progressBarContainer: {
    width: 100,
    height: 100,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 20,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#3b5998',
  },
});
