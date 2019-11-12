import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = (props) => {
    return (<View style={{ ...styles.card, ...props.style }}>
        {props.children}
    </View>);
};

const styles = StyleSheet.create({
    card: {
        width: 300,
        maxWidth: "80%",
        alignItems: "center",
        shadowColor: "#000000",
        shadowOpacity: 0.26,
        textShadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        backgroundColor: "white",
        elevation: 5,
        padding: 20,
        borderRadius: 8,
    }
});

export default Card;