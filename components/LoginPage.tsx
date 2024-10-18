import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image  } from 'react-native';

const LoginScreen = () => {
    return (
            <View style={styles.container}>
            <View style={styles.frame}>
                {/* Replace largeCircle with an Image */}
                <Image
                    source={require('../assets/images/Ellipse1.png')}
                    style={styles.largeCircle}
                />
                {/* Replace smallCircle with an Image */}
                <Image
                    source={require('../assets/images/Ellipse2.png')}
                    style={styles.smallCircle}
                />
                <TouchableOpacity style={styles.googleButton}>
                    {/* Image and Text inside the button */}
                    <View style={styles.buttonContent}>
                        <Image
                            source={require('../assets/images/google-icon.png')}
                            style={styles.googleIcon}
                        />
                        <Text style={styles.buttonText}>Sign in with Google</Text>
                    </View>
                </TouchableOpacity>
                <View style={[styles.inputContainer, {top: 600}]}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.inputEmail}
                        placeholder="Text field data"
                    />
                </View>
                <View style={[styles.inputContainer, {top: 660}]}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.inputPassword}
                        placeholder="Text field data"
                        secureTextEntry
                    />
                </View>
                <TouchableOpacity style={styles.loginButton}>
                    <Text>Log In</Text>
                </TouchableOpacity>
                <Text style={styles.signupText}>Don’t have an account? Create one.</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    frame: {
        width: 455,
        height: 856,
        position: 'absolute',
        top: 50,
        left: 659,
        opacity: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#000',
        borderWidth: 1,  // Set border width
        borderRadius: 4,
    },
    largeCircle: {
      width: 400,
      height: 400,
      position: 'absolute',
      top: 100,
      left: 80,
      resizeMode: 'contain',  // Ensures the image fits well
  },
  smallCircle: {
      width: 260,
      height: 260,
      position: 'absolute',
      top: 50,
      left: 20,
      resizeMode: 'contain',  // Ensures the image fits well
  },
    googleButton: {
        position: 'absolute',
        width: 300,
        height: 45,
        backgroundColor: '#FFFFFF',
        borderRadius: 9999,
        justifyContent: 'center',
        alignItems: 'center',
        top: 540,
        opacity: 1,
        borderWidth: 2,
        borderColor: '#D3D3D3',
    },
    buttonContent: {
      flexDirection: 'row',  // Layout direction for image and text
      alignItems: 'center',  // Center items vertically
  },
  googleIcon: {
      width: 24,  // Size of the Google icon
      height: 24,
      marginRight: 10,  // Space between icon and text
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
},
    inputContainer: {
        position: 'absolute',
        width: 300,
        left: 70,
    },
    label: {
        color: '#000',
        fontSize: 16,
        marginBottom: 5,
    },
    inputEmail: {
        height: 30,
        backgroundColor: '#C4DDEB4D',  // Updated background color
        borderRadius: 4,
        padding: 10,
        borderWidth: 1,
        borderColor: '#C4DDEB',
    },
    inputPassword: {
        height: 30,
        backgroundColor: '#C4DDEB4D',  // Updated background color
        borderRadius: 4,
        padding: 10,
        borderWidth: 1,
        borderColor: '#C4DDEB',
        secureTextEntry: true,
    },
    loginButton: {
        position: 'absolute',
        width: 300,
        height: 45,
        backgroundColor: '#95C0D7',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        top: 735,
        left: 70,
        opacity: 1,
    },
    signupText: {
        position: 'absolute',
        top: 790,
        left: 90,
    }
});

export default LoginScreen;
