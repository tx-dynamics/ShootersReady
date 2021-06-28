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
import HeaderCenterComponent from '../../components/HeaderCenterComponent';
import HeaderLeftComponent from '../../components/HeaderLeftComponent';
import {LineChart, Grid, YAxis, XAxis} from 'react-native-svg-charts';
import {Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
export default class BulletGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      line: [100, 100, 90, 90, 80, 80, 70, 60, 50, 40, 30, 20],
    };
  }

  render() {
    const data = [
      50,
      undefined,
      100,

      undefined,
      59,
      undefined,
      10,
      undefined,
      53,
      undefined,
      50,
    ];
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
            marginBottom: 15,
            // flex: 0.15,
          }}>
          <Divider
            style={{
              backgroundColor: theme.colors.primary,
              height: 1,
              width: '50%',
            }}
          />
          <TouchableOpacity>
            <LinearGradient
              colors={['#000000', '#9C1313']}
              style={[styles.button]}>
              <Text style={[styles.loginText]}>Drop Calculator</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            height: 220,
            margin: 5,
            marginTop: 10,
            padding: 5,
          }}>
          <YAxis
            data={data}
            contentInset={{top: 9, bottom: 4}}
            svg={{
              fill: 'grey',
              fontSize: 10,
            }}
            numberOfTicks={3}
            formatLabel={(value, index) => value}
          />
          <LineChart
            style={{flex: 1, marginLeft: 16}}
            data={this.state.line}
            svg={{stroke: 'rgb(134, 65, 244)'}}
            contentInset={{top: 1, bottom: 0}}>
            <Grid />
          </LineChart>
        </View>
        <XAxis
          data={data}
          numberOfTicks={4}
          formatLabel={(value, index) => value}
          contentInset={{left: 48, right: 10}}
          svg={{fontSize: 10, fill: 'black'}}
        />

        <View
          style={{
            // backgroundColor: 'tomato',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '98%',
            alignSelf: 'center',
            borderWidth: 1,
            marginTop: 15,
            alignContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 12,
              padding: 5,
              textAlign: 'center',
              // width: '16.33%',
            }}>
            Range
          </Text>

          <Text
            style={{
              fontSize: 12,
              padding: 5,
              borderLeftWidth: 1,
              textAlign: 'center',
              // width: '16.33%',
            }}>
            {`Drop \n (inches)`}
          </Text>
          <Text
            style={{
              fontSize: 12,
              padding: 5,
              borderLeftWidth: 1,
              textAlign: 'center',
            }}>
            Velocity
          </Text>
          <Text
            style={{
              fontSize: 12,
              padding: 5,
              borderLeftWidth: 1,
              textAlign: 'center',
            }}>
            Energy
          </Text>
          <Text
            style={{
              fontSize: 12,
              padding: 5,
              borderLeftWidth: 1,
              textAlign: 'center',
            }}>
            {`Wind Drift \n (inches)`}
          </Text>
          <Text
            style={{
              fontSize: 12,
              padding: 5,
              borderLeftWidth: 1,
              textAlign: 'center',
            }}>
            {`Time \n milisecond`}
          </Text>
        </View>
        <View
          style={{
            bottom: 0,
            // position: 'absolute',
            height: Dimensions.get('screen').height / 7,
          }}></View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('BulletCalculator')}
          style={{
            width: '55%',
            borderRadius: 8,
            padding: 15,
            marginTop: 20,
            alignSelf: 'center',
          }}>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 20,
              color: theme.colors.primary,
            }}>
            Reset & Calculate
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
