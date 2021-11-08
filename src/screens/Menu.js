import React, {Component} from "react"
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import { auth } from '../firebase/config';
import CreatePost from './CreatePost'

export default class Menu extends Component {
    constructor(props){
        super(props);
        this.state = {
            loggedIn: false,
            error: null,
        }
    }

    componentDidMount(){
    // Su rol es recordar la sesión iniciada. Si no está, cada vez que se refresque la págna hay que volver a iniciar sesión
        auth.onAuthStateChanged( user => {
            if(user){
                this.setState({
                    loggedIn: true
                })
            }
        })
    }
    
    handleLogin(email, password){
        auth.signInWithEmailAndPassword(email, password)
        .then( response => {
            alert("Iniciaste sesión con éxito");
            this.setState({
                loggedIn: true
            })
        })
        .catch( response => {
            alert("Hubo un error en el inicio de sesión");
            this.setState({
                error: "Error en loggeo"
            })
        })
    }

    handleRegister(username, email, password) {
        auth.createUserWithEmailAndPassword(email, password)
        .then(response => {
            alert("Registro exitoso");
            // Con updateProfile se le agrega el nombre de usuario al displayName que es una propiedad del user de firebase
            response.user.updateProfile({
                displayName: username
            })
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

    handleLogout(){
        auth.signOut()
        .then(()=> {
            this.setState({
                loggedIn: false
            })
        })
        .catch(error => {
            console.log(error);
        })
    }

    render(){
        const Drawer = createDrawerNavigator();

        return(
            <NavigationContainer>
                <Drawer.Navigator initialRouteName ='Login'>
                    {this.state.loggedIn === true ?
                    <>
                    <Drawer.Screen name = 'Home'>
                        {props => <Home {...props} handleLogout={()=> this.handleLogout()}/>}
                    </Drawer.Screen>
                    <Drawer.Screen name = 'CreatePost'>
                        {props => <CreatePost {...props}/>}
                    </Drawer.Screen>
                    </>
                    :
                    <>
                     <Drawer.Screen name="Login">
                                {props => <Login {...props} handleLogin={(email, password)=>this.handleLogin(email, password)}/>}
                            </Drawer.Screen>
                            <Drawer.Screen name = "Registro">
                                {props => <Register {...props} handleRegister={(email, password, username)=>this.handleRegister(email, password, username)}/>}
                            </Drawer.Screen>
                        </>
                }
                </Drawer.Navigator>
            </NavigationContainer>
            )
        }
}