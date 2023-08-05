import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Home } from './Home';
import { Game } from './Game';

export const Routes = createAppContainer(
  createStackNavigator(
    {
      Home: {
        screen: Home
      },
      Game: {
        screen: Game,
        navigationOptions: {
          gesturesEnabled: false
        }
      }
    },
    {
      initialRouteName: 'Home',
      headerMode: 'none'
    }
  )
);
