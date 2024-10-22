import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { createCircle } from '@/backend/circles';  // Import your Firebase function

export default function CreateCircleScreen() {
  const [circleName, setCircleName] = useState('');
  const [circleGoal, setCircleGoal] = useState('');
  const [message, setMessage] = useState('');

  // Handle creating a circle
  const handleCreateCircle = async () => {
    if (!circleName || !circleGoal) {
      setMessage('Please enter both a name and a goal.');
      return;
    }

    try {
      await createCircle(circleName, circleGoal);
      setMessage('Circle created successfully!');
      setCircleName('');  // Clear the input field
      setCircleGoal('');  // Clear the input field
    } catch (error) {
      setMessage(`Error creating circle: ${error.message}`);
    }
  };

  return (
    <View>
      <TextInput
        value={circleName}
        onChangeText={setCircleName}
        placeholder="Circle name"
      />
      <TextInput
        value={circleGoal}
        onChangeText={setCircleGoal}
        placeholder="Circle goal"
      />
      <Button title="Create Circle" onPress={handleCreateCircle} />
      {message ? <Text>{message}</Text> : null}
    </View>
  );
}
