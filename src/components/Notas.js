import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { pegarItem } from '../assets/asyncStorage.utils';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Notas = ({ item, navigation }) => {
  const [nota, setNota] = useState({});

  useEffect(() => {
    AsyncStorage.getItem(
      item /* pega item pela chave de identificação */,
      (err, result) => {
        if (err) console.log(err);
        else setNota(JSON.parse(`${result}`))
      }
    )
  }, [])

  return (
    <View style={{
      width: 180,
      borderWidth: 1,
      borderColor: nota.cor,
      backgroundColor: nota.cor,
      padding: 14,
      margin: 4,
      boxSizing: 'border-box',
      alignItems: 'center',
      flex: 1,

    }}>
      <Pressable
        onPress={() => navigation.navigate('EditarNota')}
      >
        <Text style={styles.sectionTitle}> {nota.nome} </Text>
        { nota.descricao == '' ? null : <Text style={styles.sectionDescription}> {nota.descricao} </Text>}
      </Pressable>
    </View>
    
  )
};

export default Notas;


const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'justify'
  },
  highlight: {
    fontWeight: '700',
  },
});
