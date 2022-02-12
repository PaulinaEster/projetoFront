import React, { useEffect, useState } from "react";
import { View, Pressable, Text, StyleSheet, Button, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';

import ListNotas from "../components/ListNotas";

const HomePage = ({ route, navigation }) => {

  const [keys, setKeys] = useState([]);
  const [ pesquisa, setPesquisa ] = useState("");

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
          <TextInput 
            style={styles.inputText} 
            value={pesquisa}
            onChangeText={setPesquisa}
            placeholder='Pesquisar...'
            placeholderTextColor="#C4C4C4"  
            underlineColor= '#C4C4C4'
          />
          <Button title="+" color="#fff" onPress={()=> navigation.navigate('CriarNota')} />
        </View>
      ),
    });
  }, [navigation]);

  const pegarNotas = async () => {
    setKeys([]);
    let keys = await AsyncStorage.getAllKeys();
    setKeys(keys);
  }

  const filtrarKeys = keys.filter(key => key.toLowerCase().includes(pesquisa.toLowerCase()));
  
  useFocusEffect(
    React.useCallback(() => {
      pegarNotas();
    }, [])
  );

  return (
    <View>
      <View>
        <ListNotas notas={filtrarKeys} />
      </View>
      <View style={styles.buttonCreateNota}>
        <Pressable onPress={() => navigation.navigate("CriarNota")}>
          <Text style={styles.text}>+</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  buttonCreateNota: {
    position: 'absolute',
    width: 40,
    height: 40,
    backgroundColor: "#0F62FE",
    zIndex: 10,
    bottom: -580,
    left: 300,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  text: {
    fontSize: 38,
    color: "#FFFFFF", 
  },
  inputText:{
    color: '#fff',
    padding: 5,
    fontSize: 18,
    height: 28,
    width: 150,
    alignSelf: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    marginRight: 15,
  }
});
