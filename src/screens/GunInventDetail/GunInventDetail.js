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
  Animated,
} from 'react-native';
import styles from './styles';
import DocumentPicker from 'react-native-document-picker';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import theme from '../../theme';
import {Header, Divider} from 'react-native-elements';
import {button, user} from '../../assets';
import HeaderCenterComponent from '../../components/HeaderCenterComponent';
import HeaderLeftComponent from '../../components/HeaderLeftComponent';
import LinearGradient from 'react-native-linear-gradient';
import Mailer from 'react-native-mail';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
export default class GunInventDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upimg: '',
      ms: [],
      gid: '',
      make: 'Germany',
      img: '',
      model: 'hk416',
      caliber: '5.56mm x 45',
      space: '',
      serial: '1962 AMC M422A1',
      optic: 'M .approx. 481.0 mm',
      fire: '500',
      hand: '400',
      whenPurchase: '17-2-2020',
      Where: 'NY, Gun Street',
      bLength: '',
      bTwist: 'HK416',
      bManu: '',
      notes:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor lorem ut mattis consectetur. Duis suscipit urna vehicula ante luctus sodales sed in nisi.',
      loadData: [{id: 1}, {id: 2}, {id: 3}],
    };
  }
  componentDidMount() {
    this.getData();
  }
  async htmltopdf() {
    let options = {
      // HTML Content for PDF.
      // I am putting all the HTML code in Single line but if you want to use large HTML code then you can use + Symbol to add them.
      html: `<h1 style="text-align: center;"><strong>Shooters Ready</strong></h1>
      <p style=" font-family: courier;",
     " font-family: verdana;",
      "font-size: 80%;",
      "margin-left:10%;">Gun Model: ${this.state.model}</p>
      <p style=" font-family: courier;",
      " font-family: verdana;",
       "font-size: 80%;",
       "margin-left:10%;">Gun Make: ${this.state.model}</p>
       <p style=" font-family: courier;",
       " font-family: verdana;",
        "font-size: 80%;",
        "margin-left:10%;">Gun Status: ${this.state.status}</p>
       <p style=" font-family: courier;",
       " font-family: verdana;",
        "font-size: 80%;",
        "margin-left:10%;">Gun Caliber: ${this.state.caliber}</p>
        <p style=" font-family: courier;",
        " font-family: verdana;",
         "font-size: 80%;",
         "margin-left:10%;">Gun Serial: ${this.state.serial}</p>
         <p style=" font-family: courier;",
         " font-family: verdana;",
          "font-size: 80%;",
          "margin-left:10%;">Gun Optic: ${this.state.optic}</p>
          <p style=" font-family: courier;",
          " font-family: verdana;",
           "font-size: 80%;",
           "margin-left:10%;">Rounds Fired: ${this.state.fire}</p>
           <p style=" font-family: courier;",
           " font-family: verdana;",
            "font-size: 80%;",
            "margin-left:10%;">Rounds on Hands: ${this.state.hand}</p>
            <p style=" font-family: courier;",
            " font-family: verdana;",
             "font-size: 80%;",
             "margin-left:10%;">Where it Purchased: ${this.state.Where}</p>
             <p style=" font-family: courier;",
             " font-family: verdana;",
              "font-size: 80%;",
              "margin-left:10%;">When Purchased: ${this.state.whenPurchase}</p>
              <p style=" font-family: courier;",
              " font-family: verdana;",
               "font-size: 80%;",
               "margin-left:10%;">Barrel Length: ${this.state.bLength}</p>
               <p style=" font-family: courier;",
               " font-family: verdana;",
                "font-size: 80%;",
                "margin-left:10%;">Barrel Twist: ${this.state.bTwist}</p>
                <p style=" font-family: courier;",
                " font-family: verdana;",
                 "font-size: 80%;",
                 "margin-left:10%;">Barrel Manufacture: ${this.state.bManu}</p>
                 <p style=" font-family: courier;",
                 " font-family: verdana;",
                  "font-size: 80%;",
                  "margin-left:10%;">Notes: ${this.state.details}</p>
      `,
      fileName: `${this.state.serial}`,

      //File directory in which the PDF File Will Store.
      directory: 'Download',
    };

    let file = await RNHTMLtoPDF.convert(options);

    console.log(file);

    Snackbar.show({
      text: `Pdf is stored in ${file.filePath}`,
      backgroundColor: 'black',
      duration: Snackbar.LENGTH_LONG,
    });

    this.setState({filePath: file.filePath, show: true});
    this.handleHelp(filePath);
  }
  dataLoad(id) {
    const {gid} = this.state;
    this.setState({imgid: id});
    const user = auth().currentUser.uid;

    const data = database().ref('users/' + user + '/gun/' + id + '/data');
    data.on('value', userdata => {
      var li = [];
      userdata.forEach(child => {
        li.push({
          id: child.key,
        });
      });
      console.log('lii', li);
      this.setState({loadData: li});
    });
    // this.updateImg(id);
  }
  handleHelp() {
    console.log('HERE');
    Mailer.mail(
      {
        subject: 'Shooter Ready',
        // recipients: ['malikmati49@gmail.com'],
        attachment: [
          {
            // uri: RNFS.ExternalDirectoryPath+file,
            // path: file, // The absolute path of the file from which to read data.
            type: '.pdf', // Mime Type: jpg, png, doc, ppt, html, pdf
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

  getData() {
    const data = this.props.navigation.getParam('item');
    this.setState({
      make: data.make,
      img: data.img,
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
      gid: data,
      upimg: data.img,
    });
    console.log('data====>', data);
    this.dataLoad(data.id);
  }
  imgePicker = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      res.map(item=>{
        this.setState({upimg: item.uri});
        this.uploadmultimedia(item.uri);
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };
  async uploadmultimedia(uri) {
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
    var imageRef = storage().ref('users/gun/' + timestamp + '/');

    return imageRef
      .put(blob)
      .then(() => {
        blob.close();
        return imageRef.getDownloadURL();
      })
      .then(dwnldurl => {
        console.log(dwnldurl);
        this.setState({upimg: dwnldurl});
      });
  }
  updateImg(id) {
    const {img, upimg} = this.state;
    console.log('gidddd==', id);

    const user = auth().currentUser.uid;
    const data = database().ref('users/' + user + '/gun/' + id);
    if (img !== upimg) {
      console.log('here');
      data
        .update({img})
        .then(res => console.log('image uploaded'))
        .catch(err => alert(err.message));
    }
  }
  datarender = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('GunLoadData', {
            item,
            gid: this.state.gid,
          });
        }}
        key={index}
        style={{
          flex: 1,
          marginTop: 20,
          width: '90%',
          backgroundColor: theme.colors.gray,
          alignSelf: 'center',
          // padding: 20,
          borderRadius: 10,
        }}>
        <LinearGradient
          colors={['#000000', '#9C1313']}
          style={{
            // flex: 1,
            // marginTop: 20,
            width: '100%',
            // backgroundColor: theme.colors.gray,
            // alignSelf: 'center',
            padding: 20,
            borderRadius: 10,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: 'white',
            }}>{`Load Data ${++index}`}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };
  render() {
    const {
      make,
      gid,
      model,
      caliber,
      space,
      serial,
      optic,
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
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Main');
                }}>
                <Text
                  style={{
                    color: 'white',
                    // backgroundColor: '#A50202',
                    padding: 20,
                    textAlign: 'center',
                    // borderRadius: 5,
                  }}>
                  Gun Inventory
                </Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>
        </View>
        <ScrollView style={{flexGrow: 1}}>
          <View style={{marginTop: 5}}>
            <Image
              source={
                this.state.upimg
                  ? {
                      uri: `${this.state.upimg}`,
                    }
                  : user
              }
              borderRadius={10}
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
            }}>
            <View style={{width: '40%'}}>
              <LinearGradient colors={['#000000', '#9C1313']}>
                <Text style={styles.rapper}>Make</Text>
              </LinearGradient>
              <Text style={styles.small}>{make}</Text>
            </View>
            <View style={{width: '40%'}}>
              <LinearGradient colors={['#000000', '#9C1313']}>
                <Text style={styles.rapper}>Model</Text>
              </LinearGradient>
              <Text style={styles.small}>{model}</Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 10,
              width: '100%',
              justifyContent: 'space-around',
              flexDirection: 'row',
            }}>
            <View style={{width: '40%'}}>
              <LinearGradient colors={['#000000', '#9C1313']}>
                <Text style={styles.rapper}>Caliber</Text>
              </LinearGradient>
              <Text style={styles.small}>{caliber}</Text>
            </View>
            <View style={{width: '40%'}}>
              <LinearGradient colors={['#000000', '#9C1313']}>
                <Text style={styles.rapper}>Head Space</Text>
              </LinearGradient>
              <Text style={styles.small}>{space}</Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 10,
              width: '100%',
              justifyContent: 'space-around',
              flexDirection: 'row',
            }}>
            <View style={{width: '40%'}}>
              <LinearGradient colors={['#000000', '#9C1313']}>
                <Text style={styles.rapper}>Serial #</Text>
              </LinearGradient>
              <Text style={styles.small}>{serial}</Text>
            </View>
            <View style={{width: '40%'}}>
              <LinearGradient colors={['#000000', '#9C1313']}>
                <Text style={styles.rapper}>Optics</Text>
              </LinearGradient>
              <Text style={styles.small}>{optic}</Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 10,
              width: '100%',
              justifyContent: 'space-around',
              flexDirection: 'row',
            }}>
            <View style={{width: '40%'}}>
              <LinearGradient colors={['#000000', '#9C1313']}>
                <Text style={styles.rapper}>Roundns Fired</Text>
              </LinearGradient>
              <Text style={styles.small}>{fire}</Text>
            </View>
            <View style={{width: '40%'}}>
              <LinearGradient colors={['#000000', '#9C1313']}>
                <Text style={styles.rapper}>Rounds on Hands</Text>
              </LinearGradient>
              <Text style={styles.small}>{hand}</Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 10,
              width: '100%',
              justifyContent: 'space-around',
              flexDirection: 'row',
            }}>
            <View style={{width: '40%'}}>
              <LinearGradient colors={['#000000', '#9C1313']}>
                <Text style={styles.rapper}>When Purchased</Text>
              </LinearGradient>
              <Text style={styles.small}>{whenPurchase}</Text>
            </View>
            <View style={{width: '40%'}}>
              <LinearGradient colors={['#000000', '#9C1313']}>
                <Text style={styles.rapper}>Where it Purchased</Text>
              </LinearGradient>
              <Text style={styles.small}>{Where}</Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 10,
              width: '100%',
              justifyContent: 'space-around',
              flexDirection: 'row',
            }}>
            <View style={{width: '40%'}}>
              <LinearGradient colors={['#000000', '#9C1313']}>
                <Text style={styles.rapper}>Barrel Length</Text>
              </LinearGradient>
              <Text style={styles.small}>{bLength}</Text>
            </View>
            <View style={{width: '40%'}}>
              <LinearGradient colors={['#000000', '#9C1313']}>
                <Text style={styles.rapper}>Barrel Twist</Text>
              </LinearGradient>
              <Text style={styles.small}>{bTwist}</Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 10,
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
              <Text style={styles.small}>{bManu}</Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 10,
              width: '100%',
              justifyContent: 'space-around',
              flexDirection: 'row',
              alignItems: 'center',
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
              <TouchableOpacity>
                <Text
                  style={{
                    color: 'white',
                    // backgroundColor: theme.colors.gray,
                    padding: 20,
                    textAlign: 'center',
                    fontSize: 12,
                    // borderRadius: 5,
                  }}>
                  Load Data Saved
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
                  this.props.navigation.navigate('GunLoadData', {gid: gid});
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 12,
                    padding: 20,
                    textAlign: 'center',
                  }}>
                  + Load Data
                </Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>

          <FlatList
            data={this.state.loadData}
            extraData={this.state.data}
            showsHorizontalScrollIndicator={false}
            renderItem={this.datarender}
            keyExtractor={(item, index) => item + index.toString()}
          />
          <View style={{width: '90%', alignSelf: 'center', marginTop: 10}}>
            <LinearGradient colors={['#000000', '#9C1313']}>
              <Text style={styles.rapper}>Notes</Text>
            </LinearGradient>
            <Text style={styles.small}>{notes}</Text>
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
                  // textAlign: 'center',
                  // borderRadius: 5,
                }}>
                + Add More Pictures
              </Text>
            </TouchableOpacity>
          </ImageBackground>

          <View style={{marginTop: 10}}>
            <ImageBackground
              source={
                this.state.img !== ''
                  ? {
                      uri: `${this.state.img}`,
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
              marginTop: 20,
              width: '100%',
              justifyContent: 'space-around',
              flexDirection: 'row',
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
                onPress={() => {
                  this.props.navigation.navigate('MissingGun');
                }}>
                <Text
                  style={{
                    color: 'white',
                    // backgroundColor: theme.colors.gray,
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
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('AddGun',{screen:'edit',gid});
                }}>
                <Text
                  style={{
                    color: 'white',
                    // backgroundColor: '#A50202',
                    padding: 20,
                    textAlign: 'center',
                    // borderRadius: 5,
                  }}>
                  Edit
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
                onPress={() =>
                  this.props.navigation.navigate('MissingReport', {
                    make,
                    model,
                    serial,
                    caliber,
                    serial,
                    optic,
                    fire,
                    hand,
                    whenPurchase,
                    Where,
                    bLength,
                    bManu,
                    bTwist,
                    notes,
                  })
                }>
                <Text
                  style={{
                    color: 'white',
                    // backgroundColor: theme.colors.gray,
                    padding: 20,
                    textAlign: 'center',
                    borderRadius: 5,
                  }}>
                  Print
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
              <TouchableOpacity onPress={() => this.handleHelp()}>
                <Text
                  style={{
                    color: 'white',
                    // backgroundColor: theme.colors.gray,
                    padding: 20,
                    textAlign: 'center',
                    borderRadius: 5,
                    alignSelf: 'center',
                  }}>
                  Email
                </Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>
        </ScrollView>
      </View>
    );
  }
}
