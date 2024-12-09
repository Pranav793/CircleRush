import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Hook for navigation between screens
import { auth } from "@/firebase"; // Firebase authentication module

export default function MakeJoinViewPage() {
  const navigation = useNavigation(); // Navigation object for screen routing

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      await auth.signOut(); // Sign out the current user
      navigation.navigate("LoginScreen"); // Redirect to the Login screen
      Alert.alert("Logged out successfully!"); // Notify the user
    } catch (error) {
      Alert.alert("Error", "Failed to log out. Please try again."); // Handle errors
    }
  };

  return (
    <View style={styles.container}>
      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* Make a Circle Button */}
      <TouchableOpacity
        style={styles.makeButton}
        onPress={() => navigation.navigate("MakeCirclePage")} // Navigate to the Make Circle screen
      >
        <Text style={styles.makeButtonText}>Make a Circle</Text>
      </TouchableOpacity>

      {/* Join a Circle Button */}
      <TouchableOpacity
        style={styles.joinButton}
        onPress={() => navigation.navigate("JoinCirclePage")} // Navigate to the Join Circle screen
      >
        <Text style={styles.joinButtonText}>Join a Circle</Text>
      </TouchableOpacity>

      {/* View Circles Button */}
      <TouchableOpacity
        style={styles.viewButton}
        onPress={() => navigation.navigate("ViewCirclesPage")} // Navigate to the View Circles screen
      >
        <Text style={styles.viewButtonText}>View my Circles</Text>
      </TouchableOpacity>

      {/* Icon for "Make a Circle" */}
      <View style={styles.pencilContainer}>
        <Image
          source={require("../assets/images/pencil.png")} // Replace with your image file path
          style={styles.pencil}
        />
      </View>

      {/* Icon for "Join a Circle" */}
      <View style={styles.peopleContainer}>
        <Image
          source={require("../assets/images/people.png")} // Replace with your image file path
          style={styles.people}
        />
      </View>

      {/* Icon for "View Circles" */}
      <View style={styles.listtContainer}>
        <Image
          source={require("../assets/images/list.png")} // Replace with your image file path
          style={styles.listt}
        />
      </View>
    </View>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1, // Use full screen height and width
    alignItems: "center", // Center horizontally
    justifyContent: "center", // Center vertically
    backgroundColor: "rgba(196, 221, 235, 0.4)", // Light blue background with transparency
  },

  makeButton: {
    position: "absolute",
    width: 300, // Button width
    height: 45, // Button height
    backgroundColor: "#95C0D7", // Light blue button color
    justifyContent: "center", // Center text vertically
    alignItems: "center", // Center text horizontally
    borderRadius: 15, // Rounded corners
    top: 280, // Vertical position
    left: 45, // Horizontal position
    elevation: 4, // Shadow for Android
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.84, // Shadow blur
  },

  makeButtonText: {
    color: "#FFFFFF", // White text color
    fontSize: 16, // Text size
  },

  joinButton: {
    position: "absolute",
    width: 300,
    height: 45,
    backgroundColor: "#95C0D7",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    top: 430,
    left: 45,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  joinButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },

  viewButton: {
    position: "absolute",
    width: 300,
    height: 45,
    backgroundColor: "#95C0D7",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    top: 570,
    left: 45,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  viewButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },

  pencilContainer: {
    position: "absolute",
    top: 225, // Vertical position for the "Make a Circle" icon
    left: 170, // Horizontal position
    width: 45, // Icon container width
    height: 45, // Icon container height
    alignItems: "center", // Center icon horizontally
    justifyContent: "center", // Center icon vertically
  },

  pencil: {
    width: "100%",
    height: "100%",
    resizeMode: "contain", // Maintain aspect ratio
  },

  peopleContainer: {
    position: "absolute",
    top: 380, // Vertical position for the "Join a Circle" icon
    left: 170,
    width: 45,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },

  people: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  listtContainer: {
    position: "absolute",
    top: 520, // Vertical position for the "View Circles" icon
    left: 170,
    width: 45,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },

  listt: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  logoutButton: {
    position: 'absolute',
    top: 80, // Vertical position for the logout button
    right: 20, // Horizontal position
    backgroundColor: '#FF6B6B', // Red background for logout button
    paddingHorizontal: 15, // Horizontal padding
    paddingVertical: 10, // Vertical padding
    borderRadius: 10, // Rounded corners
    elevation: 4, // Shadow for Android
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.84, // Shadow blur
  },

  logoutText: {
    color: '#FFF', // White text
    fontWeight: '600', // Bold text
    fontSize: 16, // Text size
  },
});
