import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import {auth} from '@/firebase';


export default function AuthComponent({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);  // Toggle between Sign In and Sign Up
  const [message, setMessage] = useState('');

  // Handle Sign Up
  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setMessage('User created successfully!');
      // Navigate to the Create Circle screen after signing up
      navigation.navigate('CreateCircle');
    } catch (error) {
      setMessage(`Sign-up error: ${error.message}`);
    }
  };

  // Handle Sign In
  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setMessage('Signed in successfully!');
      // Navigate to the Create Circle screen after signing in
      navigation.navigate('CreateCircle');
    } catch (error) {
      setMessage(`Sign-in error: ${error.message}`);
    }
  };

  return (
    <View>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />

      {isSignUp ? (
        <Button title="Sign Up" onPress={handleSignUp} />
      ) : (
        <Button title="Sign In" onPress={handleSignIn} />
      )}

      <Button
        title={isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
        onPress={() => setIsSignUp(!isSignUp)}  // Toggle between Sign In and Sign Up
      />

      {message ? <Text>{message}</Text> : null}
    </View>
  );
}
