import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { auth } from '@/firebase'; // Import Firebase authentication
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'; // Firebase authentication methods
import { useNavigation } from '@react-navigation/native'; // Navigation hook

export default function LoginScreen() {
    // State variables for user input
    const [email, setEmail] = useState(''); // Stores the user's email
    const [password, setPassword] = useState(''); // Stores the user's password
    const navigation = useNavigation(); // Navigation object for routing

    // Handle login with email and password
    const handleLogin = async () => {
        try {
            // Sign in using Firebase authentication
            await signInWithEmailAndPassword(auth, email, password);
            Alert.alert('Login Successful!'); // Notify the user of success
            navigation.navigate('MakeJoinViewPage'); // Navigate to the next screen
        } catch (error) {
            Alert.alert('Login Failed', error.message); // Notify the user of failure
        }
    };

    // Handle Google Sign-In
    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider(); // Create a new Google provider instance
        try {
            // Sign in using a popup with Google provider
            await signInWithPopup(auth, provider);
            Alert.alert('Login Successful with Google!'); // Notify the user of success
            navigation.navigate('MakeJoinViewPage'); // Navigate to the next screen
        } catch (error) {
            Alert.alert('Google Sign-In Failed', error.message); // Notify the user of failure
        }
    };

    return (
        <View style={styles.container}>
            {/* Main Frame */}
            <View style={styles.frame}>
                {/* Large Circle with "Rush" text */}
                <View style={styles.largeCircleContainer}>
                    <Image
                        source={require('../assets/images/Ellipse1.png')} // Large circle image
                        style={styles.largeCircle}
                    />
                    <Text style={styles.circleTextLarge}>Rush</Text>
                </View>

                {/* Small Circle with "Circle" text */}
                <View style={styles.smallCircleContainer}>
                    <Image
                        source={require('../assets/images/Ellipse2.png')} // Small circle image
                        style={styles.smallCircle}
                    />
                    <Text style={styles.circleTextSmall}>Circle</Text>
                </View>

                {/* Google Sign-In Button */}
                <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
                    <View style={styles.buttonContent}>
                        <Image
                            source={require('../assets/images/google-icon.png')} // Google icon image
                            style={styles.googleIcon}
                        />
                        <Text style={styles.buttonText}>Sign in with Google</Text>
                    </View>
                </TouchableOpacity>

                {/* Email Input */}
                <View style={[styles.inputContainer, { top: 500 }]}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.inputEmail}
                        placeholder="Enter your email" // Placeholder text
                        placeholderTextColor="#A6A6A6" // Light gray color
                        value={email} // Bind to state
                        onChangeText={setEmail} // Update state on text change
                    />
                </View>

                {/* Password Input */}
                <View style={[styles.inputContainer, { top: 570 }]}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.inputPassword}
                        placeholder="Enter your password" // Placeholder text
                        placeholderTextColor="#A6A6A6" // Light gray color
                        secureTextEntry={true} // Hide input for security
                        value={password} // Bind to state
                        onChangeText={setPassword} // Update state on text change
                    />
                </View>

                {/* Login Button */}
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>Log In</Text>
                </TouchableOpacity>

                {/* Signup Redirect */}
                <Text style={styles.signupText}>
                    Don’t have an account?
                    <Text
                        style={styles.hyperlink}
                        onPress={() => navigation.navigate('SignupScreen')} // Navigate to the signup screen
                    >
                        {' '}
                        Create one.
                    </Text>
                </Text>
            </View>
        </View>
    );
}

