import React, { Component }  from "react";
import { Text, View, StyleSheet} from "react-native";

export default class Home extends Component{
    constructor (props){
        super(props)
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.text}> Home </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    text: {
        color: '#212529',
        fontSize: 20,
        margin: 10
    }
})