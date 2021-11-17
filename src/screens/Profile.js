import React, { Component } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {auth, db} from '../firebase/config';
import Post from '../components/Post'
import firebase from 'firebase';

export default class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            posts: []

        }
    }

    componentDidMount(){
        db.collection("posts")
        .where('email', '==', auth.currentUser.email)
        .orderBy("cratedAt", "desc")
        .onSnapshot((docs) => {
            let postsAux = []; //Variable auxiliar
            docs.forEach((doc) => {
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

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.username}>{auth.currentUser.displayName}</Text>
                <Text>Email: {auth.currentUser.email}</Text>
                <Text>Last access: {auth.currentUser.metadata.lastSignInTime}</Text>
                <Text>Posts: {this.state.posts.length}</Text>

                <TouchableOpacity style={styles.button} onPress={()=> this.props.handleLogout()}>
                    <Text style={styles.text}>Cerrar sesión</Text>
                </TouchableOpacity>

                <FlatList
                data={this.state.posts}
                keyExtractor={(post) => post.id.toString()}
                style={styles.postList}
                renderItem={({ item }) => <Post dataItem={item}></Post>}
                />
            </View>
        )
    }

}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      height: "100%",
      alignItems: "center",
      backgroundColor: "#E9EDC9",
      paddingTop: "5%",
    },
    postList: {
        padding: "10%",
        width: "100%"
    },
    button: {
        margin: 10,
        width: "20%",
        alignItems: "center",
        backgroundColor: "#CCD5AE",
        borderRadius: 50,
        marginTop: 25,
        width: 171,
        height: 45,
    },
    text: {
      color: "#212529",
      fontSize: 10,
      margin: 10,
    },
    username: {
        fontWeight: "bold",
        fontFamily: "Montserrat",
        textTransform: 'uppercase',
        }
  });