// Styles for the LoginScreen
const styles = StyleSheet.create({
    container: {
        flex: 1, // Use entire screen space
        alignItems: 'center', // Center horizontally
        justifyContent: 'center', // Center vertically
        backgroundColor: '#fff', // White background
    },
    frame: {
        width: 455, // Frame width
        height: 856, // Frame height
        position: 'absolute',
        top: 50, // Adjust the frame vertically
        left: 0,
        backgroundColor: '#FFFFFF', // White background
        alignItems: 'center', // Center content horizontally
        justifyContent: 'center', // Center content vertically
        borderRadius: 4, // Rounded corners
    },
    largeCircleContainer: {
        position: 'absolute',
        top: 50, // Vertical position
        left: 80, // Horizontal position
        width: 350, // Container width
        height: 350, // Container height
        alignItems: 'center', // Center content horizontally
        justifyContent: 'center', // Center content vertically
    },
    largeCircle: {
        width: '100%', // Full width
        height: '100%', // Full height
        resizeMode: 'contain', // Maintain aspect ratio
    },
    smallCircleContainer: {
        position: 'absolute',
        top: 10, // Vertical position
        left: 20, // Horizontal position
        width: 230, // Container width
        height: 230, // Container height
        alignItems: 'center', // Center content horizontally
        justifyContent: 'center', // Center content vertically
    },
    smallCircle: {
        width: '100%', // Full width
        height: '100%', // Full height
        resizeMode: 'contain', // Maintain aspect ratio
    },
    circleTextLarge: {
        position: 'absolute',
        color: '#FFFFFF', // White text
        fontSize: 45, // Large font size
        fontWeight: 'bold', // Bold text
        top: 200, // Vertical position
        left: 140, // Horizontal position
    },
    circleTextSmall: {
        position: 'absolute',
        color: '#FFFFFF', // White text
        fontSize: 45, // Large font size
        fontWeight: 'bold', // Bold text
    },
    googleButton: {
        position: 'absolute',
        width: 300, // Button width
        height: 45, // Button height
        backgroundColor: '#FFFFFF', // White background
        borderRadius: 9999, // Fully rounded corners
        justifyContent: 'center', // Center text vertically
        alignItems: 'center', // Center text horizontally
        top: 430, // Vertical position
        left: 45, // Horizontal position
        borderWidth: 2, // Border width
        borderColor: '#E2E8F0', // Light gray border
    },
    buttonContent: {
        flexDirection: 'row', // Arrange content horizontally
        alignItems: 'center', // Center content vertically
    },
    googleIcon: {
        width: 24, // Icon width
        height: 24, // Icon height
        marginRight: 10, // Space between icon and text
    },
    buttonText: {
        fontSize: 16, // Text size
        color: '#000', // Black text color
    },
    inputContainer: {
        position: 'absolute',
        width: 300, // Container width
        left: 45, // Horizontal position
    },
    label: {
        color: '#000', // Black text color
        fontSize: 16, // Label font size
        marginBottom: 5, // Space below label
    },
    inputEmail: {
        height: 35, // Input height
        backgroundColor: '#C4DDEB4D', // Light blue background
        borderRadius: 4, // Rounded corners
        padding: 10, // Padding inside input
    },
    inputPassword: {
        height: 35, // Input height
        backgroundColor: '#C4DDEB4D', // Light blue background
        borderRadius: 4, // Rounded corners
        padding: 10, // Padding inside input
        secureTextEntry: true, // Hide text for passwords
    },
    loginButton: {
        position: 'absolute',
        width: 300, // Button width
        height: 45, // Button height
        backgroundColor: '#95C0D7', // Blue background
        justifyContent: 'center', // Center text vertically
        alignItems: 'center', // Center text horizontally
        borderRadius: 15, // Rounded corners
        top: 650, // Vertical position
        left: 45, // Horizontal position
        elevation: 4, // Shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 }, // Shadow offset
        shadowOpacity: 0.25, // Shadow opacity
        shadowRadius: 3.84, // Shadow blur
    },
    loginButtonText: {
        color: '#FFFFFF', // White text
        fontSize: 16, // Text size
    },
    signupText: {
        position: 'absolute',
        top: 710, // Vertical position
        left: 65, // Horizontal position
        fontSize: 16, // Font size
        color: '#000', // Black text color
    },
    hyperlink: {
        color: '#428CF4', // Blue text color
        textDecorationLine: 'underline', // Underline text
    },
});
