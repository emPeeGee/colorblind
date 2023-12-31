import { Dimensions, StyleSheet } from 'react-native';
import { scale } from '../../utils';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    justifyContent: 'center',
    alignItems: 'center'
  },

  pausedContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  pausedText: {
    fontFamily: 'dogbyte',
    textAlign: 'center',
    color: '#eee',
    marginTop: 20,
    fontSize: 60
  },
  pausedIcon: {
    width: 80,
    height: 80
  },

  exitIcon: {
    marginTop: 20,
    width: scale(90),
    height: scale(45)
  },

  bottomContainer: {
    flex: 1,
    width: Dimensions.get('window').width * 0.875,
    flexDirection: 'row'
  },
  bottomSectionContainer: {
    flex: 1,
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  bottomIcon: {
    width: scale(45),
    height: scale(45)
  },
  counterCount: {
    fontFamily: 'dogbyte',
    textAlign: 'center',
    color: '#eee',
    fontSize: scale(45)
  },
  counterLabel: {
    fontFamily: 'dogbyte',
    textAlign: 'center',
    color: '#bbb',
    fontSize: scale(20)
  },
  bestContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  bestIcon: {
    width: scale(22),
    height: scale(22),
    marginRight: 5
  },
  bestLabel: {
    fontFamily: 'dogbyte',
    color: '#bbb',
    fontSize: scale(22),
    marginTop: 2.5
  }
});
