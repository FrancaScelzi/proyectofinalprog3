import React, {Component} from 'react';
import { Text, Image, TextInput, TouchableOpacity, View, StyleSheet} from 'react-native';
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

    savePhoto(url){
        this.setState({
            photo: url,
            showCamera:false
        })
    }

    render(){
        return(
            <>
            {this.state.showCamera ?
            <MyCamera savePhoto = {(url)=> this.savePhoto(url)}/>
            :    
            <View style={styles.container}>
                <Image
                    source={{uri: this.state.photo}}
                    style = {styles.imagen}
                />
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
        alignItems: 'center',
        backgroundColor: "white",
    },
    field: {
        width: "90%",
        height: 100,
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
    },
    text: {
        color: "black",
        fontSize: 18,
        margin: 10,
    },
    imagen:{
        height: 500,
        width: '90%',
        marginTop:"3%",
        marginBottom: "3%",
    }
})