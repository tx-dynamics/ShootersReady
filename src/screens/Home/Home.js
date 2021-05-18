import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Alert,
  AsyncStorage,
} from 'react-native';
import {logo} from '../../assets';
import Snackbar from 'react-native-snackbar';
import styles from './styles';
import {Button, Divider, Header} from 'react-native-elements';
import theme from '../../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import auth from '@react-native-firebase/auth';
import {button} from '../../assets';
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {loading: false, go: false, email: '', password: ''};
  }
  componentWillUnmount() {
    FingerprintScanner.release();
  }
  componentDidMount() {
    if (auth().currentUser) {
      console.log(auth().currentUser);
      this.props.navigation.push('Main');
    }
  }
  login = () => {
    const {email, password} = this.state;
    if (email !== '' && password !== '') {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account created & signed in!');
          this.setState({loading: false}, () =>
            this.props.navigation.navigate('Main'),
          );
          Snackbar.show({
            text: `Welcome Back `,
            backgroundColor: theme.colors.primary,
            duration: Snackbar.LENGTH_LONG,
          });
        })
        .catch(err => alert(err.message));
    } else {
      this.setState({loading: false});
      Snackbar.show({
        text: 'Kindly Fill all the fields',
        backgroundColor: 'black',
      });
    }
  };
  async fingerscan() {
    const {email, password} = this.state;
    const Email = await AsyncStorage.getItem('email');
    const Password = await AsyncStorage.getItem('password');
    console.log('email here', JSON.parse(Email), '\n password here', Password);
    // try {

    //   this.setState({email: JSON.parse(Email), password: JSON.parse(Password)});
    //
    // } catch (error) {
    //   console.log(error.message);
    // }
    if (JSON.parse(Email) && JSON.parse(Password)) {
      FingerprintScanner.authenticate({
        description: 'Scan your fingerprint for Log In',
      })
        .then(() => {
          auth()
            .signInWithEmailAndPassword(JSON.parse(Email), JSON.parse(Password))
            .then(() => {
              console.log('User account created & signed in!');
              this.setState({loading: false}, () =>
                this.props.navigation.navigate('Main'),
              );
              Snackbar.show({
                text: `Welcome Back `,
                backgroundColor: theme.colors.primary,
                duration: Snackbar.LENGTH_LONG,
              });
            })
            .catch(err => alert(err.message));
        })
        .catch(error => {
          Alert.alert(error.message);
        });
    } else {
      Alert.alert('Kindly login or signup first');
    }
  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Header
          backgroundColor={'white'}
          containerStyle={{borderBottomWidth: 0}}
        />
        <View
          style={{
            flex: 0.25,
            // backgroundColor: 'tomato',
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Divider
              style={{
                backgroundColor: 'black',
                height: 50,
                width: 30,
                borderRadius: 2,
              }}
            />
            <Text style={styles.largeText}>SHOOTERS READY</Text>
            <Divider
              style={{
                backgroundColor: 'black',
                height: 50,
                width: 30,
                borderRadius: 2,
              }}
            />
          </View>
        </View>
        <ImageBackground
          source={logo}
          style={{
            height: 200,
            width: 200,
            alignSelf: 'center',
            justifyContent: 'flex-end',
            // marginTop: 10,
            flex: 0.3,
          }}></ImageBackground>
        <View style={{flex: 0.3}}>
          <Text style={styles.mediumText}>By Tour Of Duty Outdoors</Text>
          <Divider
            style={{
              alignSelf: 'center',
              marginTop: 20,
              backgroundColor: theme.colors.primary,
              height: 5,
              width: Dimensions.get('screen').width / 1.1,
              borderRadius: 2,
            }}
          />
          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              // backgroundColor: 'tomato',
              width: '80%',
              alignSelf: 'center',
            }}>
            <TouchableOpacity
              style={styles.loginContainer}
              // style={styles.loginText}
              onPress={() => {
                this.setState({loading: true}, () =>
                  this.props.navigation.navigate('Login'),
                );
                // this.login();
              }}>
              <Text style={styles.loginText}> Log in</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.loginContainer]}
              onPress={this.fingerscan.bind(this)}>
              <Ionicons
                name="finger-print"
                size={20}
                color="white"
                style={{alignSelf: 'center'}}
              />
            </TouchableOpacity>
          </View>
        */}
          <View
            style={{
              marginTop: 20,
              width: '100%',
              justifyContent: 'space-around',
              flexDirection: 'row',
              marginBottom: 10,
            }}>
            <ImageBackground
              style={{
                flex: 0.4,
                height: null,
                width: null,
                resizeMode: 'cover',
                borderRadius: 40,
              }}
              source={button}
              imageStyle={{borderRadius: 10}}>
              <TouchableOpacity
                // style={{width: '40%'}}
                onPress={() => this.props.navigation.navigate('Login')}>
                <Text
                  style={{
                    color: 'white',
                    // backgroundColor: theme.colors.gray,
                    padding: 20,
                    textAlign: 'center',
                    borderRadius: 5,
                  }}>
                  Log In
                </Text>
              </TouchableOpacity>
            </ImageBackground>
            <ImageBackground
              style={{
                flex: 0.4,
                height: null,
                width: null,
                resizeMode: 'cover',
                borderRadius: 40,
                // alignItems: 'center',
              }}
              source={button}
              imageStyle={{borderRadius: 10}}>
              <TouchableOpacity onPress={this.fingerscan.bind(this)}>
                <Ionicons
                  name="finger-print"
                  size={24}
                  color="white"
                  style={{padding: 20, textAlign: 'center', borderRadius: 5}}
                />
              </TouchableOpacity>
            </ImageBackground>
          </View>

          <View style={{alignItems: 'center'}}>
            <Text style={styles.mediumText}>or</Text>
            <TouchableOpacity
              style={{marginTop: 10}}
              onPress={() => this.props.navigation.navigate('SignUp')}>
              <Text style={{fontSize: 18, color: theme.colors.primary}}>
                Create an Account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
