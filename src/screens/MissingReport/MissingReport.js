import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from './styles';
import theme from '../../theme';
import {Header, Divider} from 'react-native-elements';
import {user, m416, akm, tommy} from '../../assets';
import HeaderCenterComponent from '../../components/HeaderCenterComponent';
import HeaderLeftComponent from '../../components/HeaderLeftComponent';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Snackbar from 'react-native-snackbar';
import RNFS from 'react-native-fs';
export default class MissingReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filePath: '',
      make: 'Germany',
      buton: '',
      show: false,
      model: 'hk416',
      caliber: '5.56mm x 45',
      serial: '1962 AMC M422A1',
      optic: 'M .approx. 481.0 mm',
      status: 'stolen',
      fire: '500',
      hand: '400',
      whenPurchase: '17-2-2020',
      Where: 'NY, Gun Street',
      bLength: '125cm',
      bTwist: 'HK416',
      bManu: '12',
      ammo: [
        {
          id: 0,
          name: 'M416',
          img: user,
          status: 'stolen',
          serial: '1962 AMC M422A1',
        },
        {
          id: 0,
          name: 'AKM',
          img: user,
          status: 'lost',
          serial: '1962 AMC M422A1',
        },
        {
          id: 0,
          name: 'AWM',
          img: user,
          status: 'stolen',
          serial: '1962 AMC M422A1',
        },
      ],
      details:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor lorem ut mattis consectetur. Duis suscipit urna vehicula ante luctus sodales sed in nisi.',
    };
  }
  componentDidMount() {
    const make = this.props.navigation.getParam('make');
    const model = this.props.navigation.getParam('model');
    const Where = this.props.navigation.getParam('Where');
    const bLength = this.props.navigation.getParam('bLength');
    const bTwist = this.props.navigation.getParam('bTwist');
    const details = this.props.navigation.getParam('notes');
    const whenPurchase = this.props.navigation.getParam('whenPurchase');
    const hand = this.props.navigation.getParam('hand');
    const fire = this.props.navigation.getParam('fire');
    const optic = this.props.navigation.getParam('optic');
    const serial = this.props.navigation.getParam('serial');
    const caliber = this.props.navigation.getParam('caliber');
    const bManu = this.props.navigation.getParam('bManu');

    this.setState({
      make,
      model,
      whenPurchase,
      Where,
      bLength,
      bTwist,
      details,
      hand,
      fire,
      optic,
      serial,
      caliber,
      bManu,
    });
  }

  async htmltopdf() {
    let options = {
      // HTML Content for PDF.
      // I am putting all the HTML code in Single line but if you want to use large HTML code then you can use + Symbol to add them.
      html: `<h1 style="text-align: center;"><strong>Shooters Ready</strong></h1>
      <p style=" font-family: courier;",
     " font-family: verdana;",
      "font-size: 80%;",
      "margin-left:10%;">Gun Model: hk416</p>
      <p style=" font-family: courier;",
      " font-family: verdana;",
       "font-size: 80%;",
       "margin-left:10%;">Gun Make: Germany</p>
     <p style=" font-family: courier;",
       " font-family: verdana;",
       "font-size: 80%;",
      "margin-left:10%;">Notes: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor lorem ut mattis consectetur. Duis suscipit urna vehicula ante luctus sodales sed in nisi.</p>
      `,
      fileName: `${this.state.serial}`,

      //File directory in which the PDF File Will Store.
      // directory: 'Download',
    };

    let file = await RNHTMLtoPDF.convert(options);
    var path = RNFS.DocumentDirectoryPath + '/Shooter_Ready.pdf';

    // write the file
    RNFS.writeFile(path, file, 'utf8')
      .then(success => {
        console.log('FILE WRITTEN!');
      })
      .catch(err => {
        console.log(err.message);
      });
    console.log(file);

    Snackbar.show({
      text: `Pdf is stored in ${file.filePath}`,
      backgroundColor: 'black',
      duration: Snackbar.LENGTH_LONG,
    });

    this.setState({filePath: file.filePath, show: true});
    // this.handleHelp();
  }

  render() {
    const {model, serial, status, filePath, show} = this.state;
    const resources = {
      file: filePath,
      // url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      base64: 'JVBERi0xLjMKJcfs',
    };
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
        <View style={{alignItems: 'center', marginTop: 30}}>
          <Divider
            style={{
              backgroundColor: theme.colors.primary,
              height: 1,
              width: '50%',
            }}
          />
          <TouchableOpacity activeOpacity={1} style={[styles.button]}>
            <Text style={[styles.loginText]}>Missing/Stolen Reports</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            this.htmltopdf();
          }}>
          <LinearGradient
            colors={['#000000', '#9C1313']}
            style={{
              // flex: 1,
              marginTop: 20,
              width: '90%',
              backgroundColor: theme.colors.primary,
              alignSelf: 'center',
              padding: 10,
              borderRadius: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Image
              borderRadius={25}
              source={user}
              style={{height: 50, width: 50}}
            />
            <View
              style={{
                // backgroundColor: 'tomato',
                width: '65%',
                justifyContent: 'space-around',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                {model}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: 'white',
                }}>
                {`${serial} - ${status}`}
              </Text>
            </View>
            <AntDesign
              style={{
                color: 'white',
                textAlign: 'center',
                alignSelf: 'center',
              }}
              name="arrowdown"
              color="white"
              size={20}
            />
          </LinearGradient>
        </TouchableOpacity>
        {/* {show ? (
          <PDFView
            fadeInDuration={250.0}
            style={{flex: 1}}
            resource={resources['file']}
            resourceType={'file'}
            onLoad={() => console.log(`PDF rendered from `)}
            onError={error => console.log('Cannot render PDF', error)}
            enableAnnotations
          />
        ) : null} */}
      </View>
    );
  }
}
