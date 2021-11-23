import React, { Component }  from "react";
import { Text, View, StyleSheet, ActivityIndicator, TextInput} from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import {auth, db} from '../firebase/config'
import Post from '../components/Post'

export default class Search extends Component{
    constructor (props){
        super(props);
        this.state = {
            posts: [],
            searchInput: "",
        }
    }

    componentDidMount(){
        db.collection('posts').orderBy('cratedAt', 'desc').onSnapshot(
            docs=> {
                let postsAux= []
                docs.forEach (doc =>{
                    postsAux.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                this.setState({
                    posts: postsAux,
                })
            }
        ) 
    } 

    render(){
        let filteredPosts = this.state.searchInput.length > 0
            ? this.state.posts.filter(element => element.data.owner.includes(this.state.searchInput)) 
            : this.state.posts

        return(
            <View style={styles.container}>
                <>
                <TextInput
                    style={styles.field}
                    keyboardType="default"
                    placeholder="Buscar recetas de un chef"
                    onChangeText={text => this.setState({searchInput: text})}
                />
                {filteredPosts.length > 0 ?
                        <FlatList
                            style={styles.postList}
                            data = {filteredPosts}
                            keyExtractor = {post => post.id.toString()}
                            renderItem= {({item})=>
                                <Post dataItem = {item}></Post>}
                        />:
                        <Text>Lo sentimos, este chef no ha publicado ninguna receta</Text> 
                } 
                </> 
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  field: {
    width: "70%",
    height: 50,
    backgroundColor: "#FAFAFA",
    borderRadius: 30,
    margin: 10,
    padding: 10,
    borderColor: "#CCD5AE",
    borderWidth: 0.1,
  },
  postList: {
    marginTop: "5%",
    padding: "5%",
    width: "100%"
  },
  button: {
    width: "40%",
    height: 45,
    backgroundColor: "#CCD5AE",
    borderRadius: 30,
    margin: 10,
    alignItems: "center",
    fontFamily: 'Montserrat'
  },
  text: {
    color: "black",
    fontSize: 18,
    margin: 10,
    fontFamily: 'Montserrat'
  },
  appLogo: {
    height: 200,
    width: 200,
  },
})