import {createStackNavigator} from 'react-navigation-stack';
import NfaItems from '../../screens/NfaItems';
const NfsStack = createStackNavigator(
  {
    NfaItems: {
      screen: NfaItems,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'NfaItems',
  },
);

export default NfsStack;
