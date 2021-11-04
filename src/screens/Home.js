import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Post from '../components/Post';
import { db } from '../firebase/config';

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            posts: []
        }
    }
    componentDidMount(){
        db.collection('posts').orderBy("cratedAt", "desc").onSnapshot(
            docs => {
                console.log(docs);
                let postsAux = [] //Variable auxiliar
                docs.forEach( doc => {
                    console.log(doc.id);
                    postsAux.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                console.log(postsAux);
                this.setState({
                    posts: postsAux
                })
            }
        )
    }
    render(){
        console.log(this.state.posts);
        return(
            <View style = {styles.container}>
                <Text> Home </Text>
                <TouchableOpacity style = {styles.button} onPress={() => this.props.handleLogout()}>
                    <Text style = {styles.text}> Logout </Text>
                </TouchableOpacity>
                {/* Lazy louder: carga a medida que se scrollea */}
                <FlatList
                data = {this.state.posts}
                keyExtractor = {post => post.id.toString()}
                renderItem = { ({item}) => 
                    <Post dataItem = {item}></Post> }
                />
            </View>
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
    }
})