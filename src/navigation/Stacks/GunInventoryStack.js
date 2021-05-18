import {createStackNavigator} from 'react-navigation-stack';
import GunInventory from '../../screens/GunInventory';
import Main from '../../screens/Main';
import Profile from '../../screens/Profile';
import EditProfile from '../../screens/EditProfile';
import GunInventDetail from '../../screens/GunInventDetail';
import GunLoadData from '../../screens/GunLoadData';
import CasePreparation from '../../screens/CasePreparation';
import RangeCondition from '../../screens/RangeCondition';
const GunInventoryStack = createStackNavigator(
  {
    GunInventory: {
      screen: GunInventory,
      navigationOptions: {
        headerShown: false,
      },
    },
    Main: {
      screen: Main,
      navigationOptions: {
        headerShown: false,
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        headerShown: false,
      },
    },
    EditProfile: {
      screen: EditProfile,
      navigationOptions: {
        headerShown: false,
      },
    },
    GunInventDetail: {
      screen: GunInventDetail,
      navigationOptions: {
        headerShown: false,
      },
    },
    GunLoadData: {
      screen: GunLoadData,
      navigationOptions: {
        headerShown: false,
      },
    },
    CasePreparation: {
      screen: CasePreparation,
      navigationOptions: {
        headerShown: false,
      },
    },
    RangeCondition: {
      screen: RangeCondition,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'Main',
  },
);

export default GunInventoryStack;
