import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Pressable } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const DetalhesNotaPage = ({ route, navigation }) => {

  const [nota, setNota] = useState({});

  useEffect(() => {
    AsyncStorage.getItem(
      route.params?.nome /* pega item pela chave de identificação */,
      (err, result) => {
        if (err) console.log(err);
        else setNota(JSON.parse(`${result}`))
      }
    )
  }, [])

  const Informacoes = ({ nome, conteudo }) =>( 
    <View>
      <Text style={styles.textLabel} > {nome}  </Text>
      <Text style={styles.textTitle}> { conteudo }</Text>
    </View>
  )

  return (
    <View style={{padding: 10, backgroundColor: nota.cor}}>
      <View >
        <Pressable  onPress={() => navigation.navigate('EditarNota', { nome: route.params?.nome })} >
          <Text> Editar </Text>
        </Pressable>
        <Pressable  onPress={() => navigation.navigate('HomePage')} >
          <Text> Voltar </Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <Informacoes nome='NOME' conteudo={nota.nome} />
        <Informacoes nome='DESCRIÇÃO' conteudo={nota.descricao}/>
        <Informacoes nome='PRIORIDADE' conteudo={nota.prioridade}/>
        <View>
          <Text style={styles.textLabel}> Cor </Text>
          <Text style={{
            backgroundColor: nota.cor, width: '100%',
            fontSize: 18,
            paddingTop: 10,
            paddingLeft: 10,
          }}>  </Text>
        </View>
      </View>
    </View>
  )
}

export default DetalhesNotaPage;

const styles = StyleSheet.create({
  container: {
    
  },
  textLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
    marginTop: 10,
    color: '#8D8D8D'
  },
  textTitle: {
    fontSize: 24,
    marginTop: 10,
    marginBottom: 15,
    width: '100%',
    paddingTop: 10,
    paddingLeft: 10,
    borderBottomWidth: 0.5,
  },
  inputLabel: {
    marginBottom: 15,
    marginTop: 10,
    width: '100%',
    fontSize: 18,
    paddingTop: 10,
    paddingLeft: 10,
    borderBottomWidth: 0.5,
  }
});

