import React from 'react';
import Home from './src/screens/Home'
import Login from './src/screens/Login'
import Register from './src/screens/Register'
import {NavigationContainer} from '@react-navigation/native'
import {createDrawerNavigator} from '@react-navigation/drawer'
import { StyleSheet, Text, View } from 'react-native';

export default function App() {

  const Drawer = createDrawerNavigator()

  return (
    <NavigationContainer>
      <Drawer.Navigator>
          <Drawer.Screen name='Home' component={Home}></Drawer.Screen>
          <Drawer.Screen name='Register' component={Register}></Drawer.Screen>
          <Drawer.Screen name='Login' component={Login}></Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

