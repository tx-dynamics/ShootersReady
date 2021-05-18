import {StyleSheet} from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  categoryContainer: {
    flex: 0.5,
    // justifyContent: 'center',
    padding: 10,

    // alignItems: 'center',
    // marginTop: 10,
  },
  largeText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 24,
    padding: 0,
  },
  mediumText: {
    fontSize: 18,
    color: 'black',
    // marginLeft: 3,
    alignSelf: 'center',
    marginTop: 20,
  },
  loginContainer: {
    width: '40%',
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    padding: 10,
    marginTop: 20,
    // borderColor: 'white',
    // borderWidth: 1,
  },
  loginText: {color: 'white', fontWeight: 'bold', fontSize: 20},
});
export default styles;
