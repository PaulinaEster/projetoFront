import React, { useEffect, useState }  from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CheckBox = ({ item, nome }) => {
  
  const [ checked, setChecked ] = useState(item.valor);

  useEffect(()=>{
    setChecked()
  },[checked])

  const atualizaValores = async (valor) => {
    let nota = await AsyncStorage.getItem(nome); 
    nota = JSON.parse(nota);
    let itemCheck = nota.checkList.map(itemAntigo => {
      if(itemAntigo.nome == item.nome) itemAntigo.valor = valor;
    })
    AsyncStorage.mergeItem(nome, JSON.stringify(nota));
  }

  return (
  <View >
    <BouncyCheckbox
      size={20}
      iconStyle={{ borderColor: "#0F62FE", backgroundColor: '#0F62FE' }}
      textStyle={{ fontSize: 20, color: '#000' }}
      style={{ padding: 5 }}
      text={item.nome}
      isChecked={checked}
      onPress={(e)=> {
        setChecked(e);
        atualizaValores(e)
      }}
    />
  </View>
)}

export default CheckBox;