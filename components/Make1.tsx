import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';

const NameCircleScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.frame}>
                {/* Image component is positioned absolutely and should not interfere with the layout of other elements */}
                <Image source={require('../assets/images/Ellipse3.png')} style={styles.topEllipse} />
                {/* Ensure other components are rendered after the Image */}
                <Text style={styles.headerText}>Name your Circle</Text>
                <TextInput style={styles.input} placeholder="Text field data" placeholderTextColor="#A6A6A6" />
                <TouchableOpacity style={styles.nextButton}>
                    <Text style={styles.nextButtonText}>Next</Text>
                </TouchableOpacity>
                <View style={styles.paginationDots}>
                    <View style={styles.dot} />
                    <View style={styles.dot} />
                    <View style={styles.dot} />
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
        backgroundColor: '#FFFFFF', // Background color of the entire screen
    },
    frame: {
        width: 435,
        height: 956,
        position: 'absolute',
        top: -108,
        left: 179,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#C4DDEB', // Optional, if you want to have a background color for the frame
    },
    topEllipse: {
        width: 435, // Takes the full width of the container
        height: 600, // Set height larger if the image still seems stretched
        position: 'absolute',
        top: 300,
        resizeMode: 'stretch', // This will cover the area without stretching the image's aspect ratio
        zIndex: 1, // Lower zIndex because it needs to be behind the text
    },
    headerText: {
        fontSize: 24,
        color: '#333',
        marginBottom: 30,
        marginTop: 320, // Adjust based on your top ellipse size
        zIndex: 2, // Higher zIndex to ensure it's above the image
    },
    input: {
        width: 200,
        height: 63,
        backgroundColor: '#C4DDEB4D',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        paddingHorizontal: 10,
        fontSize: 18,
        marginBottom: 30,
        zIndex: 2, // Higher zIndex to ensure it's above the image
    },
    nextButton: {
        backgroundColor: '#95C0D7',
        width: 300,
        padding: 15,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        zIndex: 2, // Ensure button is above the image
        elevation: 4, // Shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    nextButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
    },
    paginationDots: {
        flexDirection: 'row',
        marginTop: 20,

    },
    dot: {
        width: 10,
        height: 10,
        top: 200,
        borderRadius: 5,
        backgroundColor: '#BBB',
        marginHorizontal: 5,
    }
});

export default NameCircleScreen;
