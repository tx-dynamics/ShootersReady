import {createStackNavigator} from 'react-navigation-stack';
import Vault from '../../screens/Vault';
import Notes from '../../screens/Notes';
import ShowNotes from '../../screens/ShowNotes';
import AddNotes from '../../screens/AddNotes';
const VaultStack = createStackNavigator(
  {
    Vault: {
      screen: Vault,
      navigationOptions: {
        headerShown: false,
      },
    },
    Notes: {
      screen: Notes,
      navigationOptions: {
        headerShown: false,
      },
    },
    ShowNotes: {
      screen: ShowNotes,
      navigationOptions: {
        headerShown: false,
      },
    },
    AddNotes: {
      screen: AddNotes,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'Vault',
  },
);

export default VaultStack;
