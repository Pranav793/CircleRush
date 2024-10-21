import React, { useEffect, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';  // Import the Firestore instance
import { Button } from 'react-native';
import { getAllCircles, createCircle } from '@/backend/circles';

export default function App() {
  const [circleName, setCircleName] = useState('');
  const [dummyCircleName, setdummyCircleName] = useState('');
  const [dummyCircleGoal, setdummyCircleGoal] = useState('');
  const [circles, setCircles] = useState([]);
  const [message, setMessage] = useState('');

  async function fetchCircles() {
    const circlesData = await getAllCircles();
    setCircles(circlesData); // Update the state with the retrieved documents
  }

  async function handleCreateCircle() {
    if (dummyCircleName && dummyCircleGoal) {
      try {
        await createCircle(dummyCircleName, dummyCircleGoal);
        setMessage('Circle created successfully!');
        setdummyCircleName('');  // Clear the input field
        setdummyCircleGoal('');  // Clear the input field
        fetchCircles();  // Refresh the list of circles
      } catch (error) {
        setMessage('Error creating circle: ' + error.message);
      }
    } else {
      setMessage('Please enter both a circle name and goal.');
    }
  }


  // useEffect(() => {
  //   const fetchCircleName = async () => {
  //     try {
  //       // Reference the document in the "Circles" collection by its ID
  //       // console.log(db);
  //       const docRef = doc(db, 'Circles', 'mdYW7syRmeLnYuR47nO7');
  //       // console.log(docRef);
  //       // console.log(docRef);
  //       console.log("bruh");
  //       const docSnap = await getDoc(docRef);
  //       console.log("getting the data:");
  //       console.log(docSnap);

  //       // Check if the document exists and fetch the "name" field
  //       if (docSnap.exists()) {
  //         const data = docSnap.data();
  //         setCircleName(data.name);  // Assuming the document has a "name" field
  //       } else {
  //         console.log('No such document!');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching document: ', error);
  //     }
  //   };

  //   fetchCircleName();
  // }, []);

  // return (
  //   <View>
  //     <TextInput value={dummyCircleName} onChangeText={setdummyCircleName} placeholder='Circle name'/>
  //     <TextInput value={dummyCircleGoal} onChangeText={setdummyCircleGoal} placeholder='Circle goal'/>
  //     <Button title='Get goals' onPress={() => getAllCircles()}/>
  //     {/* {circleName ? <Text>{circleName}</Text> : <Text>Loading...</Text>} */}
  //   </View>
  // );

  return (
    <View>
      <TextInput
        value={dummyCircleName}
        onChangeText={setdummyCircleName}
        placeholder='Circle name'
      />
      <TextInput
        value={dummyCircleGoal}
        onChangeText={setdummyCircleGoal}
        placeholder='Circle goal'
      />
      <Button title='Create Circle' onPress={handleCreateCircle} />

      {/* Display any success or error message */}
      {message ? <Text>{message}</Text> : null}

      <Button title='Get Circles' onPress={fetchCircles} />

      {/* Display the retrieved circles */}
      {circles.length > 0 ? (
        circles.map((circle) => (
          <Text key={circle.id}>
            {circle.name} - {circle.goal}
          </Text>
        ))
      ) : (
        <Text>No circles found.</Text>
      )}
    </View>
  );
}


  // return (
  //   <View>
  //     <TextInput value={dummyCircleName} onChangeText={setdummyCircleName} placeholder='Circle name'/>
  //     <TextInput value={dummyCircleGoal} onChangeText={setdummyCircleGoal} placeholder='Circle goal'/>
  //     <Button title='Get goals' onPress={fetchCircles} />
  //     {/* Display the retrieved circles */}
  //     {circles.length > 0 ? circles.map(circle => (
  //       <Text key={circle.id}>{circle.name} - {circle.goal}</Text>
  //     )) : <Text>No circles found.</Text>}
  //   </View>
  // );
// }
