import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  FlatList,
  Switch,
} from "react-native";
import {
  doc,
  collection,
  getDoc,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore"; // Firestore methods for interacting with the database
import { db, auth, functions } from "@/firebase"; // Firebase configuration
import { httpsCallable } from "firebase/functions"; // To call Firebase Cloud Functions

export default function CircleSettingsPage({ route, navigation }) {
  // Retrieve circle ID from navigation route params
  const { circleId } = route.params;

  // State variables
  const [circleData, setCircleData] = useState(null); // Store circle data
  const [userNotifications, setUserNotifications] = useState({
    taskDeadline: false, // Notification setting for task deadlines
    circleUpdates: false, // Notification setting for circle updates
  });
  const [isAdmin, setIsAdmin] = useState(false); // Check if the current user is an admin
  const [isCompleted, setIsCompleted] = useState(false); // Circle status (completed or not)

  const user = auth.currentUser; // Get the currently authenticated user

  // Fetch circle data on component mount
  useEffect(() => {
    const fetchCircleData = async () => {
      try {
        // Reference the circle document in Firestore
        const docRef = doc(db, "Circles", circleId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setCircleData(data); // Set circle data in state
          setIsCompleted(data?.status === "completed"); // Update circle status

          // Find the current user's entry in the circle
          const userEntry = data.users.find(
            (u) => u.userName === (user?.displayName || user?.email)
          );

          if (userEntry) {
            setIsAdmin(userEntry.adminStatus); // Update admin status
            setUserNotifications(userEntry.notifications || userNotifications); // Set user notifications
          } else {
            Alert.alert("Error", "User not found in this circle.");
            navigation.goBack(); // Navigate back if user is not in the circle
          }
        } else {
          Alert.alert(
            "Circle not found",
            "The circle data could not be retrieved."
          );
          navigation.goBack(); // Navigate back if circle not found
        }
      } catch (error) {
        Alert.alert("Error fetching circle data", error.message); // Handle errors
      }
    };

    fetchCircleData();
  }, [circleId, user, navigation]);

  // Assign admin to another user
  const handleAssignAdmin = async (userName) => {
    if (!isAdmin) {
      Alert.alert("Unauthorized", "Only admins can assign other admins.");
      return;
    }

    Alert.alert(
      "Assign Admin",
      `Are you sure you want to assign ${userName} as an admin?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Assign",
          style: "default",
          onPress: async () => {
            try {
              // Update the user's admin status in the circle data
              const updatedUsers = circleData.users.map((u) => {
                if (u.userName === userName) {
                  return { ...u, adminStatus: true };
                }
                return u;
              });

              // Update the circle document in Firestore
              const circleRef = doc(db, "Circles", circleId);
              await updateDoc(circleRef, { users: updatedUsers });

              // Update local state
              setCircleData((prevData) => ({
                ...prevData,
                users: updatedUsers,
              }));

              Alert.alert("Success", `${userName} is now an admin.`);
            } catch (error) {
              Alert.alert("Error", "Failed to assign admin. Please try again.");
            }
          },
        },
      ]
    );
  };

  // Toggle notification settings
  const handleToggleNotification = async (type) => {
    try {
      const updatedNotifications = {
        ...userNotifications,
        [type]: !userNotifications[type],
      };

      setUserNotifications(updatedNotifications); // Update state

      // Update the user's notification settings in the circle data
      const updatedUsers = circleData.users.map((u) => {
        if (u.userName === (user?.displayName || user?.email)) {
          return {
            ...u,
            notifications: updatedNotifications,
          };
        }
        return u;
      });

      // Update the circle document in Firestore
      const circleRef = doc(db, "Circles", circleId);
      await updateDoc(circleRef, { users: updatedUsers });

      Alert.alert(
        "Success",
        `${
          type === "taskDeadline" ? "Task deadline" : "Circle"
        } notifications ${updatedNotifications[type] ? "enabled" : "disabled"}`
      );
    } catch (error) {
      Alert.alert("Error updating notification settings", error.message);
    }
  };

  // Remove a user from the circle
  const handleDeleteUser = async (userName) => {
    if (!isAdmin) {
      Alert.alert("Unauthorized", "Only admins can remove users.");
      return;
    }

    Alert.alert(
      "Remove User",
      `Are you sure you want to remove ${userName} from this circle?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => {
            try {
              // Filter out the user to remove
              const updatedUsers = circleData.users.filter(
                (u) => u.userName !== userName
              );

              // Update the circle document in Firestore
              const circleRef = doc(db, "Circles", circleId);
              await updateDoc(circleRef, { users: updatedUsers });

              // Update local state
              setCircleData((prevData) => ({
                ...prevData,
                users: updatedUsers,
              }));

              Alert.alert("Success", `${userName} has been removed.`);
            } catch (error) {
              Alert.alert("Error", "Failed to remove user. Please try again.");
            }
          },
        },
      ]
    );
  };

  // Reset the circle
  const handleResetCircle = async () => {
    if (!isAdmin) {
      Alert.alert("Unauthorized", "Only admins can reset the circle.");
      return;
    }

    try {
      // Calculate new completion time based on circle duration
      const newCompletionTime = new Date();
      newCompletionTime.setDate(
        newCompletionTime.getDate() + (circleData.duration || 0)
      );

      // Update the circle status in Firestore
      const circleRef = doc(db, "Circles", circleId);
      await updateDoc(circleRef, {
        status: "active",
        completionTime: newCompletionTime,
      });

      Alert.alert("Success", "The circle has been reset.");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error resetting circle", error.message);
    }
  };

  // Leave the circle
  const handleLeaveCircle = async () => {
    Alert.alert("Leave Circle", "Are you sure you want to leave this circle?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Leave",
        style: "destructive",
        onPress: async () => {
          try {
            // Filter out the current user from the circle
            const updatedUsers = circleData.users.filter(
              (u) => u.userName !== (user?.displayName || user?.email)
            );

            // Ensure another admin exists if the current user is the only admin
            if (
              isAdmin &&
              updatedUsers.some((u) => u.adminStatus === true) === false
            ) {
              Alert.alert(
                "Error",
                "You are the only admin. Assign another admin before leaving."
              );
              return;
            }

            // Update the circle document in Firestore
            const circleRef = doc(db, "Circles", circleId);
            await updateDoc(circleRef, { users: updatedUsers });

            Alert.alert("Success", "You have left the circle.");
            navigation.navigate("ViewCirclesPage");
          } catch (error) {
            Alert.alert(
              "Error",
              "Failed to leave the circle. Please try again."
            );
          }
        },
      },
    ]);
  };

  // Delete the circle
  const handleDeleteCircle = async () => {
    if (!isAdmin) {
      Alert.alert("Unauthorized", "Only admins can delete the circle.");
      return;
    }

    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this circle and all its tasks?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              // Reference the tasks subcollection
              const tasksRef = collection(db, "Circles", circleId, "Tasks");
              const tasksSnap = await getDocs(tasksRef);

              // Delete all task documents in the subcollection
              const deleteTaskPromises = tasksSnap.docs.map((doc) =>
                deleteDoc(doc.ref)
              );
              await Promise.all(deleteTaskPromises);

              // Delete the circle document
              const circleRef = doc(db, "Circles", circleId);
              await deleteDoc(circleRef);

              Alert.alert(
                "Success",
                "Circle and all tasks deleted successfully."
              );
              navigation.navigate("ViewCirclesPage");
            } catch (error) {
              Alert.alert("Error deleting circle", error.message);
            }
          },
        },
      ]
    );
  };

  // Render the UI when circle data is available
  if (!circleData) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Circle Settings Header */}
      <Text style={styles.header}>Circle Settings</Text>

      {/* Display Circle Info */}
      <Text style={styles.infoText}>Circle ID: {circleId}</Text>
      <Text style={styles.infoText}>
        Status: {isCompleted ? "Completed" : "Active"}
      </Text>

      {/* Notifications Section */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Notifications</Text>
        <View style={styles.settingRow}>
          <Text style={styles.settingText}>Task Deadline Notifications</Text>
          <Switch
            value={userNotifications.taskDeadline}
            onValueChange={() => handleToggleNotification("taskDeadline")}
          />
        </View>
        <View style={styles.settingRow}>
          <Text style={styles.settingText}>Circle Notifications</Text>
          <Switch
            value={userNotifications.circleUpdates}
            onValueChange={() => handleToggleNotification("circleUpdates")}
          />
        </View>
      </View>

      {/* Users Section */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Users in Circle</Text>
        <FlatList
          data={circleData.users}
          keyExtractor={(item) => item.userName}
          renderItem={({ item }) => (
            <View style={styles.userContainer}>
              <Text style={styles.userName}>{item.userName}</Text>

              {/* Show Assign Admin Button if User is Not Admin */}
              {isAdmin && !item.adminStatus && (
                <TouchableOpacity
                  onPress={() => handleAssignAdmin(item.userName)}
                >
                  <Text style={styles.assignAdminText}>Assign Admin</Text>
                </TouchableOpacity>
              )}

              {/* Show Remove User Button if Admin */}
              {isAdmin && (
                <TouchableOpacity
                  onPress={() => handleDeleteUser(item.userName)}
                >
                  <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          style={styles.userList}
        />
      </View>

      {/* Invite Members Button for Admin */}
      {isAdmin && (
        <TouchableOpacity
          style={styles.inviteButton}
          onPress={() =>
            navigation.navigate("AddMembers", {
              circleName: circleData.circleName,
            })
          }
        >
          <Text style={styles.inviteButtonText}>Invite Members</Text>
        </TouchableOpacity>
      )}

      {/* Reset Circle Button if Completed */}
      {isAdmin && isCompleted && (
        <TouchableOpacity
          style={styles.resetButton}
          onPress={handleResetCircle}
        >
          <Text style={styles.resetButtonText}>Reset Circle</Text>
        </TouchableOpacity>
      )}

      {/* Leave Circle Button */}
      <TouchableOpacity style={styles.leaveButton} onPress={handleLeaveCircle}>
        <Text style={styles.leaveButtonText}>Leave Circle</Text>
      </TouchableOpacity>

      {/* Delete Circle Button for Admin */}
      {isAdmin && (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDeleteCircle}
        >
          <Text style={styles.deleteButtonText}>Delete Circle</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f3f4f6" },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  section: {
    marginVertical: 20,
    padding: 15,
    backgroundColor: "#ffffff",
    borderRadius: 8,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  settingText: {
    fontSize: 16,
    color: "#333",
  },
  resetButton: {
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: "#FFA500",
    borderRadius: 8,
    alignItems: "center",
  },
  resetButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  deleteButton: {
    marginTop: 10,
    paddingVertical: 10,
    backgroundColor: "#FF6B6B",
    borderRadius: 25,
    alignItems: "center",
  },
  removeText: {
    fontSize: 16,
    color: "#FF6B6B", // Red color for "Remove" text
    fontWeight: "bold",
    // textDecorationLine: "underline", // Optional: to give it a link-like look
  },
  deleteButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  inviteButton: {
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: "#4A90E2",
    borderRadius: 25,
    alignItems: "center",
  },
  inviteButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "#555",
  },
  userList: {
    maxHeight: 80, // Limit the height of the list to show 1.5 rows
    width: "100%", // Make the list take up the full width
    marginBottom: 20, // Add spacing below the list
  },
  userContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  userName: {
    fontSize: 16,
    color: "#333",
  },
  assignAdminText: {
    fontSize: 16,
    color: "#4A90E2", // Blue color for "Assign Admin" text
    fontWeight: "bold",
  },
  leaveButton: {
    marginTop: 10,
    paddingVertical: 10,
    backgroundColor: "#FF6B6B",
    borderRadius: 8,
    alignItems: "center",
  },
  leaveButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  
});
