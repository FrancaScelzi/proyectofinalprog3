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
                <View style={styles.headerPerfil}>
                    <Text style={styles.username}>{auth.currentUser.displayName}</Text>
                    <Text style={styles.text}>{auth.currentUser.email}</Text>
                    <Text style={styles.text}>Último acceso: {auth.currentUser.metadata.lastSignInTime}</Text>
                    <Text style={styles.text}>{this.state.posts.length} posteos</Text>
                </View>

                {/* <TouchableOpacity style={styles.button} onPress={()=> this.props.handleLogout()}>
                    <Text style={styles.text}>Cerrar sesión</Text>
                </TouchableOpacity> */}

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
        backgroundColor: "white",
        paddingTop: "5%",
    },
    headerPerfil: {
        paddingLeft: "5%",
        paddingRight: "5%"
    },
    postList: {
        marginTop: "5%",
        padding: "5%",
        width: "100%"
    },
    username: {
        alignSelf: "flex-end",
        fontSize: 20,
        color:"#D4A373",
        fontWeight: "bold",
        textTransform: 'uppercase',
    },
    text: {
        alignSelf: "flex-end",
        color: "#83944C",
        fontSize: 15,
    },
    // button: {
    //     width: "40%",
    //     height: 45,
    //     backgroundColor: "#CCD5AE",
    //     borderRadius: 30,
    //     margin: 10,
    //     alignItems: "center",
    // },
  });