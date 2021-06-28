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
  Picker,
} from 'react-native';
import styles from './styles';

import theme from '../../theme';
import {Header, Divider} from 'react-native-elements';
import {button} from '../../assets';
import HeaderCenterComponent from '../../components/HeaderCenterComponent';
import HeaderLeftComponent from '../../components/HeaderLeftComponent';
import {bullets} from './bullets';
export default class BulletCalculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bulletcal: bullets,
      bname: [],
      storeArr: [],
      name: '',
      filter: '',
      coefficient: '.015',
      velocity: '1850',
      bweight: '20',
      values: {
        distanceUnits: 'Yards',
        distance: '500',
        chartStepping: '50',
        sizeInches: '1.5',
        sizeMils: '0',
        slantDegrees: '0',
        speedMPH: '0',
      },
      distance: '',
    };
  }

  setInput = value => {
    this.setState({filter: value});
    console.log(value);
    const data = this.state.bulletcal.map(item => {
      if (item.id === value) {
        this.setState({
          bname: [{id: item.id, no: item.name}],
          coefficient: item.coeff,
          velocity: item.velocity,
          bweight: item.grains,
        });
      }
    });
  };

  render() {
    const {filter, coefficient, velocity, bweight} = this.state;
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
        <View style={{alignItems: 'center', marginTop: 30, marginBottom: 15}}>
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
                  Drop Calculator
                </Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>
        </View>
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              // backgroundColor: 'tomato',
              marginTop: 20,
              width: '95%',
              alignSelf: 'center',
              justifyContent: 'space-around',
              marginBottom: 10,
            }}>
            <Text
              style={{fontSize: 14, fontWeight: 'bold', alignSelf: 'center'}}>
              Bullet Caliber
            </Text>
            <View style={{borderColor: 'black', borderWidth: 1, width: '60%'}}>
              <Picker
                selectedValue={this.state.filter}
                style={{
                  borderRadius: 5,
                  height: 35,
                  color: 'black',
                  // backgroundColor: 'black',
                }}
                containerStyle={{borderWidth: 1, borderColor: 'black'}}
                // prompt={'Select No of stores'}
                placeholder={'Select Stores'}
                onValueChange={value => {
                  this.setState(
                    {
                      filter: value,
                    },
                    () => {
                      this.setInput(value);
                    },
                  );
                }}>
                {this.state.bulletcal &&
                  this.state.bulletcal.map((item, index) => {
                    switch (item.id) {
                      case item.id === '0':
                        return (
                          <Picker.Item
                            key={index}
                            label={item.bcaliber}
                            value={item.id}
                          />
                        );
                      default:
                        return (
                          <Picker.Item
                            key={index}
                            label={item.bcaliber}
                            value={item.id}
                          />
                        );
                    }
                  })}
              </Picker>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              // backgroundColor: 'tomato',
              marginTop: 15,
              width: '95%',
              alignSelf: 'center',
              justifyContent: 'space-around',
              marginBottom: 10,
            }}>
            <Text
              style={{fontSize: 14, fontWeight: 'bold', alignSelf: 'center'}}>
              Bullet Name
            </Text>
            <View style={{borderColor: 'black', borderWidth: 1, width: '60%'}}>
              <Picker
                selectedValue={this.state.name}
                style={{
                  borderRadius: 5,
                  height: 35,
                  color: 'black',
                  // backgroundColor: 'black',
                }}
                containerStyle={{borderWidth: 1, borderColor: 'black'}}
                // prompt={'Select No of stores'}
                placeholder={'Select Stores'}
                onValueChange={value => {
                  this.setState({
                    name: value,
                  });
                }}>
                {this.state.bname &&
                  this.state.bname.map((item, index) => {
                    switch (item.id) {
                      case item.id === '0':
                        return (
                          <Picker.Item
                            key={index}
                            label={item.no}
                            value={item.id}
                          />
                        );
                      default:
                        return (
                          <Picker.Item
                            key={index}
                            label={item.no}
                            value={item.id}
                          />
                        );
                    }
                  })}
              </Picker>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 15,
              width: '95%',
              alignSelf: 'center',
              justifyContent: 'space-around',
              marginBottom: 10,
            }}>
            <Text
              style={{fontSize: 14, fontWeight: 'bold', alignSelf: 'center'}}>
              Ballistic Coefficient
            </Text>
            <TextInput
              style={[styles.small, {width: '50%'}]}
              onChangeText={text => this.setState({coefficient: text})}
              value={coefficient}
              underlineColorAndroid="transparent"
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 15,
              width: '95%',
              alignSelf: 'center',
              justifyContent: 'space-around',
              marginBottom: 10,
            }}>
            <Text
              style={{fontSize: 14, fontWeight: 'bold', alignSelf: 'center'}}>
              Initial Velocity (f/s)
            </Text>
            <TextInput
              style={[styles.small, {width: '50%'}]}
              onChangeText={text => this.setState({velocity: text})}
              value={velocity}
              underlineColorAndroid="transparent"
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 15,
              width: '95%',
              alignSelf: 'center',
              justifyContent: 'space-around',
              marginBottom: 10,
            }}>
            <Text
              style={{fontSize: 14, fontWeight: 'bold', alignSelf: 'center'}}>
              Bullet Weight(grans)
            </Text>
            <TextInput
              style={[styles.small, {width: '50%'}]}
              onChangeText={text => this.setState({bweight: text})}
              value={bweight}
              underlineColorAndroid="transparent"
            />
          </View>
          <View
            style={{
              marginTop: 20,
              width: '95%',
              marginBottom: 10,
              // backgroundColor: 'tomato',
              alignItems: 'flex-end',
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
                // style={{width: '50%'}}
                onPress={() => this.props.navigation.navigate('BulletGraph')}>
                <Text
                  style={{
                    color: 'white',
                    // backgroundColor: theme.colors.primary,
                    padding: 20,
                    textAlign: 'center',
                    borderRadius: 5,
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  Calculate
                </Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>
        </ScrollView>
      </View>
    );
  }
}
