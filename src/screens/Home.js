import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Post from "../components/Post";
import { db } from "../firebase/config";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }
  componentDidMount() {
    db.collection("posts")
      .orderBy("cratedAt", "desc")
      .onSnapshot((docs) => {
        console.log(docs);
        let postsAux = []; //Variable auxiliar
        docs.forEach((doc) => {
          console.log(doc.id);
          postsAux.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        this.setState({
          posts: postsAux,
        });
      });
  }
  render() {
    console.log(this.state.posts);
    return (
      <View style={styles.container}>
        {/* Lazy louder: carga a medida que se scrollea */}
        <Text style={styles.text}>¡Échale un vistazo a las últimas recetas de nuestros chef!</Text>
        <FlatList
          data={this.state.posts}
          keyExtractor={(post) => post.id.toString()}
          style={styles.postList}
          renderItem={({ item }) => <Post dataItem={item}></Post>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
  },
  postList: {
      padding: "5%",
      width: "100%"
  },
  text: {
    color: "black",
    fontSize: 18,
    margin: 10,
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    margin: '10%',
    textAlign: 'center'

  },
});
