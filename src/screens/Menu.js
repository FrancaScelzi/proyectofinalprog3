import React, {Component} from "react"
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import { auth } from '../firebase/config';

export default class Menu extends Component {
    constructor(props){
        super(props);
        this.state = {
            loggedIn: false,
            error: null,
        }
    }


    handleLogin(email, password){
        auth.singInWithEmailAndPasword(email, password)
        .then( response => {
            alert("logged user");
            this.setState({
                loggedIn: true
            })
        })
        .catch( response => {
            alert("error en el loggeo");
            this.setState({
                error: "Error en loggeo"
            })
        })
    }

    handleRegister(email, password) {
        auth.createUserWithEmailAndPassword(email, password)
        .then(response => {
            alert("usuario registrado");
            this.setState({
                loggedIn: true
            })
        })
        .catch( error => {
            console.log(error);
            alert("Error en el registro");
            this.setState({
                error: "Fallo en el registro"
            })
        })
    }

    render(){
        const Drawer = createDrawerNavigator();

        return(
            <NavigationContainer>
                    <Drawer.Navigator initialRouteName="Login">
                        {this.state.loggedIn === true ? 
                        <Drawer.Screen name = "Home" component={Home}></Drawer.Screen>
                        :
                        <>
                            <Drawer.Screen name="Login">
                                {props => <Login {...props} handleLogin={(email, password)=>this.handleLogin(email, password)}/>}
                            </Drawer.Screen>
                            <Drawer.Screen name = "Registro">
                                {props => <Register {...props} handleRegister={(email, password)=>this.handleRegister(email, password)}/>}
                            </Drawer.Screen>
                        </>
                    }
                    </Drawer.Navigator>
                </NavigationContainer>
            )
        }

}
