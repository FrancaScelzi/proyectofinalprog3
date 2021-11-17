import React, { Component } from "react";
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Image} from "react-native";
import { auth } from "../firebase/config";

export default class Login extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
     
  //   };
  // }


  render() {
    return (
      <View style={styles.container}>
        <View>
          <Image
            source={require("../../assets/appLogo.png")}
            style={styles.appLogo}
            resizeMode={"contain"}
          />
       </View>
       <TouchableOpacity style={styles.button} onPress={()=> this.props.handleLogout()}>
                    <Text style={styles.text}>Cerrar sesión</Text>
                </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  button: {
    width: "70%",
    height: 45,
    backgroundColor: "#CCD5AE",
    borderRadius: 30,
    margin: 10,
    alignItems: "center",
  },
  text: {
    color: "black",
    fontSize: 18,
    margin: 10,
  },
  appLogo: {
    height: 200,
    width: 200,
  },
});