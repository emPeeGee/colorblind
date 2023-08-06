import React, { useRef, useEffect, useState } from 'react';
import { Button, TouchableOpacity, Image, Text, View } from 'react-native';
import { Audio } from 'expo-av';

import { styles } from './styles';
import { Header } from '../../components';

export function Home({ navigation }) {
  const [isSoundOn, setIsSoundOn] = useState(true);
  const sound = useRef();
  const buttonFX = useRef();

  const enableAudio = async () => {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
      interruptionModeAndroid: INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      shouldDuckAndroid: false
    });
  };

  async function playSound() {
    // await enableAudio();
    // const sound = new Audio.Sound();
    // try {
    //   await sound.loadAsync(
    //     require('../../assets/music/Komiku_Mushrooms.mp3'),
    //     { shouldPlay: true }
    //   );
    //   await sound.setPositionAsync(0);
    //   await sound.playAsync();
    // } catch (error) {
    //   console.error(error);
    // }
    console.log('Loading Sound');
    const { sound: playbackObject } = await Audio.Sound.createAsync(
      require('../../assets/music/Komiku_Mushrooms.mp3'),
      { shouldPlay: true }
    );

    sound.current = playbackObject;
    const checkLoaded = await sound.current.getStatusAsync();
    console.log(checkLoaded);
    if (checkLoaded.isLoaded === true) {
      console.log('Playing Sound');
      await sound.current.playAsync();
    } else {
      console.log('Error in Loading mp3');
    }
  }

  useEffect(() => {
    playSound();
    loadSounds();
  }, []);

  async function loadSounds() {
    const { sound: buttonPlayback } = await Audio.Sound.createAsync(
      require('../../assets/sfx/button.wav')
    );

    buttonFX.current = buttonPlayback;
  }

  useEffect(() => {
    return sound.current
      ? () => {
          console.log('Unloading Sound');
          sound.current.unloadAsync();
        }
      : undefined;
  }, []);

  const onPlayPress = async () => {
    await sound.current?.stopAsync();
    await buttonFX.current?.replayAsync();

    navigation.navigate('Game');
    console.log('onPlayPress event handler');
  };

  const onLeaderboardPress = () => {
    console.log('onLeaderboardPress event handler');
  };

  const onToggleSound = () => {
    setIsSoundOn((isOn) => !isOn);
  };

  const imageSource = isSoundOn
    ? require('../../assets/icons/speaker-on.png')
    : require('../../assets/icons/speaker-off.png');

  return (
    <View style={styles.container}>
      <Header />
      <Button title="Play Sound" onPress={() => playSound()} />
      <TouchableOpacity
        onPress={onPlayPress}
        style={{ flexDirection: 'row', alignItems: 'center', marginTop: 80 }}>
        <Image
          source={require('../../assets/icons/play_arrow.png')}
          style={styles.playIcon}
        />
        <Text style={styles.play}>PLAY!</Text>
      </TouchableOpacity>
      <View
        style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
        <Image
          source={require('../../assets/icons/trophy.png')}
          style={styles.trophyIcon}
        />
        <Text style={styles.hiscore}>Hi-score: 0</Text>
      </View>
      <TouchableOpacity
        onPress={onLeaderboardPress}
        style={{ flexDirection: 'row', alignItems: 'center', marginTop: 80 }}>
        <Image
          source={require('../../assets/icons/leaderboard.png')}
          style={styles.leaderboardIcon}
        />
        <Text style={styles.leaderboard}>Leaderboard</Text>
      </TouchableOpacity>
      <View style={styles.bottomContainer}>
        <View>
          <Text style={[styles.copyrightText, { color: '#E64C3C' }]}>
            Music: Komiku
          </Text>
          <Text style={[styles.copyrightText, { color: '#F1C431' }]}>
            SFX: SubspaceAudio
          </Text>
          <Text style={[styles.copyrightText, { color: '#3998DB' }]}>
            Development: RisingStack
          </Text>
        </View>
        <View style={{ flex: 1 }} />
        <TouchableOpacity onPress={onToggleSound}>
          <Image source={imageSource} style={styles.soundIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
