import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Alert,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { db, auth, functions } from "@/firebase";
import {
  collection,
  doc,
  updateDoc,
  arrayUnion,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { httpsCallable } from "firebase/functions";

export default function AddMembersPage({ route, navigation }) {
  // Destructure the circleName parameter passed from the previous screen
  const { circleName } = route.params;

  // State variables
  const [email, setEmail] = useState(""); // For storing the email entered in the input field
  const [invitedMembers, setInvitedMembers] = useState([]); // List of already invited members
  const user = auth.currentUser; // Get the currently authenticated user

  useEffect(() => {
    // Fetch the list of invited members from the Firestore database
    const fetchInvitedMembers = async () => {
      try {
        const circlesRef = collection(db, "Circles"); // Reference to the "Circles" collection
        const q = query(circlesRef, where("circleName", "==", circleName)); // Query to find the circle by its name
        const querySnapshot = await getDocs(q); // Execute the query

        if (!querySnapshot.empty) {
          // If the circle exists
          const circleDoc = querySnapshot.docs[0]; // Get the first (and only) document
          const circleData = circleDoc.data(); // Extract its data
          setInvitedMembers(circleData.invitedMembers || []); // Set the invited members
        } else {
          Alert.alert("Error", "Circle not found"); // Alert if the circle does not exist
        }
      } catch (error) {
        Alert.alert("Error fetching invited members", error.message); // Handle errors
      }
    };

    fetchInvitedMembers();
  }, [circleName]); // Re-run the effect if circleName changes

  const handleSendInvitation = async () => {
    if (!email) {
      Alert.alert("Please enter an email address"); // Check if an email is entered
      return;
    }

    try {
      const circlesRef = collection(db, "Circles"); // Reference to the "Circles" collection
      const q = query(circlesRef, where("circleName", "==", circleName)); // Query to find the circle by its name
      const querySnapshot = await getDocs(q); // Execute the query

      if (querySnapshot.empty) {
        Alert.alert("Error", "Circle not found"); // Alert if the circle does not exist
        return;
      }

      const circleDoc = querySnapshot.docs[0]; // Get the circle document
      const circleId = circleDoc.id; // Extract the document ID
      const circleRef = doc(db, "Circles", circleId); // Reference to the specific circle document

      const circleData = circleDoc.data(); // Extract the circle data
      const alreadyInvited = circleData.invitedMembers?.some(
        (member) => member.email === email // Check if the email is already invited
      );

      if (alreadyInvited) {
        Alert.alert(
          "Member Already Invited",
          `${email} has already been invited.` // Alert if the member is already invited
        );
        return;
      }

      const newMember = { email, invitedAt: new Date() }; // Create a new member object
      await updateDoc(circleRef, {
        invitedMembers: arrayUnion(newMember), // Add the new member to the invitedMembers array
      });

      // Call the Firebase Cloud Function to send an email invitation
      const sendMail = httpsCallable(functions, "sendMail");
      await sendMail({
        recipientEmail: email,
        subject: `Join the Circle!`,
        text: `You have been invited to join the circle ${circleName} by ${
          user?.displayName || user?.email
        }! Download the app and join the Circle now!`,
      });

      setInvitedMembers((prev) => [...prev, newMember]); // Update the state to reflect the new member
      setEmail(""); // Clear the input field
      Alert.alert(`Invitation sent to ${email}!`); // Notify the user
    } catch (error) {
      Alert.alert(`Invitation sent to ${email}!`); // Notify the user of errors
    }
  };

  const handleDone = () => {
    // Reset the navigation stack and navigate to the MakeJoinViewPage
    navigation.reset({
      index: 0,
      routes: [{ name: "MakeJoinViewPage" }],
    });
  };

  return (
    <View style={styles.container}>
      {/* Invite Members Input Section */}
      <View style={styles.card}>
        <Text style={styles.title}>Invite Members</Text>
        <TextInput
          placeholder="Enter email address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />
        <TouchableOpacity
          style={[
            styles.button,
            email ? styles.buttonActive : styles.buttonDisabled,
          ]}
          onPress={handleSendInvitation}
          disabled={!email} // Disable button if email is empty
        >
          <Text style={styles.buttonText}>Send Invitation</Text>
        </TouchableOpacity>
      </View>

      {/* Invited Members List Section */}
      <View style={styles.card}>
        <Text style={styles.subtitle}>Invited Members:</Text>
        <FlatList
          data={invitedMembers} // List of invited members
          keyExtractor={(item, index) => index.toString()} // Use index as key
          renderItem={({ item }) => (
            <View style={styles.memberContainer}>
              <Text style={styles.memberText}>{item.email}</Text>
              <Text style={styles.dateText}>
                Invited At:{" "}
                {item.invitedAt?.toDate
                  ? item.invitedAt.toDate().toLocaleString() // Format date if available
                  : "Unknown"}
              </Text>
            </View>
          )}
        />
      </View>

      {/* Done Button */}
      <TouchableOpacity
        style={[styles.button, styles.buttonActive]}
        onPress={handleDone}
      >
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    top: 0,
    backgroundColor: "#C4DDEB66",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  input: {
    height: 50,
    backgroundColor: "#C4DDEB4D",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  button: {
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonActive: {
    backgroundColor: "#95C0D7",
  },
  buttonDisabled: {
    backgroundColor: "#D3D3D3",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  memberContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#CCC",
    paddingVertical: 10,
  },
  memberText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 14,
    color: "#777",
  },
});
