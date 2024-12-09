import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { db, auth } from '@/firebase'; // Firebase configuration for authentication and database
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Firebase method for creating user accounts
import { collection, addDoc } from 'firebase/firestore'; // Firestore methods for database interaction
import { useNavigation } from '@react-navigation/native'; // Navigation hook

export default function SignupScreen() {
  const [email, setEmail] = useState(''); // State to store email input
  const [password, setPassword] = useState(''); // State to store password input
  const navigation = useNavigation(); // Navigation object for screen routing

  // Function to handle user signup
  const handleSignup = async () => {
    try {
      // Create user with Firebase authentication
      await createUserWithEmailAndPassword(auth, email, password);

      // Add the user's email to the Firestore database
      const userData = { email };
      const usersRef = collection(db, 'Users');
      await addDoc(usersRef, userData);

      Alert.alert('Sign up Successful!'); // Notify the user
    } catch (error) {
      Alert.alert('Signup Failed', error.message); // Handle and display errors
    }
  };

  return (
    <View style={styles.container}>
      {/* Main frame containing the signup form */}
      <View style={styles.frame}>
        {/* Upper rectangle with "Get Started" text */}
        <View style={styles.Rectangle2Container}>
          <Image
            source={require('../assets/images/Rectangle2.png')} // Background rectangle image
            style={styles.Rectangle2}
          />
          <Text style={styles.rectTextLarge}>Get Started</Text>
        </View>

        {/* Lower rectangle containing input fields */}
        <View style={styles.Rectangle1Container}>
          <Image
            source={require('../assets/images/Rectangle1.png')} // Background rectangle image
            style={styles.Rectangle1}
          />
          
          {/* Email Input Field */}
          <View style={[styles.inputContainer, { top: 120 }]}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.inputEmail}
              placeholder="Enter your email" // Placeholder text
              placeholderTextColor="#A6A6A6" // Light gray color
              value={email} // Bind to email state
              onChangeText={setEmail} // Update state on text change
            />
          </View>

          {/* Password Input Field */}
          <View style={[styles.inputContainer, { top: 190 }]}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.inputPassword}
              placeholder="Enter your password" // Placeholder text
              placeholderTextColor="#A6A6A6" // Light gray color
              secureTextEntry={true} // Hide input for security
              value={password} // Bind to password state
              onChangeText={setPassword} // Update state on text change
            />
          </View>

          {/* Create Account Button */}
          <TouchableOpacity style={styles.createButton} onPress={handleSignup}>
            <Text style={styles.createButtonText}>Create Account</Text>
          </TouchableOpacity>

          {/* Back Button */}
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => navigation.navigate('LoginScreen')} // Navigate back to login screen
          >
            <Image
              source={require('../assets/images/backarrow.png')} // Back arrow image
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// Styles for the SignupScreen component
const styles = StyleSheet.create({
  container: {
    flex: 1, // Use the entire screen space
    alignItems: 'center', // Center horizontally
    justifyContent: 'center', // Center vertically
    backgroundColor: '#C4DDEB', // Light blue background
  },

  frame: {
    width: 455, // Frame width
    height: 856, // Frame height
    position: 'absolute',
    top: 0, // Start from the top
    left: 0, // Start from the left
    opacity: 1, // Full opacity
    backgroundColor: '#C4DDEB', // Light blue background
    alignItems: 'center', // Center content horizontally
    justifyContent: 'center', // Center content vertically
    borderColor: '#000', // Border color
    borderWidth: 1, // Border width
    borderRadius: 4, // Slightly rounded corners
  },

  Rectangle2Container: {
    position: 'absolute',
    top: -100, // Position above the center
    left: 0,
    width: 395, // Container width
    height: 414, // Container height
    alignItems: 'center', // Center content horizontally
    justifyContent: 'center', // Center content vertically
  },

  Rectangle2: {
    width: '100%', // Full width
    height: '100%', // Full height
    resizeMode: 'contain', // Maintain aspect ratio
  },

  rectTextLarge: {
    position: 'absolute',
    color: '#FFFFFF', // White text color
    fontSize: 40, // Large font size
    fontWeight: 'medium', // Medium weight text
    alignItems: 'center', // Center horizontally
    top: 230, // Vertical position
  },

  Rectangle1Container: {
    position: 'absolute',
    top: 130, // Position below the first rectangle
    left: 7, // Slight left margin
    width: 380, // Container width
    height: 434, // Container height
    alignItems: 'center', // Center content horizontally
    justifyContent: 'center', // Center content vertically
  },

  Rectangle1: {
    width: '90%', // 90% width of the container
    height: '100%', // Full height of the container
    resizeMode: 'contain', // Maintain aspect ratio
  },

  inputContainer: {
    position: 'absolute',
    width: 300, // Input field width
    left: 40, // Left margin
  },

  label: {
    color: '#000', // Black text color
    fontSize: 16, // Label font size
    marginBottom: 5, // Space below the label
  },

  inputEmail: {
    height: 35, // Input field height
    backgroundColor: '#C4DDEB4D', // Light blue background
    borderRadius: 4, // Slightly rounded corners
    padding: 10, // Inner padding
  },

  inputPassword: {
    height: 35, // Input field height
    backgroundColor: '#C4DDEB4D', // Light blue background
    borderRadius: 4, // Slightly rounded corners
    padding: 10, // Inner padding
  },

  createButton: {
    position: 'absolute',
    width: 300, // Button width
    height: 45, // Button height
    backgroundColor: '#95C0D7', // Blue background
    justifyContent: 'center', // Center text vertically
    alignItems: 'center', // Center text horizontally
    borderRadius: 15, // Rounded corners
    top: 270, // Vertical position
    left: 40, // Horizontal position
    elevation: 4, // Shadow for Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.84, // Shadow blur
  },

  createButtonText: {
    color: '#FFFFFF', // White text color
    fontSize: 16, // Text size
  },

  buttonContainer: {
    position: 'absolute',
    top: -100, // Vertical position
    left: 0, // Horizontal position
    width: 100, // Container width
    height: 100, // Container height
    alignItems: 'center', // Center horizontally
    justifyContent: 'center', // Center vertically
  },
});

// export default SignupScreen;
