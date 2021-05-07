import { StatusBar } from 'expo-status-bar';
import React,{useState, useCallback, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Modal, TextInput, AsyncStorage} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import ListaTarefas from './src/components/ListaTarefas/index.js';
import * as Animatable from 'react-native-animatable';

const AniamatedBTN = Animatable.createAnimatableComponent(TouchableOpacity);


export default function App() {
  const [tarefas, setTarefas] = useState([]);
  const [ open, setOpen] = useState (false);
  const [input, setInput] = useState('');

  function cadTarefa(){
    if(input === "") return;
    
    const data ={
      key:input,
      tarefas:input,
    };
  
    setTarefas([...tarefas, data]);
    setOpen(false);
    setInput('');
  }
  //Busca Tarefas Salvas
  useEffect(() => {
    async function carregaTarefas(){
      const tarefasArmaz = await AsyncStorage.getItem('@tarefas');

      if(tarefasArmaz){
        setTarefas(JSON.parse(tarefasArmaz));
      }
    }
    carregaTarefas();
  },[]);
  
  // Salva Alterações
  useEffect(() =>{
    async function salvaTarefas(){
      await AsyncStorage.setItem('@tarefas', JSON.stringify(tarefas));
    }

    salvaTarefas();
  },[tarefas]);

  const conclusaoTarefa = useCallback((data) => {
    const find = tarefas.filter(r => r.key !== data.key);
    setTarefas(find);
  });

  return (

    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.topBar}>
        <Text style={styles.titulo}>Minhas Tarefas</Text>
      </View>

      <FlatList 
        marginHorizontal={10}
        showsVerticalScrollIndicator={false}
        data={tarefas}
        keyExtractor={(item) => String(item.key)  }
        renderItem={({item}) => <ListaTarefas data={item} conclusaoTarefa={conclusaoTarefa}/>}
      />

      <Modal animationType="slide" transparent={false} visible={open}>
        <SafeAreaView style={styles.container}>

          <View style={styles.topBarModal}>

            <TouchableOpacity style={styles.btnVoltar} onPress={ () => setOpen(false)} >
              <Ionicons name="md-arrow-back" size={30} color="#FFF"/>
            </TouchableOpacity>

            <Text style={styles.titulo}>Nova Tarefa</Text>
          </View>

          <Animatable.View animation="fadeInUp" useNativeDriver>
            <TextInput multiline={true}
            placeholder="O Que Você Precisa Fazer Hoje ?"
            style={styles.input}
            value={input}
            onChangeText={(texto) => setInput(texto)}
            />
            
            <TouchableOpacity style={styles.btnCadastrar} onPress={cadTarefa}>
              <Text style={styles.btnCadastrarText} >Cadastrar</Text>
            </TouchableOpacity>
          </Animatable.View>

        </SafeAreaView>
      </Modal>

      <AniamatedBTN style={styles.btnCriar} onPress={() => setOpen(true) } animation="bounceInUp" duration={3000} useNativeDriver >
        <Ionicons name="ios-add" size={35} color="#FFF"/>
      </AniamatedBTN>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171d31',
  },
  topBar:{
    backgroundColor: '#171d31',
    alignItems: 'center',
    justifyContent: 'flex-start',
    elevation:2,
    zIndex:9,
    marginTop:20,
    padding:15,
    shadowColor:'#000',
  },
  titulo:{
    color:'#fff',
    fontSize:20,
    alignItems:'center',
    fontWeight:'bold',
  },
  btnCriar:{
    position:'absolute',
    alignItems:'center',
    justifyContent:'center',
    right:25,
    bottom:25,
    elevation:2,
    zIndex:9,
    width:60,
    height:60,
    borderRadius:30,
    backgroundColor:'#0094FF',
    shadowColor:'#000',
    shadowOpacity: 0.2,
    shadowOffset:{ width:1,height:3,},

  },
  topBarModal:{
    alignItems: 'center',
    elevation:2,
    zIndex:9,
    shadowColor:'#000',
    flexDirection: 'row',
  },
  btnVoltar:{
    padding:10,
    marginRight:90,

  },
  input:{
    backgroundColor:"#FFF",
    height:130,
    borderRadius:5,
    marginTop:7,
    margin:10,
    padding:7,
    textAlignVertical:"top",

  },
  btnCadastrar:{
    backgroundColor:"#FFF",
    margin: 10,
    padding:10,
    borderRadius:5,
    alignItems:"center",
  },
  btnCadastrarText:{
    fontSize:18,
  }
});
