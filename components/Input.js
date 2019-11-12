import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';


const Input = props => {
    return (
        <TextInput {...props} style={{ ...styles.input, ...props.style }} />

    );
};

const styles = StyleSheet.create({
    input: {
        height: 30,
        borderBottomColor: "black",
        borderBottomWidth: 0.5,
        marginVertical: 10
    }

});

export default Input;