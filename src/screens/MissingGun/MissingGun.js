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
import theme from '../../theme';
import {Header, Divider, SearchBar} from 'react-native-elements';
import {user, button} from '../../assets';
import HeaderCenterComponent from '../../components/HeaderCenterComponent';
import HeaderLeftComponent from '../../components/HeaderLeftComponent';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import LinearGradient from 'react-native-linear-gradient';
export default class MissingGun extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dat: [],
      search: '',
      data: [],
    };
  }
  componentDidMount() {
    this.getData();
  }
  getData() {
    const user = auth().currentUser.uid;
    const data = database().ref('MissingGun/' + user);
    data.on('value', userdata => {
      var li = [];
      userdata.forEach(child => {
        li.push({
          id: child.key,
          serial: child.val().serial,
          img: child.val().image,
          make: child.val().make,
          model: child.val().model,
          caliber: child.val().caliber,
          fire: child.val().fire,
          hand: child.val().hand,
          notes: child.val().notes,
          whenPurchase: child.val().whenPurchase,
          where: child.val().Where,
          bLength: child.val().blength,
          bManu: child.val().bManu,
          bTwist: child.val().bTwist,
          name: child.val().model,
        });
      });
      this.setState({dat: li, data: li});
    });
  }
  updateSearch = search => {
    this.setState({search});
    let text = search.toLowerCase();
    let dat = this.state.dat;
    const newData = dat.filter(srch => {
      return srch.serial.toLowerCase().match(text);
    });
    console.log(newData);
    this.setState({data: newData});
  };
  renderGun = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('GunInventDetail', {item});
        }}
        key={index}
        style={{
          flex: 0.5,
          // marginHorizontal: 5,
          alignContent: 'center',
          alignSelf: 'center',
          margin: 10,
          marginRight: 10,
        }}>
        <Image
          borderTopLeftRadius={10}
          borderTopRightRadius={10}
          resizeMode={'cover'}
          source={
            item.img
              ? {
                  uri: `${item.img}`,
                }
              : user
          }
          style={{
            height: 175,
            width: 175,
            // justifyContent: 'flex-end',
            // backgroundColor: 'tomato',
            alignItems: 'center',
            justifyContent: 'flex-end',
            alignSelf: 'center',
            // margin: 5,
            // padding: 20,
          }}
        />
        <View>
          <LinearGradient
            colors={['#000000', '#9C1313']}
            style={{
              // backgroundColor: theme.colors.primary,
              width: 175,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              padding: 10,
              alignSelf: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 14,
                marginLeft: 10,
              }}>
              {item.model}
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                marginLeft: 10,
                color: 'white',
              }}>
              {item.serial}
            </Text>
          </LinearGradient>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
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
        <View>
          <SearchBar
            placeholder="Enter Serial No."
            value={this.state.search}
            onClear={() => this.setState({data: this.state.dat})}
            containerStyle={styles.searchContainer}
            inputContainerStyle={styles.inputStyle}
            onChangeText={search => {
              this.updateSearch(search);
            }}
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
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('AddGun', {screen: 'missing'});
              }}>
              <Text
                style={{
                  color: 'white',
                  // backgroundColor: '#A50202',
                  padding: 20,
                  textAlign: 'center',
                }}>
                + Add Gun
              </Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>

        <FlatList
          data={this.state.data && this.state.data}
          extraData={this.state.dat}
          showsHorizontalScrollIndicator={false}
          renderItem={this.renderGun}
          numColumns={2}
          keyExtractor={(item, index) => item + index.toString()}
        />
      </View>
    );
  }
}
