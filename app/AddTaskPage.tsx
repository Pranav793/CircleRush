import React, { useState } from "react";
import { 
  View, 
  TextInput, 
  Alert, 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  Button 
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { db, auth } from "@/firebase"; // Import Firebase database and authentication
import { collection, addDoc } from "firebase/firestore"; // Firestore methods for handling collections and documents
import { useNavigation } from "@react-navigation/native"; // Navigation hooks

export default function AddTaskPage({ route }) {
  const { circleId } = route.params; // Retrieve the circleId from the route parameters
  const [taskName, setTaskName] = useState(""); // State to store the task name
  const [points, setPoints] = useState(""); // State to store the difficulty points
  const [deadline, setDeadline] = useState(null); // State to store the task deadline
  const [showDatePicker, setShowDatePicker] = useState(false); // State to control the visibility of the date picker
  const navigation = useNavigation(); // Hook to enable navigation actions

  // Function to handle adding a task
  const handleAddTask = async () => {
    // Ensure task name and points are provided
    if (!taskName || !points) {
      Alert.alert("Task name and points are required!");
      return;
    }

    try {
      const user = auth.currentUser; // Get the current authenticated user

      // Reference to the subcollection "Tasks" within the specific circle
      const tasksRef = collection(db, "Circles", circleId, "Tasks");

      // Create a task object with necessary fields
      const taskData = {
        taskName, // Name of the task
        points: Number(points), // Difficulty points, converted to a number
        assignedUserId: user?.displayName || user?.email, // User assigning the task
        completedAt: null, // Initially not completed
        completed: false, // Task completion status
        deadline: deadline, // Task deadline (optional)
      };

      // Add the task to the Firestore subcollection
      await addDoc(tasksRef, taskData);

      // Notify the user of success
      Alert.alert("Task added successfully!");
      navigation.goBack(); // Navigate back to the previous page
    } catch (error) {
      // Notify the user in case of an error
      Alert.alert("Error adding task", error.message);
    }
  };

  // Show the date picker modal for selecting the deadline
  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  // Handle date selection from the date picker
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false); // Hide the date picker
    if (selectedDate) {
      setDeadline(selectedDate); // Update the deadline state
    }
  };

  return (
    <View style={styles.container}>
      {/* Form container */}
      <View style={styles.formContainer}>
        {/* Task Name Input */}
        <Text style={styles.label}>Task</Text>
        <TextInput
          placeholder="Enter task name"
          value={taskName}
          onChangeText={setTaskName}
          style={styles.input}
        />

        {/* Difficulty Points Input */}
        <Text style={styles.label}>Difficulty</Text>
        <TextInput
          placeholder="Enter difficulty points"
          value={points}
          onChangeText={(value) => setPoints(value.replace(/[^0-9]/g, ""))} // Allow only numeric input
          keyboardType="numeric"
          style={styles.input}
        />

        {/* Deadline Selector */}
        <TouchableOpacity
          onPress={showDatePickerModal}
          style={[styles.actionButton, styles.enabled]}
        >
          <Text style={styles.actionButtonText}>
            {deadline ? `Deadline: ${deadline.toLocaleDateString()}` : "Select Deadline"}
          </Text>
        </TouchableOpacity>

        {/* Show Date Picker if required */}
        {showDatePicker && (
          <DateTimePicker
            value={deadline || new Date()} // Default to current date if no deadline is set
            mode="date" // Set to date selection mode
            display="default" // Display style of the picker
            onChange={handleDateChange} // Handle selected date
          />
        )}

        {/* Add Task Button */}
        <Button
          title="Add Task"
          onPress={handleAddTask} // Trigger the task addition function
          disabled={!taskName || !points} // Disable button if task name or points are missing
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff", // White background color for the container
  },
  formContainer: {
    justifyContent: "flex-start",
    flexGrow: 1,
    marginTop: 50, // Space from the top
  },
  label: {
    fontSize: 16,
    fontWeight: "bold", // Bold font for labels
    marginBottom: 8, // Space below each label
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#E3EAF4", // Light border color
    backgroundColor: "#F9FCFF", // Light background color
    borderRadius: 5, // Rounded corners
    paddingHorizontal: 10,
    marginBottom: 20, // Space below each input field
  },
  button: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007BFF", // Blue background
    borderRadius: 5, // Rounded corners
    marginBottom: 20, // Space below the button
  },
  buttonText: {
    color: "#fff", // White text color
    fontSize: 16,
  },
  actionButton: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25, // Circular button
    marginBottom: 15, // Space below the button
  },
  enabled: {
    backgroundColor: "#95C0D7", // Active button color
  },
  disabled: {
    backgroundColor: "#D6E0F0", // Disabled button color
  },
  actionButtonText: {
    color: "#fff", // White text
    fontSize: 16,
    fontWeight: "bold", // Bold font for button text
  },
});
