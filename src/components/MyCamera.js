import React, { Component } from "react";
import { Camera } from "expo-camera";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { storage } from "../firebase/config";

export default class MyCamera extends React.Component {
  constructor(props) {
    super(props);
    this.camera; // Variable vacía
    this.state = {
      photo: "",
      permission: false,
    };
  }

  componentDidMount() {
    Camera.requestCameraPermissionsAsync()
    .then((response) => {
      console.log(response);
      this.setState({
        permission: response.granted,
        // granted es una propiedad de response (true / false)
      });
    })
    .catch(error => console.log(error))
  }

  takePicture() {
    if (!this.camera) return;
    // Método propio de la cámara
    this.camera.takePictureAsync()
    .then((photo) => {
      this.setState({
        // Dirección interna temporal de la foto = uri
        photo: photo.uri,
      });
    });
  }

  uploadImage() {
    fetch(this.state.photo)
      .then((res) => {
        return res.blob();
      })
      .then((image) => {
        const ref = storage.ref(`camera/${Date.now()}.jpg`);
        ref.put(image).
        then(() => {
          // URL Público
          ref.getDownloadURL().then((url) => {
            console.log(url);
            this.setState({
              photo: "",
            });
            this.props.savePhoto(url);
          });
        });
      });
  }

  onReject() {
    this.setState({
      photo: "",
    });
  }

  render() {
    console.log(this.state);
    return (
      <View style={styles.container}>
        {this.state.photo ? (
          <>
            <Image style={styles.preview} source={{ uri: this.state.photo }} />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.reject}
                onPress={() => this.onReject()}
              >
                <Text style={styles.text}>Tomar otra foto</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.accept}
                onPress={() => this.uploadImage()}
              >
                <Text style={styles.text}>Me gusta esta foto</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <Camera
            style={styles.camera}
            type={Camera.Constants.Type.front || Camera.Constants.Type.back}
            // Referencia: objeto camera. La guardamos como valor en this.camera para poder sacar foto y utilizar otros métodos. 
            ref={(referencia) => (this.camera = referencia)}
          >
            <View style={styles.buttonContainer}>
              {/* Botón para sacar la foto */}
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.takePicture()}
              ></TouchableOpacity>
            </View>
          </Camera>
        )}
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  button: {
    width: 124,
    height: "100%",
    borderWidth: 5,
    borderColor: "white",
    borderRadius: 100,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  buttonContainer: {
    width: "100%",
    height: 125,
    position: "absolute",
    bottom: 40,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    color: "black",
    fontSize: 15,
    margin: 10,
    fontFamily: "Montserrat",
    textAlign: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  reject: {
    width: "40%",
    height: 45,
    backgroundColor: "#CCD5AE",
    borderRadius: 30,
    margin: 10,
    alignItems: "center",
  },
  accept: {
    width: "40%",
    height: 45,
    backgroundColor: "#CCD5AE",
    borderRadius: 30,
    margin: 10,
    alignItems: "center",
  },
  preview: {
    width: "100%",
    flex: 6,
  },
});
