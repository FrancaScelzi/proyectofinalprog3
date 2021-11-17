import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import { auth, db } from "../firebase/config";
import firebase from "firebase";

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      likes: 0,
      showModal: false,
      commented: false,
      comments: [],
    };
  }

  componentDidMount() {
    console.log(this.props.dataItem);
    if (this.props.dataItem) {
      if (this.props.dataItem.data.likes.length !== 0) {
        this.setState({
          likes: this.props.dataItem.data.likes.length,
        });

        if (this.props.dataItem.data.likes.includes(auth.currentUser.email)) {
          this.setState({
            liked: true,
          });
        }
      }
    }
  }

  onLike() {
    const posteoActualizar = db.collection("posts").doc(this.props.dataItem.id);

    posteoActualizar
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
      })
      .then(() => {
        this.setState({
          liked: true,
          likes: this.state.likes + 1,
        });
      });
  }

  onDislike() {
    const posteoActualizar = db.collection("posts").doc(this.props.dataItem.id);

    posteoActualizar
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(
          auth.currentUser.email
        ),
      })
      .then(() => {
        this.setState({
          liked: false,
          likes: this.state.likes - 1,
        });
      });
  }

  // onComment() {
  //   const posteoActualizar = db.collection("posts").doc(this.props.dataItem.id);

  //   posteoActualizar
  //     .update({
  //       comments: firebase.firestore.FieldValue.arrayRemove(
  //         auth.currentUser.email
  //       ),
  //     })
  //     .then(() => {
  //       this.setState({
  //         commented: true,
  //         comments: this.state.comments + 1,
  //       });
  //     });
  // }

  showModal() {
    this.setState({
      showModal: true,
    });
  }

  closeModal() {
    this.setState({
      showModal: false,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.username}>{this.props.dataItem.data.owner}</Text>
        <Image
          style={styles.image}
          source={{ uri: this.props.dataItem.data.photo }}
          resizeMode="cover"
        />
        {!this.state.liked ? (
          <TouchableOpacity onPress={() => this.onLike()}>
            <Text>❤️</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => this.onDislike()}>
            <Text>🖤</Text>
          </TouchableOpacity>
        )}
        <Text>Likes: {this.state.likes}</Text>
        <Text>{this.props.dataItem.data.description}</Text>
        <Text>{this.props.dataItem.data.createdAt}</Text>
        <TouchableOpacity onPress={() => this.showModal()}>
          <Text>Ver comentarios</Text>
        </TouchableOpacity>
        {this.state.showModal ? (
          <Modal
            animationType="fade"
            transparent={false}
            visible={this.state.showModal}
            style={styles.modal}
          >
            <View style={styles.modalView}>
              <TouchableOpacity
                style={styles.closeModal}
                onPress={() => {
                  this.closeModal();
                }}
              >
                <Text style={styles.modalText}></Text>
              </TouchableOpacity>
              <Text>Acá también van comentarios</Text>
              <Text>
                Acá también debe ir la posibilidad de agregar un comentario
              </Text>
            </View>
          </Modal>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: 300,
    marginTop:"5%",
    marginBottom: "5%",
    borderRadius: "5%"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: "10%",
    backgroundColor: "#E9EDC9"
  },
  closeModal: {
    alignSelf: "flex-end",
    padding: 10,
    backgroundColor: "#dc3545",
    marginTop: 2,
    marginBottom: 10,
    borderRadius: 4,
  },

  modalText: {
    fontWeight: "bold",
    color: "#fff",
  },
  modalView: {
    backgroundColor: "green",
    borderRadius: 10,
  },
  modal: {
    border: "none",
  },
  username: {
    fontWeight: "bold",
    fontFamily: "Montserrat",
    textTransform: 'uppercase',
    }
});
