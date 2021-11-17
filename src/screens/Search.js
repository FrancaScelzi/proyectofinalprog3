// import React, { Component } from 'react';
// import {Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, TextInput, FlatList} from 'react-native';
// import {auth, db} from '../firebase/config';
// import Post from '../components/Post'

// export default class Search extends Component {
//     constructor(props){
//         super(props);
//         this.state = {
//             posts: [],
//             loaderPost: true,
//             searchInput: '',
//             users: []
//         }
//     }
    

//     componentDidMount(){
//         db.collection('posts').orderBy('cratedAt', 'desc').onSnapshot(
//             docs => {
//                 let postsAux=[]
//                 docs.forEach(doc => {
//                     postAux.push({
//                         id:doc.id,
//                         data: doc.data()
//                     })
//                 })
//                 this.setState({
//                     posts: postsAux,
//                     loaderPost: false
//                 })
//             }
//         )
//         db.collection('users').onSnapshot(
//             docs => {
//                 let usersAux = []
//                 docs.forEach(doc=> {
//                     usersAux.push({
//                         data:doc.data()
//                     })
//                 })
//                 this.setState({
//                     users: usersAux,
//                     loaderPost: false
//                 })
//             }
//         )
//     }

//     render(){
//         let filteredPosts = this.state.searchInput.lenght > 0
//         ? this.state.posts.filter(element => element.data.owner.includes(this.state.searchInput))
//         : this.state.posts

//         return (
//             <View style={styles.container}>
//                 {this.props.loader || this.state.loaderPost? (
//                       <ActivityIndicator size='large' color='blue'/>
//                   ): 
//                 <>
//                 <Text> ¡Hola {auth.currentUser.displayName}!</Text>
//                 <TextInput
//                     style={styles.field}
//                     keyboardType="default"
//                     placeholder="Buscar usuario..."
//                     onChangeText={text => this.setState({searchInput: text})}
//                 />
//                 {filteredUsers.length > 0 ?

//                     filteredPosts.length > 0 ?
                        
//                         <FlatList
//                             data = {filteredPosts}
//                             keyExtractor = {post => post.id.toString()}
//                             renderItem= {({item})=>
//                                 <Post dataItem = {item}></Post>}
//                         />:
//                         <Text>Lo siento, este usuario aun no hizo un posteo</Text>
                    
//                     : 
//                     <Text> Ese usuario no existe</Text>
                    
//                 } 
//                 </> }
//             </View>
//         )
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     field: {
//         width: '80%',
//         backgroundColor: "#09009B",
//         color: '#FFA400',
//         padding: 10,
//         marginVertical: 10
//     }
// })
