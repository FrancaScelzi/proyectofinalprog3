import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
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
      commentBoxInput: "",
    };
  }

  componentDidMount() {
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

  onComment() {
    const posteoActualizar = db.collection("posts").doc(this.props.dataItem.id);
    posteoActualizar
      .update({
        comments: firebase.firestore.FieldValue.arrayUnion({
          userDisplayName: auth.currentUser.displayName,
          comment: this.state.commentBoxInput,
        }),
      })
      .then(() => {
        this.setState({
          comments: this.state.comments + 1,
          commentBoxInput: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleModal() {
    if (this.state.showModal) {
      this.setState({
        showModal: false,
      });
    } else {
      this.setState({
        showModal: true,
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("../../assets/cocinero1.png")}
          style={styles.chefIcon}
          resizeMode={"contain"}
        />

        <Text style={styles.username}>{this.props.dataItem.data.owner}</Text>

        <Image
          style={styles.image}
          source={{ uri: this.props.dataItem.data.photo }}
          resizeMode="cover"
        />

        {!this.state.liked ? (
          <TouchableOpacity onPress={() => this.onLike()}>
            <Text style={styles.like}>❤️</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => this.onDislike()}>
            <Text style={styles.like}>🖤</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.text}>{this.state.likes} likes</Text>

        <Text style={styles.username}>
          {this.props.dataItem.data.owner}
          {":"} {this.props.dataItem.data.description}
        </Text>

        <TouchableOpacity onPress={() => this.handleModal()}>
          <Text>
            {!this.state.showModal ? "Ver comentarios" : "Cerrar comentarios"}
          </Text>
        </TouchableOpacity>

        {this.state.showModal ? (
          <Modal
            animationType="fade"
            transparent={false}
            visible={this.state.showModal}
            style={styles.modal}
          >
            <View style={styles.modalView}>
              <ScrollView style={styles.commentsList}>
                {this.props.dataItem.data.comments.length !== 0 ? (
                  <>
                    {this.props.dataItem.data.comments.map((comment, index) => {
                      return (
                        <View>
                          <Text style={styles.commentDisplayName}>
                            {comment.userDisplayName}
                          </Text>
                          <Text style={styles.commentText}>
                            {comment.comment}
                          </Text>
                        </View>
                      );
                    })}
                  </>
                ) : (
                    <Text style={styles.noComments}>
                      Todavía no hay comentarios, {"\n"} sé la primer persona en
                      opinar!
                    </Text>
                )}
              </ScrollView>

              <View style={styles.commentBox}>
                <TextInput
                  style={styles.commentBoxInput}
                  placeholder="Deja tu comentario..."
                  onChangeText={(text) =>
                    this.setState({ commentBoxInput: text })
                  }
                  value={this.state.commentBoxInput}
                />

                <TouchableOpacity
                  style={styles.uploadCommentButton}
                  onPress={() => this.onComment()}
                >
                  <Text style={{ color: "white" }}>Subir</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  chefIcon: {
    borderRadius: "50%",
    height: 30,
    width: 30,
    alignSelf: "flex-start",
  },
  image: {
    height: 300,
    marginTop: "3%",
    marginBottom: "3%",
    padding: "%5",
    borderRadius: 15,
  },
  like: {
    fontSize: 30,
  },
  container: {
    flex: 1,
    backgroundColor: "#F3F5E0",
    borderRadius: 15,
    padding: 10,
    marginBottom: "5%",
  },
  text: {
    color: "black",
    fontSize: 15,
    marginBottom: 5,
    fontFamily: "Montserrat",
    padding: "%5",
  },
  modal: {
    border: "none",
    marginTop: 10,
    width: "100%",
  },
  closeModal: {
    backgroundColor: "red",
    alignSelf: "flex-end",
    borderRadius: 50,
    padding: 10,
    margin: 10,
  },
  modalText: {
    color: "black",
    fontFamily: "Montserrat",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 10,
  },
  username: {
    fontWeight: "bold",
    textTransform: "uppercase",
    fontFamily: "Montserrat",
  },
  commentsList: {
    height: 100,
    width: "100%",
    marginBottom: 10,
    fontFamily: "Montserrat",
  },
  commentDisplayName: {
    color: "black",
    fontWeight: "bold",
    marginBottom: 2,
  },
  commentText: {
    color: "black",
    marginBottom: 10,
    fontFamily: "Montserrat",
  },
  commentBox: {
    flexDirection: "row",
    justifyContent: "center",
  },
  commentBoxInput: {
    width: "70%",
    height: 50,
    backgroundColor: "#FAFAFA",
    borderRadius: 10,
    marginRight: 5,
    borderColor: "#CCD5AE",
    borderWidth: 0.1,
    padding: 5,
  },
  uploadCommentButton: {
    height: 50,
    width: 60,
    borderRadius: 15,
    backgroundColor: "brown",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Montserrat",
  },
  noComments: {
    color: "black",
    fontFamily: "Montserrat",
    fontSize: 16,
    textAlign: 'center',
    paddingTop: 20,
  },
});
