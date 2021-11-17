import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import styles from './styles';
import DocumentPicker from 'react-native-document-picker';
import auth from '@react-native-firebase/auth';
import Entypo from 'react-native-vector-icons/Entypo';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import theme from '../../theme';
import {Header, Divider} from 'react-native-elements';
import {logo, button} from '../../assets';
import HeaderCenterComponent from '../../components/HeaderCenterComponent';
import HeaderLeftComponent from '../../components/HeaderLeftComponent';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      fName: '',
      lName: '',
      email: '',
      imageuri: '',
      isLoading: false,
      name: 'Cortlin Martin',
      uid: '',
      currentPassword: '',
      currentemail: '',
    };
  }
  async componentDidMount() {
    const Password = await AsyncStorage.getItem('password');
    const Email = await AsyncStorage.getItem('email');
    console.log('=====>', JSON.parse(Password), Email);
    const user = auth().currentUser;
    this.setState({name: user.displayName, uid: user.uid});
    const data = database().ref('users/' + user.uid);
    data.on('value', userdata => {
      this.setState({
        fName: userdata.val().firstName,
        lName: userdata.val().lastName,
        email: userdata.val().email,
        imageuri: userdata.val().dp,
        currentPassword: JSON.parse(Password),
        currentemail: JSON.parse(Email),
        password: JSON.parse(Password),
      });
    });
  }
  reauthenticate = currentPassword => {
    var user = auth().currentUser;
    var cred = auth.EmailAuthProvider.credential(user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  };
  imgePicker = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      res.map(item=>{
        this.setState({imageuri: item.uri});
        this.uploadmultimedia(item.uri);
      })
      // this.setState(
      //   {imageuri: res.uri, imgName: res.name},
      //   this.uploadmultimedia,
      // );

      console.log(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };
  async uploadmultimedia(uri) {
    console.log(uri);
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response); // when BlobModule finishes reading, resolve with the blob
      };
      xhr.onerror = function () {
        reject(new TypeError('Network request failed')); // error occurred, rejecting
      };
      xhr.responseType = 'blob'; // use BlobModule's UriHandler
      xhr.open('GET', uri, true); // fetch the blob from uri in async mode
      xhr.send(null); // no initial data
    });
    var timestamp = new Date().getTime();
    var imageRef = storage().ref('users/UserImage/' + timestamp + '/');

    return imageRef
      .put(blob)
      .then(() => {
        blob.close();
        return imageRef.getDownloadURL();
      })
      .then(dwnldurl => {
        console.log(dwnldurl);
        this.setState({imageuri: dwnldurl});
      });
  }
  async clickRegister() {
    const {
      fName,
      lName,
      email,
      imageuri,
      password,
      currentPassword,
      currentemail,
    } = this.state;
    //Change password
    if (currentemail !== password) {
      this.reauthenticate(this.state.currentPassword)
        .then(() => {
          var user = auth().currentUser;
          user
            .updatePassword(password)
            .then(() => {
              console.log('Password updated!');
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
    }

    //Change  email
    if (currentemail !== email) {
      this.reauthenticate(currentPassword)
        .then(() => {
          var user = auth().currentUser;
          user
            .updateEmail(email)
            .then(() => {
              console.log('Email updated!');
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
    }
    try {
      AsyncStorage.setItem('email', JSON.stringify(email));
      AsyncStorage.setItem('password', JSON.stringify(password));
      console.log('email======>', email, '\n password====>', password);
    } catch (error) {
      console.log(error.message);
    }

    this.setState({loading: true});
    var regData = {
      firstName: fName,
      lastName: lName,
      email: email,
      dp: imageuri,
    };
    const Uid = auth().currentUser.uid;
    this.setState({Uid});
    console.log('auth().currentUser=>>>', Uid);
    console.log('regData====>', regData);

    database()
      .ref('users/' + Uid)
      .update(regData)
      .then(res => {
        console.log('====>>>', res);
        this.setState({isLoading: false}, () =>
          this.props.navigation.navigate('Profile'),
        );
      })
      .catch(error => {
        var errorMessage = error.message;
        console.log(errorMessage);
        this.setState({loading: false}, () => {
          alert(errorMessage, 'HERe');
        });
      });
  }
  render() {
    return (
      <ScrollView style={styles.mainContainer}>
        <Header
          backgroundColor={'white'}
          containerStyle={{borderBottomWidth: 0}}
          leftComponent={<HeaderLeftComponent />}
          centerComponent={<HeaderCenterComponent name="SHOOTERS READY" />}
        />
        <View style={{alignItems: 'center', marginTop: 10}}>
          <Divider
            style={{
              backgroundColor: theme.colors.primary,
              height: 1,
              width: '50%',
            }}
          />
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
              <TouchableOpacity activeOpacity={1}>
                <Text
                  style={{
                    color: 'white',
                    // backgroundColor: '#A50202',
                    padding: 20,
                    textAlign: 'center',
                    // borderRadius: 5,
                  }}>
                  Profile
                </Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>
        </View>

        <View style={{alignItems: 'center'}}>
          <View
            style={{
              flexDirection: 'row',

              // backgroundColor: 'tomato',
            }}>
            <ImageBackground
              source={
                this.state.imageuri
                  ? {
                      uri: `${this.state.imageuri}`,
                    }
                  : logo
              }
              borderRadius={100}
              resizeMode={'cover'}
              style={{
                height: 100,
                width: 100,
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                marginTop: 10,
                // borderColor: theme.colors.primary,
                // borderWidth: 2,
                // flex: 0.3,
              }}>
              <TouchableOpacity onPress={this.imgePicker}>
                <Entypo name="edit" size={30} style={{marginLeft: 10}} />
              </TouchableOpacity>
            </ImageBackground>
          </View>
          <Text style={[styles.largeText, {marginTop: 10}]}>
            {this.state.name}
          </Text>
          <Divider
            style={{
              marginTop: 10,
              backgroundColor: theme.colors.primary,
              height: 2,
              width: '60%',
            }}
          />
        </View>

        <View
          style={{
            // flex: 0.9,
            marginTop: 10,
            // backgroundColor: 'skyblue',
            // justifyContent: 'center',
          }}>
          <TextInput
            style={styles.Input}
            placeholder="First Name"
            onChangeText={text => this.setState({fName: text})}
            value={this.state.fName}
            placeholderTextColor={'white'}
            underlineColorAndroid="transparent"
          />
          <TextInput
            style={styles.Input}
            placeholder="Last Name"
            onChangeText={text => this.setState({lName: text})}
            value={this.state.lName}
            placeholderTextColor={'white'}
            underlineColorAndroid="transparent"
          />
          <TextInput
            style={styles.Input}
            placeholder="Email"
            keyboardType="default"
            // secureTextEntry={true}
            autoCapitalize={'none'}
            returnKeyType={'done'}
            value={this.state.email}
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
            onChangeText={email => {
              this.setState({email});
            }}
          />
          <TextInput
            style={styles.Input}
            placeholder="Password"
            secureTextEntry
            // keyboardType={'number-pad'}
            value={this.state.password}
            placeholderTextColor="white"
            onChangeText={text => this.setState({password: text})}
          />

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
                onPress={() => this.props.navigation.navigate('Profile')}>
                <Text
                  style={{
                    color: 'white',
                    // backgroundColor: theme.colors.gray,
                    padding: 20,
                    textAlign: 'center',
                    borderRadius: 5,
                  }}>
                  Discard
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
              }}
              source={button}
              imageStyle={{borderRadius: 10}}>
              {this.state.isLoading ? (
                <ActivityIndicator
                  animating
                  color={'white'}
                  style={[styles.buttonStyle, {}]}
                />
              ) : (
                <TouchableOpacity
                  onPress={() =>
                    this.setState({isLoading: true}, () => this.clickRegister())
                  }>
                  <Text
                    style={{
                      color: 'white',
                      // backgroundColor: theme.colors.gray,
                      padding: 20,
                      textAlign: 'center',
                      borderRadius: 5,
                      alignSelf: 'center',
                    }}>
                    Save
                  </Text>
                </TouchableOpacity>
              )}
            </ImageBackground>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default EditProfile;
