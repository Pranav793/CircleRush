import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { db, auth } from '@/firebase'; // Firebase configuration
import { query, collection, where, getDocs, addDoc, Timestamp } from 'firebase/firestore'; // Firestore methods
import { useNavigation } from "@react-navigation/native"; // Navigation hook

const MakeCirclePage = () => {
  // State variables to store form inputs
  const [circleName, setCircleName] = useState(''); // Circle name input
  const [winnerPrize, setWinnerPrize] = useState(''); // Winner prize input
  const [loserChallenge, setLoserChallenge] = useState(''); // Loser challenge input
  const [duration, setDuration] = useState(''); // Duration input in days

  const navigation = useNavigation(); // Navigation object for screen routing

  // Function to handle creating a circle
  const handleCreateCircle = async () => {
    // Validate that all fields are filled
    if (!circleName || !winnerPrize || !loserChallenge || !duration) {
      Alert.alert('All fields are required!'); // Show alert if any field is empty
      return;
    }

    try {
      const user = auth.currentUser; // Get the currently authenticated user

      // Reference to the "Circles" collection in Firestore
      const circlesRef = collection(db, 'Circles');

      // Query to check if a circle with the same name already exists
      const q = query(
        circlesRef,
        where('circleName', '==', circleName),
        where('users', 'array-contains', {
          userName: user.displayName || user.email, // Check if user is already an admin of a circle with the same name
          adminStatus: true,
        })
      );
      const querySnapshot = await getDocs(q); // Execute the query

      if (!querySnapshot.empty) {
        Alert.alert('A Circle with this name already exists!'); // Show alert if circle exists
        return;
      }

      const now = new Date();
      // Calculate the completion time by adding the duration to the current date
      const completionTime = Timestamp.fromDate(
        new Date(now.getTime() + Number(duration) * 24 * 60 * 60 * 1000) // Convert days to milliseconds
      );

      // Generate random RGB values in the pastel range (200–225)
      const r = Math.floor(Math.random() * 26) + 200;
      const g = Math.floor(Math.random() * 26) + 200;
      const b = Math.floor(Math.random() * 26) + 200;

      // Convert RGB to Hexadecimal
      const randomColor = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

      // Data for creating the circle
      const circleData = {
        circleName, // Name of the circle
        winnerPrize, // Winner prize description
        loserChallenge, // Loser challenge description
        duration: Number(duration), // Duration in days
        status: 'active', // Initial status of the circle
        createdAt: Timestamp.now(), // Current timestamp
        completionTime, // Calculated completion time
        colorCode: randomColor, // Random pastel color for the circle
        users: [
          {
            userName: user.displayName || user.email, // Add the creator as an admin user
            adminStatus: true, // Creator is an admin
            score: 0, // Initialize score to 0
          },
        ],
      };

      await addDoc(circlesRef, circleData); // Add the circle to Firestore
      Alert.alert('Circle created successfully!'); // Notify the user of success
      navigation.navigate('AddMembers', { circleName }); // Navigate to the Add Members screen
    } catch (error) {
      Alert.alert('Error creating Circle', error.message); // Handle and show errors
    }
  };

  return (
    <View style={styles.container}>
      {/* Card containing input fields and button */}
      <View style={styles.card}>
        <Text style={styles.title}>Circle Info</Text>
        {/* Input for Circle Name */}
        <TextInput
          placeholder="Enter Circle Name"
          value={circleName}
          onChangeText={setCircleName}
          style={styles.input}
        />
        {/* Input for Winner Prize */}
        <TextInput
          placeholder="Winner Prize"
          value={winnerPrize}
          onChangeText={setWinnerPrize}
          style={styles.input}
        />
        {/* Input for Loser Challenge */}
        <TextInput
          placeholder="Loser Challenge"
          value={loserChallenge}
          onChangeText={setLoserChallenge}
          style={styles.input}
        />
        {/* Input for Duration */}
        <TextInput
          placeholder="Duration (in days)"
          value={duration}
          onChangeText={(value) => setDuration(value.replace(/[^0-9]/g, ''))} // Allow only numeric input
          keyboardType="numeric"
          style={styles.input}
        />
        {/* Button to create the circle */}
        <TouchableOpacity
          style={[
            styles.button,
            circleName && winnerPrize && loserChallenge && duration
              ? styles.buttonActive // Active button style
              : styles.buttonDisabled, // Disabled button style
          ]}
          onPress={handleCreateCircle}
          disabled={!circleName || !winnerPrize || !loserChallenge || !duration} // Disable button if any field is empty
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>

      {/* Back button to navigate to the previous screen */}
      <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.goBack()}>
        <Image
          source={require('../assets/images/backarrow.png')} // Replace with your image file path
        />
      </TouchableOpacity>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1, // Use full screen
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    backgroundColor: '#C4DDEB', // Light blue background color
  },
  card: {
    width: '85%', // 85% of the screen width
    height: '48%', // 48% of the screen height
    justifyContent: 'center', // Center content vertically
    backgroundColor: '#FFFFFF', // White background for the card
    borderRadius: 20, // Rounded corners
    padding: 20, // Inner padding
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 5 }, // Shadow offset
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 5, // Shadow blur
    elevation: 10, // Shadow for Android
  },
  title: {
    fontSize: 30, // Large font size
    fontWeight: '400', // Normal weight
    marginBottom: 30, // Space below the title
    textAlign: 'center', // Center align text
  },
  input: {
    height: 40, // Input field height
    backgroundColor: '#C4DDEB4D', // Light blue background
    borderRadius: 10, // Rounded corners
    marginBottom: 25, // Space below the input
    paddingHorizontal: 15, // Inner padding
  },
  button: {
    height: 45, // Button height
    borderRadius: 10, // Rounded corners
    justifyContent: 'center', // Center text vertically
    alignItems: 'center', // Center text horizontally
    elevation: 4, // Shadow for Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.84, // Shadow blur
  },
  buttonActive: {
    backgroundColor: '#95C0D7', // Active button background
  },
  buttonDisabled: {
    backgroundColor: '#D3D3D3', // Disabled button background
  },
  buttonText: {
    fontSize: 16, // Text size
    fontWeight: '600', // Bold text
    color: '#FFF', // White text color
  },
  buttonContainer: {
    position: 'absolute', // Positioned relative to the screen
    top: 30, // Vertical position
    left: 10, // Horizontal position
    width: 100, // Button width
    height: 100, // Button height
    alignItems: 'center', // Center content horizontally
    justifyContent: 'center', // Center content vertically
  },
});

export default MakeCirclePage;
