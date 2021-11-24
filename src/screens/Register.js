import React, {Component} from "react";
import { Text, TextInput, TouchableOpacity, View, StyleSheet, Image} from 'react-native';

export default class Register extends Component {
    constructor(props) {
        super(props);
            this.state = {
                email: "",
                password: "",
                username: "",
                error: ""
            }
    }

    onRegister(){
        if (this.state.email !== "" && this.state.password !== "" && this.state.username !== ""){
                this.props.handleRegister(this.state.username,this.state.email, this.state.password)
        }
        else {
            this.setState({
                error: "Por favor, complete los campos"
            })
        }
    }

    render(){
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
                keyboardType="default"
                placeholder="Username"
                onChangeText={text => this.setState({ username: text })}
            />

            <TextInput
                style={styles.field}
                keyboardType="email-address"
                placeholder="Email"
                onChangeText={text => this.setState({ email: text })}
            />

            <TextInput
                style={styles.field}
                keyboardType='default'
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={text => this.setState({ password: text })}
            />
            <Text style={styles.errorText}>{this.state.error}</Text>
            <TouchableOpacity style = {this.state.password !== '' ? styles.button : styles.buttonDisabled} 
            onPress={() => this.onRegister()}>
                <Text style = {styles.text}> Sign Up </Text>
            </TouchableOpacity>

        </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "white",
    },
    field: {
        width: "70%",
        height: 50,
        backgroundColor: "#FAFAFA",
        borderRadius: 30,
        margin: 10,
        padding: 10,
        borderColor: "#CCD5AE",
        borderWidth: 0.1,
    },
    button: {
        width: "40%",
        height: 45,
        backgroundColor: "#CCD5AE",
        borderRadius: 30,
        margin: 10,
        alignItems: "center",
        fontFamily: 'Montserrat'
    },
    buttonDisabled: {
        width: "40%",
        height: 45,
        backgroundColor: "#FAEDCD",
        borderRadius: 30,
        margin: 10,
        alignItems: "center",
        fontFamily: 'Montserrat'
    },
    text: {
        color: "black",
        fontSize: 18,
        margin: 10,
    },
    errorText: {
        fontFamily: 'Montserrat',
        margin: 15
    },
    appLogo: {
        height: 200,
        width: 200,
    },
})
