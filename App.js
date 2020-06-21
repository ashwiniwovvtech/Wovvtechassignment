import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Navigation, createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import LatestNews from './src/LatestNews';
import SelectedNews from './src/SelectedNews';

const MainNavigator = createStackNavigator({

  LatestNews:{
    screen:'LatestNews',
    navigationOptions:{
      header: null
   }
    
  },
  SelectedNews:{
    screen:'SelectedNews',
    navigationOptions:{
      header: null
   }
  }

},
{
  initialRouteName:"LatestNews"

}


)

const MainAppContainer = createAppContainer(MainNavigator)


export default class App extends Component {
  
  render(){
      return(
        <LatestNews/>
      )
       
     
  }
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
