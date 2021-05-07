import  React  from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { createPortal } from 'react-dom';

export default function ListaTarefas({data, conclusaoTarefa}){
    return(
        <Animatable.View style={styles.container} animation="flipInX" useNativeDriver>

            <TouchableOpacity style={styles.verify} onPress={() => conclusaoTarefa(data)}>
                <Ionicons name="md-checkmark-circle" size={30} color="#121212"/>
            </TouchableOpacity>

            <Animatable.Text style={styles.textList} >
                {data.tarefas}
            </Animatable.Text>

        </Animatable.View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        elevation: 1.5,
        flexDirection:'row',
        margin: 8,
        padding:7,
        borderRadius:5,
        backgroundColor:'#FFF',
        shadowColor:'#000',
        shadowOpacity:0.2,
        shadowOffset:{ widht:1,height: 3}

    },
    textList: {
        color: '#121212',
        fontSize: 18,
        paddingLeft: 10,
        paddingRight: 10,

    }
})