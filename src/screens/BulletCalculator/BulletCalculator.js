import {Divider, Header} from 'react-native-elements';
import {
  ImageBackground,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,AsyncStorage
} from 'react-native';
import React, {useEffect} from 'react';
import {useIsFocused} from 'react-navigation';
import {Ballistics as Ballistic} from './ballistics';
import HeaderCenterComponent from '../../components/HeaderCenterComponent';
import HeaderLeftComponent from '../../components/HeaderLeftComponent';
import {Picker} from '@react-native-picker/picker';
import bullets from './bullets';
import {button} from '../../assets';
import styles from './styles';
import theme from '../../theme';
import {useState} from 'react';
var find = require('lodash.find');
// console.log(JSON.stringify(result));
function BulletCalculator({navigation}) {
  const [Bullets, setbullets] = useState(bullets);
  const [selectedCaliber, setSelectedCaliber] = useState(null);
  const [add, setadd] = useState(false);
  let Calibers = Object.values(
    Bullets.reduce((a, {bcaliber, ...props}) => {
      if (!a[bcaliber]) {
        a[bcaliber] = Object.assign({}, {bcaliber, bullets: [props]});
      } else {
        a[bcaliber].bullets.push(props);
      }
      return a;
    }, {}),
  );
  const emptyBullet = {
    id: '',
    name: '',
    grains: '',
    coeff: '',
    velocity: '',
  };
  const [selectedBullet, setSelectedBullet] = useState(emptyBullet);
  const [bulletData, setbulletData] = useState();
  const [balisticCoef, setbalisticCoef] = useState();
  const [velocity, setvelocity] = useState();
  const [bweight, setbweight] = useState();
  const resetBullet = () => {
    setSelectedBullet(emptyBullet);
  };
  // const [form, setForm] = useState({
  //   Altitude: 0,
  //   AtmosphericPressure: 29.53,
  //   BallisticCoefficient: '0.105',
  //   BulletWeight: '20',
  //   DistanceStep: 50,
  //   DistanceToShow: 500,
  //   DragFunction: 'G1',
  //   InitialVelocity: '1850',
  //   RelativeHumidity: 78,
  //   ShootingAngle: 0,
  //   SightHeightOverBore: 1.5,
  //   Temperature: 59,
  //   WindAngle: 0,
  //   WindVelocity: 0,
  //   ZeroRange: '100',
  // });
  const onChange = (field, value) => {
    setSelectedBullet({
      ...selectedBullet,
      [field]: value,
    });
  };
  let Ballistics = new Ballistic();
  const dragFunctions = Object.keys(Ballistics.DRAG_FUNCTIONS);
  var BallisticsVariables = {
    dragFunctions: dragFunctions,
    dragFunction: dragFunctions.indexOf('G1') > -1 ? 'G1' : dragFunctions[0],
    drawRanges: [100, 200, 300, 400, 500, 600, 1000, 2000],
    drawRange: 500,
    bulletMass: selectedBullet?.grains, // Bullet's mass in grains
    dragCoefficient: selectedBullet?.coeff, // Bullet's Ballistic Coefficient, B.C.
    muzzleVelocity: selectedBullet?.velocity, // Bullet's muzzle velocity in feet per second
    windSpeed: 0, // Wind speed in Miles per Hour
    windAngle: 0, // Wind direction angle in degrees (0=headwind, 90=right to left, 180=tailwind, 270/-90=left to right),
    sightHeight: 1.5, // Height of the line of sight from the center of the barrel's bore in inches
    shootingAngle: 0, // Shooting angle in degrees (uphill / downhill)
    zeroRange: 100, // Zero range in yards
    calculatedRanges: [],
    calculatedVelocities: [],
    calculatedWindDrifts: [],
    tableRows: [],
    ballisticsDatasets: [
      {
        label: 'Trajectory',
        yAxisID: 'T',
        data: [],
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,1)',
      },
    ],
  };
  var calculateBallistics = function (value) {
    var floatValue = parseFloat(value);
    if (!floatValue || isNaN(floatValue)) {
      return;
    }

    BallisticsVariables.calculatedRanges = [];
    BallisticsVariables.calculatedVelocities = [];
    BallisticsVariables.calculatedWindDrifts = [];
    BallisticsVariables.ballisticsDatasets[0].data = [];

    Ballistics.setVariables(BallisticsVariables);
    Ballistics.solveAll();

    for (
      var yardage = 0;
      yardage <= BallisticsVariables.drawRange;
      yardage += 10
    ) {
      BallisticsVariables.calculatedRanges.push(
        Ballistics.getRange(yardage).toFixed(0),
      );

      var velocity = Ballistics.getVelocity(yardage);
      BallisticsVariables.calculatedVelocities.push(velocity.toFixed(2));

      BallisticsVariables.calculatedWindDrifts.push(
        Ballistics.getWindage(yardage).toFixed(2),
      );

      BallisticsVariables.ballisticsDatasets[0].data.push(
        parseFloat(Ballistics.getPath(yardage).toFixed(2)),
      );
    }
    for (var yard = 0; yard <= BallisticsVariables.drawRange; yard += 50) {
      var kineticEnergy =
        0.5 *
        BallisticsVariables.bulletMass *
        0.0000647989 *
        Math.pow(velocity * 0.3048, 2);
      var range = Ballistics.getRange(yard).toFixed(0);
      var drop = Ballistics.getPath(yard).toFixed(4);
      var velocity = Ballistics.getVelocity(yard).toFixed(0);
      var WindDrift = Ballistics.getWindage(yard).toFixed(2);
      var time = (Ballistics.getTime(yard) * 1000).toFixed(0);
      var energy = kineticEnergy.toFixed(2);
      BallisticsVariables.tableRows.push({
        range: range,
        drop: drop,
        velocity: yard === 0 ? velocity - 1 : velocity,
        WindDrift: WindDrift,
        time: yard === 0 ? time + 1 : time,
        energy: energy,
      });
    }
  };
  const bulletChanged = async value => {
    // console.log('Bullet Changed ', find(Bullets, {id: value}));
    if (!value) {
      setSelectedBullet(emptyBullet);
    } else {
      const res=find(Bullets, {id: value});
      console.log('res',res);
      setbweight(res?.grains);
      setvelocity(res?.coeff);
      setbalisticCoef(res?.coeff);
      setbulletData(find(Bullets, {id: value}));
      setSelectedBullet(find(Bullets, {id: value}));
    }
  };
  useEffect(() => {
    resetBullet();
    getData();
  }, [useIsFocused]);
  async function getData() {
    try {
      const myArray = await AsyncStorage.getItem('code');
      console.log('myArray', JSON.parse(myArray));
      if (myArray !== null) {
        console.log('myArray', JSON.parse(myArray));
        setbullets(JSON.parse(myArray));
      } else {
        await AsyncStorage.setItem('code', JSON.stringify(bullets));
        console.log('bullets');
        setbullets(bullets);
      }
    } catch (error) {
      console.log('error', error.message);
      // Error retrieving data
    }
  
    //  Array.prototype.push.apply(Bullets, arr);
    //  console.log('[...Bullets,arr]',Bullets);
    
    
  }
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header
        backgroundColor={'white'}
        containerStyle={{borderBottomWidth: 0}}
        centerComponent={<HeaderCenterComponent name="SHOOTERS READY" />}
        leftComponent={<HeaderLeftComponent navigation={navigation} />}
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
          <Text style={{fontSize: 14, fontWeight: 'bold', alignSelf: 'center'}}>
            Bullet Caliber
          </Text>
          <View style={{borderColor: 'black', borderWidth: 1, width: '70%'}}>
            <Picker
              selectedValue={selectedCaliber?.bcaliber}
              style={{
                borderRadius: 5,
                height: Platform.OS === 'android' ? 35 : undefined,
                color: 'black',
              }}
              containerStyle={{borderWidth: 1, borderColor: 'black'}}
              placeholder={'Select Stores'}
              onValueChange={value => {
                setSelectedCaliber(find(Calibers, {bcaliber: value}));
                console.log('bullet',find(Calibers, {bcaliber: value}));
                resetBullet();
              }}>
              {Calibers &&
                Calibers.map((item, index) => {
                  return (
                    <Picker.Item
                      key={index}
                      label={item.bcaliber}
                      value={item.bcaliber}
                    />
                  );
                })}
            </Picker>
          </View>
        </View>
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
          <Text style={{fontSize: 14, fontWeight: 'bold', alignSelf: 'center'}}>
            Bullet Name
          </Text>
          <View style={{borderColor: 'black', borderWidth: 1, width: '70%'}}>
            <Picker
              selectedValue={selectedBullet.id}
              style={{
                borderRadius: 5,
                height: Platform.OS === 'android' ? 35 : undefined,
                color: 'black',
              }}
              containerStyle={{borderWidth: 1, borderColor: 'black'}}
              placeholder={'Select Stores'}
              onValueChange={bulletChanged}>
              <Picker.Item key={null} label={'Select Bullet'} value={null} />
              {selectedCaliber &&
                selectedCaliber?.bullets &&
                selectedCaliber.bullets.map((item, index) => {
                  return (
                    <Picker.Item
                      key={index}
                      label={item.name}
                      value={item.id}
                    />
                  );
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
          <Text style={{fontSize: 14, fontWeight: 'bold', alignSelf: 'center'}}>
            Ballistic Coefficient
          </Text>
          <TextInput
            style={[styles.small, {width: '50%'}]}
            onChangeText={value => onChange('coeff', value)}
            value={selectedBullet.coeff}
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
          <Text style={{fontSize: 14, fontWeight: 'bold', alignSelf: 'center'}}>
            Initial Velocity (f/s)
          </Text>
          <TextInput
            style={[styles.small, {width: '50%'}]}
            onChangeText={value => onChange('velocity', value)}
            value={selectedBullet.velocity}
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
          <Text style={{fontSize: 14, fontWeight: 'bold', alignSelf: 'center'}}>
            Bullet Weight(grans)
          </Text>
          <TextInput
            style={[styles.small, {width: '50%'}]}
            onChangeText={value => onChange('grains', value)}
            value={selectedBullet.grains}
            underlineColorAndroid="transparent"
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            marginTop: 20,
            marginBottom: 10,
            paddingHorizontal: 10,
          }}>
          <View
            style={{
              width: '50%',
              alignItems: 'flex-start',
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
                onPress={() => {
                  setSelectedCaliber(null);
                  resetBullet();
                }}
                >
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
                  Reset Form
                </Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>
          <View
            style={{
              width: '50%',
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
                onPress={() => {
                  calculateBallistics(1);
                  navigation.navigate('BulletGraph', {
                    tableRows: BallisticsVariables.tableRows,
                    data: BallisticsVariables?.ballisticsDatasets[0]?.data,
                  });
                }}>
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
        </View>
        <View
          style={{
            width: '100%',
            marginTop: 20,
            marginBottom: 10,
            paddingHorizontal: 10,
          }}>
          <View
            style={{
              width: '100%',
              alignItems: 'flex-start',
            }}>
            <ImageBackground
              style={{
                height: null,
                width: '100%',
                resizeMode: 'cover',
                borderRadius: 40,
              }}
              source={button}
              imageStyle={{borderRadius: 10}}>
              <TouchableOpacity
                // style={{width: '50%'}}
                onPress={() => {
                navigation.push('addbullet')
                }}
                // onPress={()=>{onaddBullet(),setadd(!add)}}
                >
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
                  Add Bullet
                </Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default BulletCalculator;
