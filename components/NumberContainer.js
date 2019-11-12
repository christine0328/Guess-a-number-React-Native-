import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Colors from '../constants/colors';

const NumberContainer = props => {

    return (<View style={{ ...styles.numberContainer, ...props.style }}>
        <Text>{props.children}</Text>
    </View>);
};

const styles = StyleSheet.create(


    {
        numberContainer: {
            borderWidth: 0.5,
            padding: 20,
            fontSize: 20,
            marginVertical: 20,
            borderRadius: 6,

        }
    }
);

export default NumberContainer;
