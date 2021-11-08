import {Camera} from 'expo-camera';
import React from 'react'
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {storage} from '../firebase/config'

export default class MyCamera extends React.Component{
    constructor(props){
        this.camera; // Variable vacía
        this.state = {
            photo: '',
            permission: false
        }
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then(response => {
            console.log(response);
            this.setState({
                permission:response.granted
            })
        })
    }

    takePicture(){
        if(!this.camera) return;
        this.camera.takePictureAsync()
        .then(photo => {
            this.setState({
                photo: photo.uri
            })
        })
    }

    uploadImage(){
        fetch(this.state.photo)
        .then(res=> {
            return res.blob();
        })
        .then(image=>{
            const ref = storage.ref(`camera/${Date.now()}.jpg`)
            ref.put(image)
            .then(()=>{
                console.log(ref.getDownloadURL);
                ref.getDownloadURL()
                .then(url => {
                    console.log(url);
                    this.setState({
                        photo:''
                    })
                    this.props.savePhoto(url)
                })
            })
        })
    }

    onReject(){
        this.setState({
            photo:''
        })
    }

    render(){
        console.log((this.state));
        return(
            <View style={styles.container}>
                {
                    this.state.photo ?
                    <>
                    <Image 
                    style = {styles.preview}
                    source={{uri:this.state.photo}}
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                        style={styles.reject}
                        onPress={()=>this.onReject()}>
                            <Text style={styles.text}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                        style={styles.accept}
                        onPress={()=> this.uploadImage()}
                        >
                            <Text style={styles.text}>Subir</Text>
                        </TouchableOpacity>
                    </View>
                </>
                :
                <Camera
                style={styles.camera}
                type={Camera.Constants.Type.front || Camera.Constants.Type.back}
                ref= {referencia => this.camera = referencia}
                >
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                    style={styles.button}
                    onPress={()=> this.takePicture()}>
                    </TouchableOpacity>
                </View>
                </Camera>
                }
            </View>
        )
    }

}

export const styles = StyleSheet.create({
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
        buttonContainer:{

        }
})
