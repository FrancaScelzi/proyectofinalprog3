import React, { Component }  from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import { auth } from '../firebase/config'

export default class Login extends Component{
    constructor (props){
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.text}> Login </Text>
                <TextInput
                    style={styles.field}
                    keyboardType= 'email-address'
                    placeholder= 'email'
                    onChangeText= {text => this.setState({email:text})}
                />
                <TextInput
                    style={styles.field}
                    keyboardType='number-pad'
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text })}
                />
                <TouchableOpacity style = {styles.button} onPress= {() => this.handleLogin()}>
                    <Text style = {styles.text}>Login</Text>

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