import React, { useRef, useEffect, useState } from 'react';
import {
  Dimensions,
  TouchableOpacity,
  Image,
  Text,
  View,
  Animated
} from 'react-native';
import { Audio } from 'expo-av';

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

  const tapSound = useRef();
  const tapCorrectSound = useRef();
  const tapWrongSound = useRef();
  const pauseInSound = useRef();
  const pauseOutSound = useRef();
  const loseSound = useRef();

  const shakeAnim = useRef(new Animated.Value(0));

  async function loadSounds() {
    const button = await Audio.Sound.createAsync(
      require('../../assets/sfx/button.wav')
    );
    const tileTap = await Audio.Sound.createAsync(
      require('../../assets/sfx/tile_tap.wav')
    );
    const tileWrong = await Audio.Sound.createAsync(
      require('../../assets/sfx/tile_wrong.wav')
    );
    const pauseIn = await Audio.Sound.createAsync(
      require('../../assets/sfx/pause_in.wav')
    );
    const pauseOut = await Audio.Sound.createAsync(
      require('../../assets/sfx/pause_out.wav')
    );
    const lose = await Audio.Sound.createAsync(
      require('../../assets/sfx/lose.wav')
    );
    tapSound.current = button.sound;
    tapCorrectSound.current = tileTap.sound;
    tapWrongSound.current = tileWrong.sound;
    pauseInSound.current = pauseIn.sound;
    pauseOutSound.current = pauseOut.sound;
    loseSound.current = lose.sound;
  }

  const { width, height } = Dimensions.get('window');

  useEffect(() => {
    loadSounds();
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
      tapCorrectSound.current.replayAsync();
    } else {
      setTimeLeft((time) => time - 2);
      tapWrongSound.current.replayAsync();

      Animated.sequence([
        Animated.timing(shakeAnim.current, {
          toValue: 50,
          duration: 100,
          useNativeDriver: true
        }),
        Animated.timing(shakeAnim.current, {
          toValue: -50,
          duration: 100,
          useNativeDriver: true
        }),
        Animated.timing(shakeAnim.current, {
          toValue: 50,
          duration: 100,
          useNativeDriver: true
        }),
        Animated.timing(shakeAnim.current, {
          toValue: -50,
          duration: 100,
          useNativeDriver: true
        }),
        Animated.timing(shakeAnim.current, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true
        })
      ]).start();
    }

    generateNewRound();
  };

  const onBottomBarPress = async () => {
    switch (gameState) {
      case 'INGAME': {
        pauseInSound.current.replayAsync();
        setGameState('PAUSED');
        break;
      }
      case 'PAUSED': {
        pauseOutSound.current.replayAsync();
        setGameState('INGAME');
        break;
      }
      case 'LOST': {
        loseSound.current.replayAsync();
        setPoints(0);
        setTimeLeft(15);
        setSize(2);
        generateNewRound();

        setGameState('INGAME');
        break;
      }
    }
  };

  const onExitPress = async () => {
    await tapSound.current.replayAsync();
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

      <Animated.View
        style={{
          height: height / 2.5,
          width: height / 2.5,
          flexDirection: 'row',
          transform: [{ translateX: shakeAnim.current }]
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
      </Animated.View>

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
