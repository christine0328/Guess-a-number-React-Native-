import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import Colors from '../constants/colors';
import MainButton from '../components/MainButton';

const GameOverScreen = (props) => {
    return (<View style={styles.screen}>
        <TitleText>The game is over!</TitleText>
        <View style={styles.imageContainer}>
            <Image fadeDuration={1000}
                source={require('../assets/success.png')}
                // source={{ uri: 'https://cdn.pixabay.com/photo/2016/05/05/23/52/mountain-summit-1375015_960_720.jpg' }}
                style={styles.image} resizeMode={'cover'} />
        </View>
        <View style={styles.resultContainer}>
            <BodyText style={styles.text}>Your phone needed
                <Text style={styles.highlight}> {props.roundsNumber} </Text>
                rounds to guess the number
                 <Text style={styles.highlight}> {props.userNumber} </Text>.
            </BodyText>
        </View>
        <MainButton onPress={props.onRestart} >New Game</MainButton>
    </View>);
}

const styles = StyleSheet.create(
    {
        screen: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        },

        imageContainer: {
            borderRadius: 200,
            width: 300,
            height: 300,
            borderWidth: 3,
            borderColor: 'white',
            overflow: 'hidden',
            marginVertical: 20

        },
        image: {
            width: '100%',
            height: '100%'
        },
        resultContainer: {
            marginHorizontal: 40,
            marginBottom: 30
        },
        text: {
            textAlign: 'center'
        },
        highlight: {
            color: Colors.primary,
            fontFamily: 'open-sans-bold',
            paddingHorizontal: 10
        }
    }
);

export default GameOverScreen;