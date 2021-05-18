import {createStackNavigator} from 'react-navigation-stack';
import GunProfile from '../../screens/GunProfile';
import AddGun from '../../screens/AddGun';
const GunProfileStack = createStackNavigator(
  {
    GunProfile: {
      screen: GunProfile,
      navigationOptions: {
        headerShown: false,
      },
    },
    AddGun: {
      screen: AddGun,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'GunProfile',
  },
);

export default GunProfileStack;
