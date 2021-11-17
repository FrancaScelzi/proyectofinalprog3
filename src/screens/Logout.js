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
  field: {
    width: "70%",
    height: 50,
    backgroundColor: "#FAFAFA",
    borderRadius: 5,
    borderColor: "gray",
    borderWidth: 0.1,
    padding: 10,
    margin: 10,
  },
  button: {
    margin: 10,
    width: "20%",
    alignItems: "center",
    backgroundColor: "#CCD5AE",
    borderRadius: 5,
    marginTop: 25,
    width: 171,
    height: 45,
  },
  text: {
    color: "#212529",
    fontSize: 20,
    margin: 10,
  },
  textBtn: {
    color: "#212529",
    fontSize: 20,
    paddingTop: 40
  },
  appLogo: {
    height: 200,
    width: 200,
  },
});