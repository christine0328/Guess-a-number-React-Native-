import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import Colors from '../constants/colors';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';



const guessRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const guessedNumber = Math.floor(Math.random() * (max - min) + min);
    if (guessedNumber === exclude) {
        guessRandomBetween(min, max, exclude);
    }
    else {
        return guessedNumber;
    }

}

const renderListItem = (listLength, itemData) => (
    <View style={styles.listItem}>
        <BodyText># {listLength - itemData.index}</BodyText>
        <BodyText>{itemData.item}</BodyText>
    </View>);

const GameScreen = props => {
    const initialGuess = guessRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(
        initialGuess
    );
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    const currentHigh = useRef(100);
    const currentLow = useRef(1);

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < props.userChoice) ||
            (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert("Don't lie :)", "You know this is wrong...", [{ text: "Sorry!", style: 'cancel' }]);
            return;
        }

        if (direction == 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = guessRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        // setRounds(currentRounds => currentRounds + 1);
        setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses]);
    }
    return (
        <View style={styles.screen}><Text>Opponent's Guess:</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')} >
                    <Ionicons name='md-remove' size={24} color='white' />
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')} >
                    <Ionicons name='md-add' size={24} color='white' />
                </MainButton>
            </Card>
            <View style={styles.listContainer}>
                {/* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView> */}
                <FlatList
                    keyExtarctor={(item) => item}
                    data={pastGuesses}
                    renderItem={renderListItem.bind(this, pastGuesses.length)}
                    contentContainerStyle={styles.list} />
            </View>
        </View>
    );

};

const styles = StyleSheet.create(
    {
        screen: {
            flex: 1,
            padding: 10,
            alignItems: "center"
        },
        buttonContainer: {
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            marginTop: 20,
            width: 400,
            maxWidth: "95%",
        },
        listItem: {
            borderColor: '#ccc',
            borderWidth: 0.5,
            padding: 15,
            marginVertical: 10,
            backgroundColor: 'white',
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '60%'

        },
        listContainer: {
            width: '80%',
            flex: 1
        },
        list: {
            flexGrow: 1,
            justifyContent: 'flex-end'
        }


    }
);

export default GameScreen;