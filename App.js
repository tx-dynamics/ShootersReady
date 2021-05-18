import React, {Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import MainNav from './src/navigation/MainNav';
console.disableYellowBox = true;
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <MainNav />
      </SafeAreaView>
    );
  }
}
