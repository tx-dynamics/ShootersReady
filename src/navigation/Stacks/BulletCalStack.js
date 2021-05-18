import {createStackNavigator} from 'react-navigation-stack';
import BulletCalculator from '../../screens/BulletCalculator';
import BulletGraph from '../../screens/BulletGraph';
const BulletCal = createStackNavigator(
  {
    BulletCalculator: {
      screen: BulletCalculator,
      navigationOptions: {
        headerShown: false,
      },
    },
    BulletGraph: {
      screen: BulletGraph,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'BulletCalculator',
  },
);

export default BulletCal;
