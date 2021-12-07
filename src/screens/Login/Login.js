import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  AsyncStorage,
} from 'react-native';
import styles from './styles';
import {Header, Divider} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';
import theme from '../../theme';
import {logo, button} from '../../assets';
import bullets from '../BulletCalculator/bullets';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {loading: false, email: '', password: ''};
  }
  componentDidMount() {}

  login =async () => {
    const {email, password} = this.state;
    const user = auth().currentUser;
    try {
      const myArray = await AsyncStorage.getItem('bullets');
      if (myArray !== null) {
        // We have data!!
        console.log(JSON.parse(myArray));
      }
      else {
        await AsyncStorage.setItem('data', JSON.stringify(bullets));
      }
    } catch (error) {
      console.log(error.message);
    }
    if (email !== '' && password !== '') {
      try {
       
        AsyncStorage.setItem('email', JSON.stringify(email));
        AsyncStorage.setItem('password', JSON.stringify(password));
        console.log('email======>', email, '\n password====>', password);
      } catch (error) {
        console.log(error.message);
      }
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account created & signed in!');
          this.setState({loading: false}, () =>
            this.props.navigation.navigate('Main'),
          );
          Snackbar.show({
            text: 'Welcome Back ',
            backgroundColor: theme.colors.primary,
            duration: Snackbar.LENGTH_LONG,
          });
        })
        .catch(err => {
          this.setState({loading: false});
          Snackbar.show({
            text:err.message,
            backgroundColor: 'black',
          });
        });
    } else {
      this.setState({loading: false});
      Snackbar.show({
        text: 'Kindly Fill all the fields',
        backgroundColor: 'black',
      });
    }
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Header
          backgroundColor={'white'}
          containerStyle={{borderBottomWidth: 0}}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
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

        <ImageBackground
          source={logo}
          style={{
            height: 200,
            width: 200,
            alignSelf: 'center',
            justifyContent: 'flex-end',
            marginTop: 10,
            // flex: 0.3,
          }}
        />
        <View style={styles.LoginContainer}>
          <Text style={[styles.title, styles.leftTitle]}>Log In</Text>
          <View style={styles.InputContainer}>
            <TextInput
              style={styles.body}
              placeholder="Email"
              onChangeText={text => this.setState({email: text.trim()})}
              value={this.state.email}
              placeholderTextColor={'white'}
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.InputContainer}>
            <TextInput
              style={styles.body}
              secureTextEntry={true}
              placeholder="Password"
              onChangeText={text => this.setState({password: text})}
              value={this.state.password}
              placeholderTextColor={'white'}
              underlineColorAndroid="transparent"
            />
          </View>
        </View>

        <View
          style={{
            marginTop: 20,
            width: '100%',
            justifyContent: 'space-around',
            flexDirection: 'row',
            marginBottom: 20,
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
            {this.state.loading ? (
              <ActivityIndicator
                animating
                color={'white'}
                style={{
                  color: 'white',
                  // backgroundColor: '#A50202',
                  padding: 20,
                  textAlign: 'center',
                  borderRadius: 5,
                  // width: '40%',
                }}
              />
            ) : (
              <TouchableOpacity
                onPress={() => {
                  this.setState({loading: true}, () => {
                    // this.props.navigation.navigate('Main');
                  });
                  this.login();
                }}>
                <Text
                  style={{
                    color: 'white',
                    // backgroundColor: '#A50202',
                    padding: 20,
                    textAlign: 'center',
                    // borderRadius: 5,
                  }}>
                  Log In
                </Text>
              </TouchableOpacity>
            )}
          </ImageBackground>
        </View>
      </ScrollView>
    );
  }
}

export default Login;
