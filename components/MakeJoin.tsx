import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

// Icon component for reusability
const Icon = ({ source }) => (
    <Image source={source} style={styles.icon} />
);

// Button component with dynamic styling and text
const CircleButton = ({ buttonText, buttonStyle, onPress }) => (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
        <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
);

const CircleOptionsScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.frame}>
                {/* Container for Make a Circle */}
                <View style={styles.iconButtonContainer}>
                    <Icon source={require('../assets/images/pencil-icon.png')} />
                    <CircleButton
                        buttonText="Make a Circle"
                        buttonStyle={styles.makeButton}
                    />
                </View>
                {/* Container for Join a Circle */}
                <View style={styles.iconButtonContainer}>
                    <Icon source={require('../assets/images/Users-icon.png')} />
                    <CircleButton
                        buttonText="Join a Circle"
                        buttonStyle={styles.joinButton}
                    />
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
        backgroundColor: '#C4DDEB66',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconButtonContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    button: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#95C0D7',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        width: 300,  // Specify width to control button size
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop: 10,  // Space between icon and button
    },
    makeButton: {
        backgroundColor: '#95C0D7',
    },
    joinButton: {
        backgroundColor: '#95C0D7',
    },
    icon: {
        width: 40,
        height: 40,
        marginBottom: -3,  // Space between icon and button
    },
    buttonText: {
        fontSize: 18,
        color: '#FFFFFF',
    }
});

export default CircleOptionsScreen;
