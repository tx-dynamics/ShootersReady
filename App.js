import React, {Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import MainNav from './src/navigation/MainNav';
import {Provider as PaperProvider} from 'react-native-paper';
console.disableYellowBox = true;
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <PaperProvider>
        <SafeAreaView style={{flex: 1}}>
          <MainNav />
        </SafeAreaView>
      </PaperProvider>
    );
  }
}
