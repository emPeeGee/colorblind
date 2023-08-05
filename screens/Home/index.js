import React, { useState } from 'react';
import { TouchableOpacity, Image, Text, View } from 'react-native';
import { styles } from './styles';
import { Header } from '../../components';

export function Home({ navigation }) {
  const [isSoundOn, setIsSoundOn] = useState(true);

  onPlayPress = () => {
    navigation.navigate('Game');
    console.log('onPlayPress event handler');
  };

  onLeaderboardPress = () => {
    console.log('onLeaderboardPress event handler');
  };

  onToggleSound = () => {
    setIsSoundOn((isOn) => !isOn);
  };

  const imageSource = isSoundOn
    ? require('../../assets/icons/speaker-on.png')
    : require('../../assets/icons/speaker-off.png');

  return (
    <View style={styles.container}>
      <Header />
      <TouchableOpacity
        onPress={this.onPlayPress}
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
        onPress={this.onLeaderboardPress}
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
        <TouchableOpacity onPress={this.onToggleSound}>
          <Image source={imageSource} style={styles.soundIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
