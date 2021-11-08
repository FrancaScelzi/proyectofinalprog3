import React, { Component } from "react";
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Image} from "react-native";
import { auth } from "../firebase/config";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  onLogin() {
    if (this.state.email !== "" && this.state.password !== "") {
      this.props.handleLogin(this.state.email, this.state.password);
    } else {
      console.log("¡Completar los campos!");
    }
  }

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
        <TextInput
          style={styles.field}
          keyboardType="email-address"
          placeholder="Email"
          onChangeText={(text) => this.setState({ email: text })}
        />
        <TextInput
          style={styles.field}
          keyboardType="number-pad"
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ password: text })}
        />
        <TouchableOpacity style={styles.button} onPress={() => this.onLogin()}>
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity onPress={() => console.log("Navegar al registro")}>
            <Text style={styles.textBtn}>¿No tenes cuenta? Registrate!</Text>
          </TouchableOpacity>
        </View>
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
