import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';


import Card from '../components/Card';
import Input from '../components/Input';
import Colors from '../constants/colors';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

const StartGameScreen = props => {
    const [enteredInput, setInputText] = useState('');
    const [confirmState, setConfirmState] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    const onChangeHandler = (enteredValue) => {
        setInputText(enteredValue.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () => {
        setInputText('');
        setConfirmState(false);
    };

    const confirmInputHander = () => {
        const chosenNumber = parseInt(enteredInput);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert("The number is invalid", "Number has to be between 1 and 99.", [{ text: "Okay", style: "cancel", onPress: resetInputHandler }]);
            return;
        }
        setConfirmState(true);
        setInputText('');
        setSelectedNumber(chosenNumber);
        Keyboard.dismiss();
    };
    let confirmedOutput;
    if (confirmState) {
        confirmedOutput = (<Card style={styles.confirmSummaryBox}>
            <BodyText>You selected:</BodyText>
            <NumberContainer style={styles.theNumber}>{selectedNumber}</NumberContainer>
            <MainButton onPress={() => props.onStartGame(selectedNumber)}>START GAME</MainButton>
        </Card>);
    }

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
            <View style={styles.screen}>
                <Text style={styles.fancyTitle}>Start a new game !</Text>
                <Card style={styles.inputContainer}>
                    <BodyText>
                        Select a number
            </BodyText>
                    <Input placeholder="?" value={enteredInput} onChangeText={onChangeHandler} style={styles.input} blurOnSubmit autoCapitalize="none" autoCorrect={false} keyboardType="number-pad" maxLength={2} />
                    <View style={styles.alignButtons}>
                        <View style={styles.button}><Button title="Reset" onPress={resetInputHandler} color={Colors.primary} /></View>
                        <View style={styles.button}><Button title="Confirm" onPress={confirmInputHander} color={Colors.secondary} /></View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>

    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",
        justifyContent: "flex-start"
    },
    inputContainer: {
        width: 300,
        maxWidth: "80%",
        alignItems: "center"
    },
    input: {
        width: 50,
        textAlign: "center"
    },
    alignButtons: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 15
    },
    button: {
        width: "45%",
        textAlign: "center"
    },
    fancyTitle: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },
    confirmSummaryBox: {

        marginTop: 20,
        fontSize: 16,
        padding: 35,
        alignItems: "center",
        justifyContent: "center"
    },
    theNumber: {
        color: Colors.primary,
        borderColor: Colors.primary,

    }
});

export default StartGameScreen;