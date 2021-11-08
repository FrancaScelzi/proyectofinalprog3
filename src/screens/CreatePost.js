import React, {Component} from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet} from 'react-native';
import { auth, db } from '../firebase/config';
import MyCamera from '../components/MyCamera';

export default class CreatePost extends Component {
    constructor(props){
        super(props);
        this.state = {
            comment: "",
            photo: '',
            showCamera: true,
        }
    }

    handlePost(){
        db.collection('posts').add({
            owner: auth.currentUser.displayName,
            description: this.state.comment,
            email: auth.currentUser.email,
            cratedAt: Date.now(),
            likes: [],
            comments: [],
            photo: this.state.photo
        })

        .then(response => {
            console.log(response);
            alert('¡Posteo exitoso!');
            this.setState({
                comment: '',
            })
            console.log(this.props);
            this.props.navigation.navigate('Home')
        })
        .catch(error => {
            console.log(error);
            alert('Error en el posteo')
        })
    }

    guardarFoto(){
        this.setState({
            photo:url,
            showCamera:false
        })
    }

    render(){
        return(
            <>
            {this.state.showCamera ?
            <MyCamera savePhoto = {(url)=> this.guardarFoto(url)}/>
            :    
            <View style={styles.container}>
                <TextInput
                    style= {styles.field}
                    keyboardType='default'
                    placeholder="What are you thinking about?"
                    multiline={true}
                    numberOfLines = {4}
                    onChangeText={text => this.setState({ comment: text })}
                    value = {this.state.comment}
                />
                <TouchableOpacity style = {styles.button} onPress={()=> this.handlePost()}>
                    <Text style = {styles.text}> Post </Text>
                </TouchableOpacity>
            </View>
            }
            </>
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
    },
    imagen:{
        height: 300,
        width: '90%'
    }
})