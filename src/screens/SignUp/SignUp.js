import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
  AsyncStorage,
} from 'react-native';
import styles from './styles';
import theme from '../../theme';
import Snackbar from 'react-native-snackbar';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {Header, Divider} from 'react-native-elements';
import {logo, button} from '../../assets';
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fName: '',
      lname: '',
      email: '',
      password: '',
      cnfrmPswrd: '',
      isLoading: false,
      isSigningUp: false,
    };
  }

  onSignup = async () => {
    const {pNo, fName, email, password, cnfrmPswrd, lname} = this.state;
    console.log(fName, email, password, cnfrmPswrd, lname);

    if (
      fName !== '' &&
      email !== '' &&
      password !== '' &&
      cnfrmPswrd !== '' &&
      lname !== ''
    ) {
      if (password === cnfrmPswrd) {
        try {
          AsyncStorage.setItem('email', JSON.stringify(email));
          AsyncStorage.setItem('password', JSON.stringify(password));
          console.log('email======>', email, '\n password====>', password);
        } catch (error) {
          this.setState({isLoading: false});
          console.log(error.message);
        }
        this.clickRegister();
        try {
        } catch (err) {
          this.setState({isLoading: false});
          Snackbar.show({
            text: JSON.stringify(err.message),
            backgroundColor: 'black',
          });
        }
      } else {
        this.setState({isLoading: false});
        Snackbar.show({
          text: 'Passwords did not match',
          backgroundColor: 'black',
        });
      }

      // this.props.navigation.navigate('Login');
    } else {
      this.setState({isLoading: false});
      Snackbar.show({
        text: 'Kindly Fill all the fields',
        backgroundColor: 'black',
      });
    }
  };

  async clickRegister() {
    const {fName, lname, password, email} = this.state;

    var credential = auth.EmailAuthProvider.credential(email, password);
    console.log('credential', credential);

    var regData = {
      firstName: fName,
      lastName: lname,
      email: email,
      createdAt: new Date().toISOString(),
    };
    console.log('auth().currentUser', auth().currentUser);
    console.log('registration data===>', regData);

    //  Registration part
    if (auth().currentUser) {
      //console.log(firebase.auth().currentUser)
      // var credential = auth.EmailAuthProvider.credential(email, password);
      alert('User Already Registered Kindly Sign In');
    } else {
      console.log('I am here');
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(newUser => {
          if (newUser) {
            auth()
              .currentUser.updateProfile({
                displayName: regData.firstName + ' ' + regData.lastName,
              })
              .then(() => {
                database()
                  .ref('users/')
                  .child(auth().currentUser.uid)
                  .set(regData)
                  .then(() => {
                    auth()
                      .signInWithEmailAndPassword(email, password)
                      .then(res => {
                        console.log(auth().currentUser);
                        auth().signOut();
                        this.props.navigation.navigate('Home');
                      })
                      .catch(res => {
                        this.setState({isLoading: false});
                        Snackbar.show({
                          text:err.message,
                          backgroundColor: 'black',
                        });
                      });
                  });
              });
          }
        })
        .catch(error => {
          var errorMessage = error.message;
          console.log(errorMessage);
          this.setState({isLoading: false}, () => {
            Snackbar.show({
              text:errorMessage,
              backgroundColor: 'black',
            });
          });
        });
    }
  }

  render() {
    const {password, email, cnfrmPswrd, fName, lname} = this.state;
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

        <View style={styles.LoginContainer}>
          <ImageBackground
            source={logo}
            style={{
              height: 150,
              width: 150,
            }}
          />
          <Text style={[styles.title, styles.leftTitle]}>Sign Up</Text>
          <View style={styles.InputContainer}>
            <TextInput
              style={styles.body}
              placeholder="First Name"
              onChangeText={text => this.setState({fName: text})}
              value={fName}
              placeholderTextColor={'white'}
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.InputContainer}>
            <TextInput
              style={styles.body}
              placeholder="Last Name"
              onChangeText={text => this.setState({lname: text})}
              value={lname}
              placeholderTextColor={'white'}
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.InputContainer}>
            <TextInput
              style={styles.body}
              placeholder="Email"
              onChangeText={text => this.setState({email: text})}
              value={email}
              placeholderTextColor={'white'}
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.InputContainer}>
            <TextInput
              style={styles.body}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={text => this.setState({password: text})}
              value={password}
              placeholderTextColor={'white'}
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.InputContainer}>
            <TextInput
              style={styles.body}
              secureTextEntry={true}
              placeholder="Confirm Password"
              onChangeText={text => this.setState({cnfrmPswrd: text})}
              value={cnfrmPswrd}
              placeholderTextColor={'white'}
              underlineColorAndroid="transparent"
            />
          </View>
          {/* {this.state.isLoading ? (
            <ActivityIndicator
              animating
              color={'white'}
              style={styles.loginContainer}
            />
          ) : (
            <TouchableOpacity
              style={styles.loginContainer}
              onPress={() => {
                this.setState({isLoading: true}, () => {
                  // this.props.navigation.navigate('Main');
                });
                this.onSignup();
              }}>
              <Text style={styles.loginText}> Sign Up</Text>
            </TouchableOpacity>
          )} */}
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
              {this.state.isLoading ? (
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
                    this.setState({isLoading: true}, () => {
                      // this.props.navigation.navigate('Main');
                    });
                    this.onSignup();
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      // backgroundColor: '#A50202',
                      padding: 20,
                      textAlign: 'center',
                      // borderRadius: 5,
                    }}>
                    Sign Up
                  </Text>
                </TouchableOpacity>
              )}
            </ImageBackground>
          </View>

          <View
            style={{
              flexDirection: 'row',
              // alignSelf: 'center',
            }}>
            <Text style={[styles.mediumText, {color: 'black', fontSize: 13}]}>
              Have an acccount?
            </Text>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Login');
              }}>
              <Text
                style={[
                  styles.mediumText,
                  {color: theme.colors.primary, fontWeight: 'bold'},
                ]}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default SignUp;
