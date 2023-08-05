import React, { useEffect, useState } from 'react';
import { Dimensions, TouchableOpacity, Image, Text, View } from 'react-native';
import { styles } from './styles';
import { Header } from '../../components';
import { generateRGB, mutateRGB } from '../../utils';

export function Game({ navigation }) {
  const [points, setPoints] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [rgb, setRgb] = useState(generateRGB());
  const [size, setSize] = useState(2);
  const [diffTileIndex, setDiffTileIndex] = useState([]);
  const [diffTileColor, setDiffTileColor] = useState();
  const [gameState, setGameState] = useState('INGAME'); // 'INGAME', 'PAUSED' and 'LOST'

  const { width } = Dimensions.get('window');

  useEffect(() => {
    generateNewRound();
    const interval = setInterval(() => {
      if (gameState === 'INGAME') {
        if (timeLeft <= 0) {
          setGameState('LOST');
        } else {
          setTimeLeft((time) => time - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const generateSizeIndex = (size) => {
    return Math.floor(Math.random() * size);
  };

  function generateNewRound() {
    const RGB = generateRGB();
    const mRGB = mutateRGB(RGB);
    const size = Math.min(Math.max(Math.floor(Math.sqrt(points)), 2), 5);

    setSize(size);
    setDiffTileIndex([generateSizeIndex(size), generateSizeIndex(size)]);
    setDiffTileColor(`rgb(${mRGB.r}, ${mRGB.g}, ${mRGB.b})`);
    setRgb(RGB);
  }

  const onTilePress = (rowIndex, columnIndex) => {
    if (rowIndex == diffTileIndex[0] && columnIndex == diffTileIndex[1]) {
      setPoints((p) => p + 1);
      setTimeLeft((time) => time + 2);
    } else {
      setTimeLeft((time) => time - 2);
    }

    generateNewRound();
  };

  const onBottomBarPress = async () => {
    switch (gameState) {
      case 'INGAME': {
        setGameState('PAUSED');
        break;
      }
      case 'PAUSED': {
        setGameState('INGAME');
        break;
      }
      case 'LOST': {
        setPoints(0);
        setTimeLeft(15);
        setSize(2);
        generateNewRound();

        setGameState('INGAME');
        break;
      }
    }
  };

  const onExitPress = () => {
    navigation.goBack();
  };

  const bottomIcon =
    gameState === 'INGAME'
      ? require('../../assets/icons/pause.png')
      : gameState === 'PAUSED'
      ? require('../../assets/icons/play.png')
      : require('../../assets/icons/replay.png');

  return (
    <View style={styles.container}>
      <Header />

      <View
        style={{
          height: width * 0.875,
          width: width * 0.875,
          flexDirection: 'row'
        }}>
        {gameState === 'INGAME' ? (
          Array(size)
            .fill()
            .map((val, columnIndex) => (
              <View
                style={{ flex: 1, flexDirection: 'column' }}
                key={columnIndex}>
                {Array(size)
                  .fill()
                  .map((val, rowIndex) => (
                    <TouchableOpacity
                      key={`${rowIndex}.${columnIndex}`}
                      style={{
                        backgroundColor:
                          rowIndex == diffTileIndex[0] &&
                          columnIndex == diffTileIndex[1]
                            ? diffTileColor
                            : `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,

                        flex: 1,
                        margin: 2
                      }}
                      onPress={() => onTilePress(rowIndex, columnIndex)}
                    />
                  ))}
              </View>
            ))
        ) : gameState === 'PAUSED' ? (
          <View style={styles.pausedContainer}>
            <Image
              source={require('../../assets/icons/mug.png')}
              style={styles.pausedIcon}
            />
            <Text style={styles.pausedText}>COVFEFE BREAK</Text>
          </View>
        ) : (
          <View style={styles.pausedContainer}>
            <Image
              source={require('../../assets/icons/dead.png')}
              style={styles.pausedIcon}
            />
            <Text style={styles.pausedText}>U DED</Text>
          </View>
        )}
      </View>

      <TouchableOpacity onPress={onExitPress}>
        <Image
          source={require('../../assets/icons/escape.png')}
          style={styles.exitIcon}
        />
      </TouchableOpacity>

      <View style={styles.bottomContainer}>
        <View style={{ flex: 1 }}>
          <Text style={styles.counterCount}>{points}</Text>
          <Text style={styles.counterLabel}>points</Text>
        </View>
        <TouchableOpacity
          style={{ alignItems: 'center' }}
          onPress={onBottomBarPress}>
          <Image source={bottomIcon} style={styles.bottomIcon} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.counterCount}>{timeLeft}</Text>
          <Text style={styles.counterLabel}>seconds left</Text>
        </View>
        <View style={styles.bestContainer}>
          <Image
            source={require('../../assets/icons/trophy.png')}
            style={styles.bestIcon}
          />
          <Text style={styles.bestLabel}>0</Text>
        </View>
      </View>
    </View>
  );
}
