import {StyleSheet} from 'react-native';
import theme from '../../theme';
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexGrow: 1,
  },
  userImgStyle: {
    height: 130,
    width: 130,
    borderColor: theme.colors.primary,
    borderRadius: 65,
    borderWidth: 2,
    alignSelf: 'center',
    marginTop: 15,
  },
  InputContainer: {
    width: '90%',
    marginTop: 25,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#B3B3BA',
    borderRadius: 4,
    marginLeft: 10,
    // borderBottomWidth: '70%',
  },
  picback: {
    flex: 0.3,
    // backgroundColor: theme.colors.primary,
  },
  edit: {
    alignItems: 'flex-end',
    marginRight: 20,
    top: 35,
    // backgroundColor: 'tomato',
  },
  largeText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  body: {
    padding: 10,
    // paddingLeft: 20,
    // paddingRight: 20,
    color: '#404041',
  },
  mediumText: {
    fontSize: 16,
    color: '#404041',
    marginLeft: 10,
    width: '90%',
    alignSelf: 'center',
  },
  LoginContainer: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '50%',
    backgroundColor: 'black',
    borderRadius: 8,
    padding: 15,
    marginTop: 10,
    // borderColor: 'white',
    // borderWidth: 1,
    alignSelf: 'center',
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
});
export default style;
