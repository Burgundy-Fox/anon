import React from 'react'
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	FlatList,
} from "react-native";
import {useSelector} from 'react-redux'
import axios from 'axios';

export default function index({navigation}) {
    const {access_token} = useSelector(state => state.usersReducer)

    function midtransWeb(price){
        axios({
            method: 'post',
            url: '/transaction/midtransToken',
            data: {
                price
            },
            headers: {access_token}
        })
        .then(({data}) => {
            navigation.navigate('Webview', {url : data.transaction.redirect_url})
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <View style={[styles.container, ]}>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', width: 350, marginHorizontal: 20, marginVertical:10}}>
                <TouchableOpacity style={styles.button} onPress={()=> midtransWeb(5000)}><Text>5000</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=> midtransWeb(10000)}><Text>10000</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=> midtransWeb(15000)}><Text>15000</Text></TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', width: 350, marginHorizontal: 20, marginVertical:10}}>
                <TouchableOpacity style={styles.button} onPress={()=> midtransWeb(20000)}><Text>20000</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=> midtransWeb(50000)}><Text>50000</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=> midtransWeb(100000)}><Text>100000</Text></TouchableOpacity>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		paddingTop: 35,
		alignItems: "center",
	},
	button: {
		alignItems: "center",
        justifyContent: 'center',
		backgroundColor: "green",
		width: 90,
        height:90
	},
});
