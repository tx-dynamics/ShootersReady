import {Divider, Header} from 'react-native-elements';
import {
  ImageBackground,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';

import {Ballistics as Ballistic} from './ballistics';
import HeaderCenterComponent from '../../components/HeaderCenterComponent';
import HeaderLeftComponent from '../../components/HeaderLeftComponent';
import {Picker} from '@react-native-picker/picker';
import {bullets} from './bullets';
import {button} from '../../assets';
import styles from './styles';
import theme from '../../theme';
import {useState} from 'react';

var find = require('lodash.find');

function BulletCalculator({navigation}) {
  const [selectedBullet, setSelectedBullet] = useState({
    id: '',
    bcaliber: '',
    name: '',
    grains: '',
    coeff: '',
    velocity: '',
  });

  const [form, setForm] = useState({
    Altitude: 0,
    AtmosphericPressure: 29.53,
    BallisticCoefficient: '0.105',
    BulletWeight: '20',
    DistanceStep: 50,
    DistanceToShow: 500,
    DragFunction: 'G1',
    InitialVelocity: '1850',
    RelativeHumidity: 78,
    ShootingAngle: 0,
    SightHeightOverBore: 1.5,
    Temperature: 59,
    WindAngle: 0,
    WindVelocity: 0,
    ZeroRange: '100',
  });
  const onChange = (field, value) => {
    setForm({
      ...form,
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
    bulletMass: selectedBullet.grains, // Bullet's mass in grains
    dragCoefficient: selectedBullet.coeff, // Bullet's Ballistic Coefficient, B.C.
    muzzleVelocity: selectedBullet.velocity, // Bullet's muzzle velocity in feet per second
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
    console.log('Bullet Changed ', value);
    setSelectedBullet(find(bullets, {id: value}));
  };
  // useEffect(() => {
  //   if (selectedBullet) {
  //     console.log('updating fields');
  //     let newBullet = find(bullets, {id: selectedBullet});
  //     setForm({
  //       ...form,
  //       BulletWeight: newBullet.grains,
  //       BallisticCoefficient: newBullet.coeff,
  //       InitialVelocity: newBullet.velocity,
  //     });
  //     console.log(form);
  //   }
  // }, [selectedBullet]);
  // useEffect(() => {
  //   calculateBallistics(1);
  // }, [selectedBullet, form]);
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
          <View style={{borderColor: 'black', borderWidth: 1, width: '60%'}}>
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
              {bullets &&
                bullets.map((item, index) => {
                  return (
                    <Picker.Item
                      key={index}
                      label={item.bcaliber}
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
      </ScrollView>
    </View>
  );
}

export default BulletCalculator;
