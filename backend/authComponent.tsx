import { auth } from '@/firebase';  // Import the Firestore instance
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

export default function AuthComponent() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('');
  
    // Sign up a new user
    const handleSignUp = async () => {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        setUser(userCredential.user);
        setMessage('User created successfully!');
      } catch (error) {
        setMessage(`Sign-up error: ${error.message}`);
      }
    };
  
    // Sign in an existing user
    const handleSignIn = async () => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        setUser(userCredential.user);
        setMessage('Signed in successfully!');
      } catch (error) {
        setMessage(`Sign-in error: ${error.message}`);
      }
    };
  
    // Sign out the current user
    const handleSignOut = async () => {
      try {
        await signOut(auth);
        setUser(null);
        setMessage('Signed out successfully!');
      } catch (error) {
        setMessage(`Sign-out error: ${error.message}`);
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
  
        {user ? (
          <View>
            <Text>Welcome, {user.email}</Text>
            <Button title="Sign Out" onPress={handleSignOut} />
          </View>
        ) : (
          <View>
            <Button title="Sign Up" onPress={handleSignUp} />
            <Button title="Sign In" onPress={handleSignIn} />
          </View>
        )}
  
        {message ? <Text>{message}</Text> : null}
      </View>
    );
  }

  