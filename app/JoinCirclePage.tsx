import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { db, auth } from "@/firebase"; // Firebase configuration for database and authentication
import {
  query,
  collection,
  where,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore"; // Firestore methods
import { useNavigation } from "@react-navigation/native"; // Hook to navigate between screens

export default function MakeCirclePage() {
  const navigation = useNavigation(); // Navigation object for routing
  const [circleName, setCircleName] = useState(""); // State to store the circle name entered by the user

  // Function to handle joining a circle
  const handleJoinCircle = async () => {
    // Validate that a circle name is entered
    if (!circleName) {
      Alert.alert("A Circle Name is required");
      return;
    }

    try {
      const user = auth.currentUser; // Get the current authenticated user
      if (!user) {
        Alert.alert("User not authenticated!"); // Ensure the user is logged in
        return;
      }

      // User data to be added to the circle
      const userData = {
        userName: user.displayName || user.email, // Use the user's display name or email
        adminStatus: false, // Set admin status to false (default behavior)
        score: 0, // Initialize the user's score in the circle
      };

      // Reference the "Circles" collection in Firestore
      const circlesRef = collection(db, "Circles");
      // Query to check if a circle with the entered name exists
      const q = query(circlesRef, where("circleName", "==", circleName));
      const querySnapshot = await getDocs(q); // Execute the query

      // If no circle is found with the entered name
      if (querySnapshot.empty) {
        Alert.alert("Error", "No Circle with this name exists!");
        return;
      }

      const circleDoc = querySnapshot.docs[0]; // Assuming circle names are unique
      const circleData = circleDoc.data(); // Get circle data

      // Check if the user is already a part of the circle
      const userExists = circleData.users?.some(
        (u) => u.userName === (user.displayName || user.email)
      );

      if (userExists) {
        Alert.alert("You are already a part of this circle!");
        return;
      }

      const circleRef = doc(db, "Circles", circleDoc.id); // Reference to the specific circle document

      // Add the user to the "users" field in the circle document
      await updateDoc(circleRef, {
        users: arrayUnion(userData), // Use `arrayUnion` to add the user without overwriting the array
      });

      Alert.alert(`You have joined the circle "${circleName}"!`); // Notify the user of success
    } catch (error) {
      Alert.alert("Error joining Circle", error.message); // Handle errors
    }
  };

  return (
    <View style={styles.container}>
      {/* Card to contain the input and join button */}
      <View style={styles.card}>
        <Text style={styles.title}>Join a Circle</Text>
        <TextInput
          placeholder="Circle Name" // Placeholder text for the input field
          value={circleName} // Bind input value to state
          onChangeText={setCircleName} // Update state when text changes
          style={styles.input}
        />
        <TouchableOpacity
          style={[
            styles.button,
            circleName ? styles.buttonActive : styles.buttonDisabled, // Change button style based on input
          ]}
          onPress={handleJoinCircle} // Trigger the join circle function
          disabled={!circleName} // Disable the button if no circle name is entered
        >
          <Text style={styles.buttonText}>Join</Text>
        </TouchableOpacity>
      </View>

      {/* Button to navigate back */}
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.goBack()} // Go back to the previous screen
      >
        <Image
          source={require("../assets/images/backarrow.png")} // Replace with your image file path
        />
      </TouchableOpacity>
    </View>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1, // Use all available space
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
    backgroundColor: "#C4DDEB", // Light blue background
  },
  card: {
    width: "85%", // Card takes up 85% of the width
    height: "25%", // Card height is 25% of the screen
    justifyContent: "center", // Center content vertically
    backgroundColor: "#FFFFFF", // White background
    borderRadius: 20, // Rounded corners
    padding: 20, // Inner padding
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 5 }, // Shadow offset
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 5, // Shadow blur radius
    elevation: 10, // Shadow for Android
    top: -20, // Slightly move up from center
  },
  title: {
    fontSize: 30, // Large font size
    fontWeight: "400", // Normal weight
    marginBottom: 30, // Space below title
    textAlign: "center", // Center text alignment
  },
  input: {
    height: 40, // Height of the input field
    backgroundColor: "#C4DDEB4D", // Light blue background
    borderRadius: 10, // Rounded corners
    marginBottom: 25, // Space below the input
    paddingHorizontal: 15, // Horizontal padding inside input
  },
  button: {
    height: 45, // Button height
    borderRadius: 10, // Rounded corners
    justifyContent: "center", // Center text vertically
    alignItems: "center", // Center text horizontally
    elevation: 4, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.84, // Shadow blur radius
  },
  buttonActive: {
    backgroundColor: "#95C0D7", // Active button color
  },
  buttonDisabled: {
    backgroundColor: "#D3D3D3", // Disabled button color
  },
  buttonText: {
    fontSize: 16, // Text size
    fontWeight: "600", // Bold text
    color: "#FFF", // White text color
  },
  buttonContainer: {
    position: "absolute", // Positioned relative to the screen
    top: 30, // Position from the top
    left: 10, // Position from the left
    width: 100, // Width of the button
    height: 100, // Height of the button
    alignItems: "center", // Center horizontally
    justifyContent: "center", // Center vertically
  },
});
