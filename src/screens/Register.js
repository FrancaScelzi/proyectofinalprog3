import React, {Component} from "react";
import { Text, TextInput, TouchableOpacity, View, StyleSheet} from 'react-native';
import { auth } from '../firebase/config';

export default class Register extends Component {
    constructor(props) {
        super(props);
            this.state = {
                email: "",
                password: "",
                username: "",
             }
     }

handleRegister(){
    if (this.state.email !== "" && this.state.password !== "" && this.state.username !== ""){
            this.props.handleRegister(this.state.email, this.state.password, this.state.username)
        }
     else {
         console.log("Completar los campos!")
     }
    }

render(){
    return (
    <View style={styles.container}>
    <Text style={styles.text}>Registro</Text>
    <TextInput
        style={styles.field}
        keyboardType="default"
        placeholder="username"
        
        onChangeText={text => this.setState({ username: text })}
    />
    <TextInput
        style={styles.field}
        keyboardType="email-address"
        placeholder="email"
        onChangeText={text => this.setState({ email: text })}
    />
    <TextInput
        style={styles.field}
        keyboardType='default'
        placeholder="password"
        secureTextEntry={true}
        onChangeText={text => this.setState({ password: text })}
    />
    <TouchableOpacity style = {styles.button} onPress={() => this.handleRegister()}>
        <Text style = {styles.text}> Sign Up </Text>
    </TouchableOpacity>
</View>

    )
}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    field: {
        width: '50%',
        backgroundColor: "#ced4da",
        color: '#212529',
        padding: 10,
        margin: 10
    },
    button: {
        margin: 10,
        width: '20%',
        backgroundColor: "#ced4da",
        alignItems: "center",
    },
    text: {
        color: '#212529',
        fontSize: 20,
        margin: 10
    }
})
