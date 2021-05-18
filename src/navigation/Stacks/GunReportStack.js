import {createStackNavigator} from 'react-navigation-stack';
import GunReport from '../../screens/GunReport';
import StolenData from '../../screens/StolenData';
import EditStolenGun from '../../screens/EditStolenGun';
import MissingReport from '../../screens/MissingReport';
const GunReportStack = createStackNavigator(
  {
    GunReport: {
      screen: GunReport,
      navigationOptions: {
        headerShown: false,
      },
    },
    StolenData: {
      screen: StolenData,
      navigationOptions: {
        headerShown: false,
      },
    },
    EditStolenGun: {
      screen: EditStolenGun,
      navigationOptions: {
        headerShown: false,
      },
    },
    MissingReport: {
      screen: MissingReport,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'GunReport',
  },
);

export default GunReportStack;
