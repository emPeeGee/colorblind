import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Home } from './Home';

export const Routes = createAppContainer(
  createStackNavigator(
    {
      Home: {
        screen: Home
      }
    },
    {
      initialRouteName: 'Home',
      headerMode: 'none'
    }
  )
);
