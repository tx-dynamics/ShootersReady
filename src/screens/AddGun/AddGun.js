import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
  FlatList,
} from 'react-native';
import styles from './styles';
import theme from '../../theme';
import {Header, Divider} from 'react-native-elements';
import {user, button,m416} from '../../assets';
import HeaderCenterComponent from '../../components/HeaderCenterComponent';
import HeaderLeftComponent from '../../components/HeaderLeftComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import LinearGradient from 'react-native-linear-gradient';
export default class AddGun extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: '',
      make: '',
      model: '',
      caliber: '',
      space: '',
      serial: '',
      optic: '',
      fire: '',
      hand: '',
      whenPurchase: '',
      Where: '',
      bLength: '',
      bTwist: '',
      bManu: '',
      image: '',
      isLoading: false,
      status: '',gid:'',
      notes:'' };
  }
  componentDidMount() {
    this.setState({screen: '',
    make: '',
    model: '',
    caliber: '',
    space: '',
    serial: '',
    optic: '',
    fire: '',
    hand: '',
    whenPurchase: '',
    Where: '',
    bLength: '',
    bTwist: '',
    bManu: '',
    image: ''});
    const screen = this.props.navigation?.getParam('screen');
    const data = this.props.navigation?.getParam('gid');
    console.log(screen);
    this.setState({screen});
    if(screen==='edit'){
      this.setState({
        make: data.make,
        image: data.img,
        bLength: data.bLength,
        bTwist: data.bTwist,
        notes: data.notes,
        optic: data.optic,
        fire: data.fire,
        hand: data.hand,
        whenPurchase: data.whenPurchase,
        Where: data.Where,
        model: data.model,
        caliber: data.caliber,
        serial: data.serial,
        gid: data.id,
        upimg: data.img,
      })
    }
  }
  imgePicker = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      res.map(item=>{
        this.setState({image: item.uri});
        this.uploadmultimedia(item.uri);
      })
      // this.setState({image: res.uri}, this.uploadmultimedia);

      console.log('here',res);
      return
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };
  async uploadmultimedia(uri) {
    const user = auth().currentUser;
    console.log(uri);
    this.setState({loading: true});
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
    var imageRef = '';
    var timestamp = new Date().getTime();
    if (this.state.screen === 'gun') {
      imageRef = storage().ref('users/gun/' + timestamp + '/');
    } else {
      imageRef = storage().ref('users/MissingGun/' + timestamp + '/');
    }

    return imageRef
      .put(blob)
      .then(() => {
        blob.close();
        return imageRef.getDownloadURL();
      })
      .then(dwnldurl => {
        console.log(dwnldurl);
        this.setState({image: dwnldurl});
      });
  }
  add() {
    const {
      screen,
      image,
      make,
      model,
      caliber,
      serial,
      fire,
      hand,
      whenPurchase,
      Where,
      bLength,
      bTwist,
      bManu,
      notes,
      status,gid
    } = this.state;
    console.log('image=>>>', image);

    const data = {
      status,
      image,
      make,
      model,
      caliber,
      serial,
      fire,
      hand,
      whenPurchase,
      Where,
      bLength,
      bTwist,
      bManu,
      notes,
    };
    console.log(data.cat);
    let gundata = [];
    var curuser = auth().currentUser;
    if (screen === 'gun') {
      gundata = database().ref('users/' + curuser.uid + '/gun/');
      gundata
      .push(data)
      .then(res => {
        console.log('====>>>', res);
        this.setState({isLoading: false}, () =>
          this.props.navigation.navigate('GunProfile'),
        );
      })
      .catch(error => {
        var errorMessage = error.message;
        console.log(errorMessage);
        this.setState({loading: false}, () => {
          alert(errorMessage);
        });
      });
    }else  if (screen === 'edit') {
    const  gun = database().ref('users/' + curuser.uid + '/gun/'+gid);
      gun.update(data);
        this.setState({isLoading: false}, () =>
          this.props.navigation.navigate('GunProfile'),
        );
    } else {
      gundata = database().ref('MissingGun/' + curuser.uid);
      gundata
      .push(data)
      .then(res => {
        console.log('====>>>', res);
        this.setState({isLoading: false}, () =>
          this.props.navigation.navigate('GunProfile'),
        );
      })
      .catch(error => {
        var errorMessage = error.message;
        console.log(errorMessage);
        this.setState({loading: false}, () => {
          alert(errorMessage);
        });
      });
    }
  
  }

  render() {
    const {
      make,
      model,
      caliber,
      serial,
      fire,
      hand,
      whenPurchase,
      Where,
      bLength,
      bTwist,
      bManu,
      notes,
    } = this.state;
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Header
          backgroundColor={'white'}
          containerStyle={{borderBottomWidth: 0}}
          centerComponent={<HeaderCenterComponent name="SHOOTERS READY" />}
          leftComponent={
            <HeaderLeftComponent navigation={this.props.navigation} />
          }
        />
        <View
          style={{
            alignItems: 'center',
            marginTop: 30,
          }}>
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
                  + Add Gun
                </Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>
        </View>

        <ScrollView style={{flex: 1, flexGrow: 1}}>
          <TouchableOpacity onPress={this.imgePicker}>
            <ImageBackground
              borderRadius={10}
              resizeMode='contain'
              source={
                this.state.image
                  ? {
                      uri: `${this.state.image}`,
                    }
                  : m416
              }
              style={styles.userImgStyle}>
              <Ionicons name="camera" size={24} color="white" />
              <Text style={{color: 'white'}}>+ Add Picture</Text>
            </ImageBackground>
          </TouchableOpacity>
          <View
            style={{
              marginTop: 20,
              width: '100%',
              justifyContent: 'space-around',
              flexDirection: 'row',
            }}>
            <View style={{width: '40%'}}>
              <LinearGradient colors={['#000000', '#9C1313']}>
                <Text style={styles.rapper}>Make</Text>
              </LinearGradient>
              <TextInput
                style={styles.small}
                onChangeText={text => this.setState({make: text})}
                value={make}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={{width: '40%'}}>
              <LinearGradient colors={['#000000', '#9C1313']}>
                <Text style={styles.rapper}>Model</Text>
              </LinearGradient>
              <TextInput
                style={styles.small}
                onChangeText={text => this.setState({model: text})}
                value={model}
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
            }}>
            <View style={{width: '40%'}}>
              <LinearGradient colors={['#000000', '#9C1313']}>
                <Text style={styles.rapper}>Serial #</Text>
              </LinearGradient>
              <TextInput
                style={styles.small}
                onChangeText={text => this.setState({serial: text})}
                value={serial}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={{width: '40%'}}>
              <LinearGradient colors={['#000000', '#9C1313']}>
                <Text style={styles.rapper}>Caliber</Text>
              </LinearGradient>
              <TextInput
                style={styles.small}
                onChangeText={text => this.setState({caliber: text})}
                value={caliber}
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
            }}>
            <View style={{width: '40%'}}>
              <LinearGradient colors={['#000000', '#9C1313']}>
                <Text style={styles.rapper}>Rounds Fired</Text>
              </LinearGradient>
              <TextInput
                style={styles.small}
                onChangeText={text => this.setState({fire: text})}
                value={fire}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={{width: '40%'}}>
              <LinearGradient colors={['#000000', '#9C1313']}>
                <Text style={styles.rapper}>Rounds on Hand</Text>
              </LinearGradient>
              <TextInput
                style={styles.small}
                onChangeText={text => this.setState({hand: text})}
                value={hand}
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
            }}>
            <View style={{width: '40%'}}>
              <LinearGradient colors={['#000000', '#9C1313']}>
                <Text style={styles.rapper}>When Purchased</Text>
              </LinearGradient>
              <TextInput
                style={styles.small}
                onChangeText={text => this.setState({whenPurchase: text})}
                value={whenPurchase}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={{width: '40%'}}>
              <LinearGradient colors={['#000000', '#9C1313']}>
                <Text style={styles.rapper}>Where it Purchased</Text>
              </LinearGradient>
              <TextInput
                style={styles.small}
                onChangeText={text => this.setState({Where: text})}
                value={Where}
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
            }}>
            <View style={{width: '40%'}}>
              <LinearGradient colors={['#000000', '#9C1313']}>
                <Text style={styles.rapper}>Barrel Length</Text>
              </LinearGradient>
              <TextInput
                style={styles.small}
                onChangeText={text => this.setState({bLength: text})}
                value={bLength}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={{width: '40%'}}>
              <LinearGradient colors={['#000000', '#9C1313']}>
                <Text style={styles.rapper}>Barrel Twist</Text>
              </LinearGradient>
              <TextInput
                style={styles.small}
                onChangeText={text => this.setState({bTwist: text})}
                value={bTwist}
                underlineColorAndroid="transparent"
              />
            </View>
          </View>
          <View
            style={{
              marginTop: 20,
              width: '90%',
              // backgroundColor: 'tomato',
              alignSelf: 'center',
              // justifyContent: 'space-around',
              // flexDirection: 'row',
            }}>
            <View style={{width: '45%'}}>
              <LinearGradient colors={['#000000', '#9C1313']}>
                <Text style={styles.rapper}>Barrel Manufacture</Text>
              </LinearGradient>
              <TextInput
                style={styles.small}
                onChangeText={text => this.setState({bManu: text})}
                value={bManu}
                underlineColorAndroid="transparent"
              />
            </View>
          </View>
          <View style={{width: '90%', alignSelf: 'center', marginTop: 10}}>
            <LinearGradient colors={['#000000', '#9C1313']}>
              <Text style={styles.rapper}>Notes</Text>
            </LinearGradient>
            <TextInput
              style={styles.small}
              multiline
              // numberOfLines={3}
              onChangeText={text => this.setState({notes: text})}
              value={notes}
              underlineColorAndroid="transparent"
            />
          </View>
          <ImageBackground
            style={{
              height: null,
              width: '65%',
              resizeMode: 'cover',
              borderRadius: 40,
              marginLeft: 15,
              alignSelf: 'flex-start',
              marginTop: 20,
              // alignItems: 'center',
            }}
            source={button}
            imageStyle={{borderRadius: 10}}>
            <TouchableOpacity onPress={this.imgePicker}>
              <Text
                style={{
                  color: 'white',
                  // backgroundColor: theme.colors.gray,
                  padding: 20,
                  fontSize: 12,
                  marginLeft: 10,
                  // textAlign: 'center',
                  // borderRadius: 5,
                }}>
                + Add More Pictures
              </Text>
            </TouchableOpacity>
          </ImageBackground>

          <View style={{marginTop: 10}}>
            <ImageBackground
              borderRadius={10}
              source={
                this.state.image
                  ? {
                      uri: `${this.state.image}`,
                    }
                  : user
              }
              // borderRadius={80}
              style={styles.userImgStyle}
              resizeMode={'cover'}
            />
          </View>

          <View
            style={{
              marginTop: 10,
              width: '100%',
              justifyContent: 'space-around',
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <ImageBackground
              style={{
                flex: 0.4,
                height: null,
                width: null,
                resizeMode: 'cover',
                // borderRadius: 40,
              }}
              source={button}
              imageStyle={{borderRadius: 10}}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('MissingGun');
                }}>
                <Text
                  style={{
                    color: 'white',
                    //  backgroundColor: theme.colors.gray,
                    padding: 20,
                    textAlign: 'center',
                    // borderRadius: 5,
                  }}>
                  Log Stolen Gun
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
                    this.add();
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      // backgroundColor: '#A50202',
                      padding: 20,
                      textAlign: 'center',
                      // borderRadius: 5,
                    }}>
                    Save
                  </Text>
                </TouchableOpacity>
              )}
            </ImageBackground>
          </View>
        </ScrollView>
      </View>
    );
  }
}
