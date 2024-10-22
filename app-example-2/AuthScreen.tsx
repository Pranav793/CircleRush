import React from 'react';
import { View } from 'react-native';
import AuthComponent from '@/backend/AuthComponent2';  // Adjust the path as necessary

export default function AuthScreen({ navigation }) {
  return (
    <View>
      {/* Pass the navigation prop to the AuthComponent */}
      <AuthComponent navigation={navigation} />
    </View>
  );
}
