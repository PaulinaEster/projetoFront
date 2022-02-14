import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Pressable, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import CheckBox from './checkBox';

const Notas = ({ keyItem }) => {
  const [nota, setNota] = useState({});
  const navigation = useNavigation(); 

  useEffect(() => {
    AsyncStorage.getItem(
      keyItem /* pega item pela chave de identificação */,
      (err, result) => {
        if (err) console.log(err);
        else setNota(JSON.parse(`${result}`))
      }
    )
  }, [])

  const renderItem = ({item}) => (<CheckBox item={item} nome={keyItem} />)

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
        onPress={() => navigation.navigate('Detalhes', { nome: keyItem })}
      >
        <Text style={styles.sectionTitle}> {nota.nome} </Text>
        { nota.descricao == '' ? nota.checkList == '' ? null :
          <View>
            <FlatList
              data={nota.checkList}
              renderItem={renderItem}
              keyExtractor={(item, index) => `item${index}`}
            />
          </View> 
        :  <Text style={styles.sectionDescription}> {nota.descricao} </Text> 
        }
        
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
