import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  FlatList,
  ImageBackground,
  Image,
} from 'react-native';
import styles from './styles';
import theme from '../../theme';
import {Header, Divider} from 'react-native-elements';
import {user, button} from '../../assets';
import HeaderCenterComponent from '../../components/HeaderCenterComponent';
import HeaderLeftComponent from '../../components/HeaderLeftComponent';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import LinearGradient from 'react-native-linear-gradient';
export default class GunReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ammo: [],
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
          status: child.val().status,
          optic: child.val().optic,
        });
      });
      this.setState({ammo: li});
      console.log('ammo====> \n', li);
    });
  }
  datarender = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('StolenData', {item});
        }}
        key={index}>
        <LinearGradient
          colors={['#000000', '#9C1313']}
          style={{
            flex: 1,
            marginTop: 20,
            width: '90%',
            // backgroundColor: theme.colors.primary,
            alignSelf: 'center',
            padding: 10,
            borderRadius: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Image
            borderRadius={25}
            source={{uri: `${item.img}`}}
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
              {item.name}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: 'white',
              }}>
              {`${item.serial} - ${item.status}`}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 12,
              color: 'white',
              textAlign: 'center',
              alignSelf: 'center',
            }}>
            View
          </Text>
        </LinearGradient>
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
        <View style={{alignItems: 'center', marginTop: 30}}>
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
        <FlatList
          data={this.state.ammo}
          extraData={this.state}
          contentContainerStyle={
            {
              // alignSelf: 'center',
            }
          }
          showsHorizontalScrollIndicator={false}
          renderItem={this.datarender}
          // numColumns={2}
          keyExtractor={(item, index) => item + index.toString()}
        />
      </View>
    );
  }
}
