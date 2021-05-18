import {StyleSheet, Dimensions} from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    flexGrow: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  splashStyle: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  button: {
    width: '50%',
    backgroundColor: theme.colors.gray,
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
    fontSize: 16,
    textAlign: 'center',
  },
  buttonStyle: {
    margin: 10,
    padding: 15,
    borderRadius: 10,
    // marginLeft:15,
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  Input: {
    margin: 10,
    backgroundColor: 'black',
    // paddingLeft: 10,
    borderRadius: 10,
    elevation: 5,
    width: '90%',
    fontFamily: 'geometriaBold',
    alignSelf: 'center',
    textAlign: 'left',
    padding: 10,
    justifyContent: 'center',
    color: '#404041',
  },
  largeText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  loginContainer: {
    width: '50%',
    backgroundColor: 'black',
    borderRadius: 8,
    padding: 15,
    marginTop: 30,
    borderColor: 'white',
    borderWidth: 1,
  },
  backArrow: {
    height: 25,
    width: 25,
    borderRadius: 50,
    margin: 10,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImgStyle: {
    height: 150,
    width: '90%',
    // borderRadius: 65,
    marginTop: 10,

    // backgroundColor: 'tomato',
    // justifyContent: 'flex-end',
  },
  textStyle: {
    fontSize: 20,
    marginTop: 10,
    color: 'white',
    // textAlign: 'center',
  },
  rapper: {
    color: 'white',
    backgroundColor: theme.colors.gray,
    padding: 10,
    textAlign: 'center',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  small: {
    color: theme.colors.gray,
    // width: '100%',
    padding: 10,
    borderWidth: 2,
    textAlign: 'center',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
});
export default styles;
