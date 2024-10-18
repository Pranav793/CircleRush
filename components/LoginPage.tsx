import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';

const LoginScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.frame}>
                <View style={styles.largeCircleContainer}>
                    <Image
                        source={require('../assets/images/Ellipse1.png')}
                        style={styles.largeCircle}
                    />
                    <Text style={styles.circleTextLarge}>Rush</Text>
                </View>
                <View style={styles.smallCircleContainer}>
                    <Image
                        source={require('../assets/images/Ellipse2.png')}
                        style={styles.smallCircle}
                    />
                    <Text style={styles.circleTextSmall}>Circle</Text>
                </View>
                <TouchableOpacity style={styles.googleButton}>
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
                        placeholderTextColor="#A6A6A6"
                    />
                </View>
                <View style={[styles.inputContainer, {top: 660}]}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.inputPassword}
                        placeholder="Text field data"
                        placeholderTextColor="#A6A6A6"
                        secureTextEntry
                    />
                </View>
                <TouchableOpacity style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>Log In</Text>
                </TouchableOpacity>
                <Text style={styles.signupText}>Don’t have an account? <Text style={styles.hyperlink}>Create one.</Text></Text>
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
        top: 0,
        left: 0,
        opacity: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 4,
    },
    largeCircleContainer: {
        position: 'absolute',
        top: 100,
        left: 80,
        width: 400,
        height: 400,
        alignItems: 'center',
        justifyContent: 'center',
    },
    largeCircle: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    smallCircleContainer: {
        position: 'absolute',
        top: 50,
        left: 20,
        width: 260,
        height: 260,
        alignItems: 'center',
        justifyContent: 'center',
    },
    smallCircle: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    circleTextLarge: {
        position: 'absolute',
        color: '#FFFFFF',
        fontSize: 55,
        fontWeight: 'bold',
        top: 220,
        left: 150,
    },
    circleTextSmall: {
        position: 'absolute',
        color: '#FFFFFF',
        fontSize: 55,
        fontWeight: 'bold',
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
        borderWidth: 2,
        borderColor: '#E2E8F0',
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    googleIcon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    buttonText: {
        fontSize: 16,
        color: '#000',
    },
    inputContainer: {
        position: 'absolute',
        width: 300,
        left: 79,
    },
    label: {
        color: '#000',
        fontSize: 16,
        marginBottom: 5,
    },
    inputEmail: {
        height: 30,
        backgroundColor: '#C4DDEB4D',
        borderRadius: 4,
        padding: 10,
    },
    inputPassword: {
        height: 30,
        backgroundColor: '#C4DDEB4D',
        borderRadius: 4,
        padding: 10,
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
        left: 79,
        elevation: 4, // Shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    signupText: {
        position: 'absolute',
        top: 790,
        left: 90,
        fontSize: 16,
        color: '#000',
    },
    hyperlink: {
        color: '#428CF4',
        textDecorationLine: 'underline',
    }
});

export default LoginScreen;
