import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Picker,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
// import {
//   ArcElement,
//   BarController,
//   BarElement,
//   BubbleController,
//   CategoryScale,
//   Chart,
//   Decimation,
//   DoughnutController,
//   Filler,
//   Legend,
//   LineController,
//   LineElement,
//   LinearScale,
//   LogarithmicScale,
//   PieController,
//   PointElement,
//   PolarAreaController,
//   RadarController,
//   RadialLinearScale,
//   ScatterController,
//   TimeScale,
//   TimeSeriesScale,
//   Title,
//   Tooltip,
// } from 'chart.js';
import {Divider, Header} from 'react-native-elements';
import React, {Component} from 'react';

import {Ballistics as Ballistic} from './ballistics';
import BulletGraph from '../BulletGraph';
// import Canvas from 'react-native-canvas';
import HeaderCenterComponent from '../../components/HeaderCenterComponent';
import HeaderLeftComponent from '../../components/HeaderLeftComponent';
import {bullets} from './bullets';
import {button} from '../../assets';
import styles from './styles';
import theme from '../../theme';
import {useState} from 'react';

function BulletCalculator({navigation, ...props}) {
  const [selectedBullet, setSelectedBullet] = useState({});
  const [form, setForm] = useState({
    Altitude: 0,
    AtmosphericPressure: 29.53,
    BallisticCoefficient: '0.135',
    BulletWeight: '40',
    DistanceStep: 50,
    DistanceToShow: 500,
    DragFunction: 'G1',
    InitialVelocity: '1280',
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
    bulletMass: form.BulletWeight, // Bullet's mass in grains
    dragCoefficient: form.BallisticCoefficient, // Bullet's Ballistic Coefficient, B.C.
    muzzleVelocity: form.InitialVelocity, // Bullet's muzzle velocity in feet per second
    windSpeed: 10, // Wind speed in Miles per Hour
    windAngle: 90, // Wind direction angle in degrees (0=headwind, 90=right to left, 180=tailwind, 270/-90=left to right),
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
    chartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            id: 'T',
            type: 'linear',
            position: 'left',
          },
        ],
      },
      tooltips: {
        mode: 'x',
        callbacks: {
          title: function (tooltipItem, data) {
            return tooltipItem[0].xLabel + ' yards';
          },
          label: function (tooltipItem, data) {
            if (tooltipItem.datasetIndex === 0) {
              return 'Trajectory: ' + tooltipItem.yLabel + ' in';
            } else {
              return 'Kinetic Energy: ' + tooltipItem.yLabel + ' J';
            }
          },
          footer: function (tooltipItem, data) {
            return (
              'Wind Drift: ' +
              BallisticsVariables.calculatedWindDrifts[tooltipItem[0].index] +
              ' in'
            );
          },
          afterFooter: function (tooltipItem, data) {
            return (
              'Velocity: ' +
              BallisticsVariables.calculatedVelocities[tooltipItem[0].index] +
              ' fps'
            );
          },
        },
      },
    },
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
    for (
      var yardage = 0;
      yardage <= BallisticsVariables.drawRange;
      yardage += 50
    ) {
      var kineticEnergy =
        0.5 *
        BallisticsVariables.bulletMass *
        0.0000647989 *
        Math.pow(velocity * 0.3048, 2);
      var velocity = Ballistics.getVelocity(yardage);
      BallisticsVariables.tableRows.push({
        range: Ballistics.getRange(yardage).toFixed(0),
        velocity: velocity.toFixed(2),
        WindDrift: Ballistics.getWindage(yardage).toFixed(2),
        time: (Ballistics.getTime(yardage) * 1000).toFixed(0),
        energy: kineticEnergy.toFixed(2),
      });
    }
  };
  calculateBallistics(1);
  console.log(BallisticsVariables);
  console.log(BallisticsVariables?.ballisticsDatasets[0]?.data);

  const setInput = value => {
    this.setState({filter: value});
    console.log(value);
    const data = bullets.map(item => {
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
              selectedValue={selectedBullet}
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
                // this.setState(
                //   {
                //     filter: value,
                //   },
                //   () => {
                //     this.setInput(value);
                //   },
                // );
              }}>
              {bullets &&
                bullets.map((item, index) => {
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
            onChangeText={value => onChange('BallisticCoefficient', value)}
            value={form.BallisticCoefficient}
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
            onChangeText={value => onChange('InitialVelocity', value)}
            value={form.InitialVelocity}
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
            onChangeText={value => onChange('BulletWeight', value)}
            value={form.BulletWeight}
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
              onPress={() =>
                navigation.navigate('BulletGraph', {
                  tableRows: BallisticsVariables,
                })
              }>
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
        {/* <BulletGraph tableRows={BallisticsVariables.tableRows} /> */}
        {/* <Canvas ref={handleCanvas} /> */}
      </ScrollView>
    </View>
  );
}

export default BulletCalculator;
