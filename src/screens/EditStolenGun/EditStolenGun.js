import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import styles from './styles';
import theme from '../../theme';
import {Header, Divider} from 'react-native-elements';
import {user, button} from '../../assets';
import HeaderCenterComponent from '../../components/HeaderCenterComponent';
import HeaderLeftComponent from '../../components/HeaderLeftComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Mailer from 'react-native-mail';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import DocumentPicker from 'react-native-document-picker';
import LinearGradient from 'react-native-linear-gradient';
export default class EditStolenGun extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: [],
      gid: '',
      make: 'Germany',
      model: 'hk416',
      caliber: '5.56mm x 45',
      status: 'stolen',
      serial: '1962 AMC M422A1',
      optic: 'M .approx. 481.0 mm',
      fire: '500',
      hand: '400',
      whenPurchase: '17-2-2020',
      Where: 'NY, Gun Street',
      bLength: '',
      bTwist: 'HK416',
      bManu: '',
      filePath: '',
      image: '',
      isLoading: false,
      notes:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor lorem ut mattis consectetur. Duis suscipit urna vehicula ante luctus sodales sed in nisi.',
    };
  }
  handleHelp() {
    console.log('HERE');
    var file = this.state.filePath;
    Mailer.mail(
      {
        subject: 'Shooter Ready',
        recipients: ['malikmati49@gmail.com'],
        body: 'PFA',
        attachment: [
          {
            uri: file,
            path: file, // The absolute path of the file from which to read data.
            type: 'pdf', // Mime Type: jpg, png, doc, ppt, html, pdf
            name: 'Shooter Ready', // Optional: Custom filename for attachment
          },
        ],
      },
      (error, event) => {
        if (error) {
          AlertIOS.alert(
            'Error',
            'Could not send mail. Please send a mail to support@example.com',
          );
        }
      },
    );
  }
  requestRunTimePermission = () => {
    var that = this;
    async function externalStoragePermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs access to Storage data.',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          that.htmltopdf();
        } else {
          Alert.alert('WRITE_EXTERNAL_STORAGE permission denied');
        }
      } catch (err) {
        Alert.alert('Write permission err', err);
        console.warn(err);
      }
    }

    if (Platform.OS === 'android') {
      externalStoragePermission();
    } else {
      this.htmltopdf();
    }
  };
  async htmltopdf() {
    let options = {
      // HTML Content for PDF.
      // I am putting all the HTML code in Single line but if you want to use large HTML code then you can use + Symbol to add them.
      html: `<h1 style="text-align: center;"><strong>Shooters Ready</strong></h1><p style="text-align: center;">In This Tutorial we would learn about creating PDF File using HTML Text.</p><p style="text-align: center;"><strong>ReactNativeCode.com</strong></p>`,
      // Setting UP File Name for PDF File.
      fileName: 'Shooter_Ready',

      //File directory in which the PDF File Will Store.
      directory: 'Download',
    };

    let file = await RNHTMLtoPDF.convert(options);

    console.log(file.filePath);

    Alert.alert(file.filePath);

    this.setState({filePath: file.filePath});
    this.handleHelp();
  }
  componentDidMount() {
    this.getData();
  }
  getData() {
    const item = this.props.navigation.getParam('item');
    console.log('Edit====>', item);
    this.setState({
      make: item.make,
      model: item.model,
      serial: item.serial,
      caliber: item.caliber,
      bTwist: item.bTwist,
      optic: item.optic,
      notes: item.notes,
      status: item.status,
      image: item.img,
      gid: item.id,
    });
  }
  imgePicker = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      this.setState({image: res.uri}, this.uploadmultimedia);

      console.log(res.uri);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };
  async uploadmultimedia() {
    const user = auth().currentUser;
    console.log(this.state.image);
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
      xhr.open('GET', this.state.image, true); // fetch the blob from uri in async mode
      xhr.send(null); // no initial data
    });
    var timestamp = new Date().getTime();
    var imageRef = storage().ref(`users/MissingGun/` + timestamp + '/');

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
      gid,
      status,
      make,
      model,
      caliber,
      serial,
      optic,
      bTwist,
      image,
      notes,
    } = this.state;
    console.log('image=>>>', gid);

    const data = {
      status,
      make,
      model,
      caliber,
      serial,
      optic,
      bTwist,
      image,
      notes,
    };

    var curuser = auth().currentUser;

    var gundata = database().ref('MissingGun/' + curuser.uid + '/' + gid);

    gundata
      .update(data)
      .then(res => {
        console.log('====>>>', res);
        this.setState({isLoading: false}, () =>
          this.props.navigation.navigate('GunReport'),
        );
      })
      .catch(error => {
        var errorMessage = error.message;
        console.log(errorMessage);
        this.setState({isLoading: false}, () => {
          alert(errorMessage);
        });
      });
  }

  render() {
    const {
      status,
      make,
      model,
      caliber,
      serial,
      optic,
      bTwist,
      image,
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
            marginTop: 10,
            // flex: 0.1,
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
                  Missing/Stolen Gun
                </Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>
        </View>
        <TouchableOpacity onPress={() => this.imgePicker()}>
          <ImageBackground
            resizeMode={'contain'}
            source={image ? {uri: `${image}`} : user}
            style={styles.userImgStyle}>
            <Ionicons name="camera" size={30} color="lightgray" />
            <Text style={{color: 'lightgray'}}>+ Add Picture</Text>
          </ImageBackground>
        </TouchableOpacity>

        <ScrollView style={{flex: 1, flexGrow: 1}}>
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
                onPress={() => {
                  this.setState({status: 'Stolen'});
                }}>
                <Text
                  style={{
                    color: status === 'Stolen' ? 'white' : 'black',
                    backgroundColor: status === 'Stolen' ? null : '#FCF6E6',
                    padding: 20,
                    textAlign: 'center',
                    borderRadius: 5,
                  }}>
                  Stolen
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
              <TouchableOpacity
                onPress={() => {
                  this.setState({status: 'lost'});
                }}>
                <Text
                  style={{
                    color: status === 'lost' ? 'white' : 'black',
                    backgroundColor: status === 'lost' ? null : '#FCF6E6',
                    padding: 20,
                    textAlign: 'center',
                    borderRadius: 5,
                  }}>
                  Lost
                </Text>
              </TouchableOpacity>
            </ImageBackground>
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
                <Text style={styles.rapper}>Twist</Text>
              </LinearGradient>
              <TextInput
                style={styles.small}
                onChangeText={text => this.setState({bTwist: text})}
                value={bTwist}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={{width: '40%'}}>
              <LinearGradient colors={['#000000', '#9C1313']}>
                <Text style={styles.rapper}>Optics</Text>
              </LinearGradient>
              <TextInput
                style={styles.small}
                onChangeText={text => this.setState({optic: text})}
                value={optic}
                underlineColorAndroid="transparent"
              />
            </View>
          </View>
          <View style={{width: '90%', alignSelf: 'center', marginTop: 10}}>
            <LinearGradient colors={['#000000', '#9C1313']}>
              <Text style={styles.rapper}>Details : How Stolen/Lost</Text>
            </LinearGradient>
            <TextInput
              style={styles.small}
              multiline
              onChangeText={text => this.setState({notes: text})}
              value={notes}
              underlineColorAndroid="transparent"
            />
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
