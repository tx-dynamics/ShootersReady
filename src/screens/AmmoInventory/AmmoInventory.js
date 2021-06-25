import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Animated,
} from 'react-native';
import {button} from '../../assets';
import theme from '../../theme';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {Header, Divider} from 'react-native-elements';
import HeaderCenterComponent from '../../components/HeaderCenterComponent';
import HeaderLeftComponent from '../../components/HeaderLeftComponent';
import LinearGradient from 'react-native-linear-gradient';
import {Dimensions} from 'react-native';
export default class AmmoInventory extends Component {
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
    const ammo = database().ref('Ammo/' + user);
    ammo.on('value', userdata => {
      var li = [];
      userdata.forEach(child => {
        li.push({
          id: child.key,
          name: child.val().caliber,
          date: child.val().date,
          fireround: child.val().fireround,
          lot: child.val().lot,
          remaining: child.val().remaining,
          rounds: child.val().rounds,
          ammunation: child.val().ammunation,
        });
      });
      this.setState({ammo: li});
    });
  }
  datarender = ({item, index}) => {
    return (
      <TouchableOpacity
        // onPress={() => {
        //   this.props.navigation.navigate('GunLoadData');
        // }}
        key={index}>
        <LinearGradient
          colors={['#000000', '#9C1313']}
          style={{
            flex: 1,
            marginTop: 20,
            width: '90%',
            // backgroundColor: theme.colors.primary,
            alignSelf: 'center',
            padding: 20,
            borderRadius: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: '45%',
              justifyContent: 'space-around',
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: 'white',
              }}>
              {item.name}
            </Text>

            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: 'white',
              }}>
              Caliber
            </Text>
          </View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: 'white',
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
        <View
          style={{
            alignItems: 'center',
            marginTop: 30,
            // flex: 0.1,
          }}>
          <Divider
            style={{
              backgroundColor: theme.colors.primary,
              height: 1,
              width: '50%',
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            // backgroundColor: 'tomato',
            width: '80%',
            // justifyContent: 'space-around',
            alignSelf: 'center',
            alignItems: 'center',
            marginLeft: Dimensions.get('screen').width / 3,
          }}>
          <View
            style={{
              marginTop: 20,
              width: '80%',
              // justifyContent: 'space-around',
              flexDirection: 'row',
              marginBottom: 20,
              alignSelf: 'flex-end',
              // backgroundColor: 'tomato',
            }}>
            <ImageBackground
              style={{
                flex: 0.55,
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
                  Ammo Inventory
                </Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>

          <TouchableOpacity
            // style={{alignSelf: 'center'}}
            onPress={() => {
              this.props.navigation.navigate('Addammo');
            }}>
            <Text
              style={{
                textAlign: 'left',
                // marginRight: 10,
                fontWeight: 'bold',
                fontSize: 16,
                right: 20,
              }}>
              + add
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={this.state.ammo && this.state.ammo}
          extraData={this.state.ammo}
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
