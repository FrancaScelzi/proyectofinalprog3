import React, {Component} from "react"
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import { auth } from '../firebase/config';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import Search from './Search'
import Profile from './Profile'
import CreatePost from './CreatePost';
import Logout from './Logout'

export default class Menu extends Component {
    constructor(props){
        super(props);
        this.state = {
            loggedIn: false,
            error: null,
        }
    }

    componentDidMount(){
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
            this.setState({
                loggedIn: true
            })
        })
        .catch( response => {
            alert('Error al iniciar sesión')
            this.setState({
                error: "Error en loggeo"
            })
        })
    }

    handleRegister(username, email, password) {
        auth.createUserWithEmailAndPassword(email, password)
        .then(response => {
            response.user.updateProfile({
                displayName: username
            })
            this.setState({
                loggedIn: true
            })
        })
        .catch( error => {
            console.log(error);
            alert('Error en el registro');
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
                            {props => <Home {...props}/>}
                        </Drawer.Screen>

                        <Drawer.Screen name= 'Tu perfil'>
                            {props => <Profile {...props} handleLogout={()=> this.handleLogout()}/>}
                        </Drawer.Screen>

                        <Drawer.Screen name='Buscar receta'>
                        {props => <Search {...props}/>}
                        </Drawer.Screen>

                        <Drawer.Screen name = 'Publicar receta'>
                            {props => <CreatePost {...props}/>}
                        </Drawer.Screen>

                        <Drawer.Screen name='Cerrar sesión'>
                            {props => <Logout {...props} handleLogout={()=> this.handleLogout()}/>}
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
