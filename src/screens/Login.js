import React, { Component }  from "react";
import { Text, View, StyleSheet} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
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
                <Text> Login </Text>
                <TextInput
                style={styles.container}
                keyboardType= 'email-address'
                placeholder= 'emai'
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
        width: '80%',
        backgroundColor: "#09009B",
        color: '#FFA400',
        padding: 10,
        marginVertical: 10
    },
    button: {
        width: '30%',
        backgroundColor: "#0F00FF",
    },
    text: {
        color: '#FFA400'
    }
})