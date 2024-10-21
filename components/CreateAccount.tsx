import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';

const GetStartedScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.frame}>
                {/* Rectangle Image positioned at the top of the frame but below the inner frame */}
                <View style={styles.rectangleContainer}>
                <Image
                    source={require('../assets/images/Rectangle.png')}
                    style={styles.rectangle}
                    
                />
                <Text style={styles.rectangleText}>Get Started</Text>
                </View>
                {/* Nested Frame for all form elements */}
                <View style={styles.innerFrame}>
                    <TouchableOpacity style={styles.googleButton}>
                        <Image source={require('../assets/images/google-icon.png')} style={styles.icon} />
                        <Text style={styles.buttonText}>Continue with Google</Text>
                    </TouchableOpacity>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Full Name</Text>
                        <TextInput style={styles.input} placeholder="Text field data" placeholderTextColor="#A6A6A6" />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput style={styles.input} placeholder="Text field data" placeholderTextColor="#A6A6A6" />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Username</Text>
                        <TextInput style={styles.input} placeholder="Text field data" placeholderTextColor="#A6A6A6" />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput style={styles.input} placeholder="Text field data" secureTextEntry={true} placeholderTextColor="#A6A6A6" />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Confirm Password</Text>
                        <TextInput style={styles.input} placeholder="Text field data" secureTextEntry={true} placeholderTextColor="#A6A6A6" />
                    </View>
                    <TouchableOpacity style={styles.createAccountButton}>
                        <Text style={styles.createAccountButtonText}>Create Account</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
    frame: {
        width: 440,
        height: 956,
        position: 'absolute',
        top: -108,
        left: 179,
        backgroundColor: '#C4DDEB',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    rectangleContainer: {
        width: 440,
        height: 254,
        position: 'absolute',
        top: 0, // Adjusted to be within the top boundary of the frame
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        opacity: 1,

    },
    rectangleText: {
        position: 'absolute',
        color: '#FFFFFF',
        fontSize: 40,
        // fontWeight: 'bold',
        top: 101,
        left: 43,
        width: 353,
        height: 70,
    },
    rectangle: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    innerFrame: {
        width: 368,
        height: 629,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderWidth: 1,
        opacity: 1,
        padding: 20,
        marginTop: 50, // Added margin top to push it below the rectangle
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 20,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#D3D3D3',
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    buttonText: {
        fontSize: 16,
        color: '#000',
    },
    inputContainer: {
        width: '100%',
        marginBottom: 10,
        
    },
    label: {
        alignSelf: 'flex-start',
        color: '#000',
        fontSize: 16,
        marginBottom: 5,
        // backgroundColor: '#C4DDEB4D'
    },
    input: {
        height: 40,
        backgroundColor: '#FFF',
        paddingHorizontal: 10,
        width: '100%',
        borderRadius: 5,
        // borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#C4DDEB4D'
    },
    createAccountButton: {
        // width: '100%',
        padding: 10,
        // backgroundColor: '#FFF',
        // alignItems: 'center',
        // justifyContent: 'center',
        // borderRadius: 15,
        // marginTop: 20,

        position: 'absolute',
        width: 300,
        height: 45,
        backgroundColor: '#95C0D7',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        top: 535,
        left: 35,
        elevation: 4, // Shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    createAccountButtonText: {
        color: '#FFF',
        fontSize: 16,
    }
});

export default GetStartedScreen;
