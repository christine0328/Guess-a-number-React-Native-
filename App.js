import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [roundNumber, setRoundNumber] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
  if (!dataLoaded) {
    return (<AppLoading startAsync={fetchFonts} onFinish={() => setDataLoaded(true)} onError={(err) => console.log(err)} />);
  };


  const configureNewGameHandler = () => {
    setRoundNumber(0);
    setUserNumber(null);
  }
  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setRoundNumber(0);
  }

  const gameOverHandler = (numOfRounds) => {
    setRoundNumber(numOfRounds);
  }

  let content = <StartGameScreen onStartGame={startGameHandler} />;
  if (userNumber && roundNumber <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />;
  } else if (roundNumber > 0) {
    content = <GameOverScreen roundsNumber={roundNumber} userNumber={userNumber} onRestart={configureNewGameHandler} />;
  }
  // let content = (<GameOverScreen roundsNumber={1} userNumber={2} onRestart={configureNewGameHandler} />);


  return (
    <View style={styles.screen}>
      <Header title="Guess a number" />
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});



