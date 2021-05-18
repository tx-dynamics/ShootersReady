import {createStackNavigator} from 'react-navigation-stack';
import MissingGun from '../../screens/MissingGun';
const MissingGunStack = createStackNavigator(
  {
    MissingGun: {
      screen: MissingGun,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'MissingGun',
  },
);

export default MissingGunStack;
