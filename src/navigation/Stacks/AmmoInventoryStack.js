import {createStackNavigator} from 'react-navigation-stack';
import AmmoInventory from '../../screens/AmmoInventory';
import Addammo from '../../screens/Addammo';
const AmmoInventoryStack = createStackNavigator(
  {
    AmmoInventory: {
      screen: AmmoInventory,
      navigationOptions: {
        headerShown: false,
      },
    },
    Addammo: {
      screen: Addammo,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'AmmoInventory',
  },
);

export default AmmoInventoryStack;
