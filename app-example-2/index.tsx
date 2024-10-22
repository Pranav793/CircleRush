import React from 'react';
import { Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from './AuthScreen';
import CreateCircleScreen from './CreateCircleScreen';

// const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Auth">
//         {/* Auth screen */}
//         <Stack.Screen name="Auth" component={AuthScreen} />
//         {/* Create Circle screen */}
//         <Stack.Screen name="CreateCircle" component={CreateCircleScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
