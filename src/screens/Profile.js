import React, { Component } from 'react';
import {Image, Text, View, StyleSheet, FlatList} from 'react-native';
import {auth, db} from '../firebase/config';
import Post from '../components/Post'

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
                <Image
                    source={require("../../assets/cocinero1.png")}
                    style={styles.chefIcon}
                    resizeMode={"contain"}
                />
                    <Text style={styles.username}>{auth.currentUser.displayName}</Text>
                    <Text style={styles.text}>{auth.currentUser.email}</Text>
                    <Text style={styles.text}>Último acceso: {auth.currentUser.metadata.lastSignInTime}</Text>
                    <Text style={styles.text}>{this.state.posts.length} posteo/s</Text>
                </View>

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
    chefIcon:{
        borderRadius: '50%',
        height: 50,
        width: 50,
        alignSelf: "flex-end",
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
        fontFamily: 'Montserrat'
    },
})