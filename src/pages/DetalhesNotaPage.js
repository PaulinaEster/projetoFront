import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import CheckBox from '../components/checkBox';
import Tags from '../components/tags';

const DetalhesNotaPage = ({ route }) => {

  const [nota, setNota] = useState({});

  useEffect(() => {
    AsyncStorage.getItem(
      route.params?.nome /* pega item pela chave de identificação */,
      (err, result) => {
        if (err) console.log(err);
        else { 
          setNota(JSON.parse(`${result}`)); 
        }
      }
    )
  }, [nota]);

  const renderItem = ({ item }) => (<CheckBox item={item} nome={route.params?.nome} />)
  const renderTag = ({item}) => (<View style={styles.text}><Text>{item}</Text></View>);

  const Informacoes = ({ nome, conteudo }) => (
    <View>
      <Text style={styles.textLabel} > {nome}  </Text>
      <Text style={styles.textTitle}> {conteudo}</Text>
    </View>
  )

  return (
    <View style={{ padding: 10, backgroundColor: nota.cor, height: '100%' }}>
      <View style={styles.container}>
        <Informacoes nome='NOME' conteudo={nota.nome} />
        <Informacoes nome='DESCRIÇÃO' conteudo={nota.descricao} />
        <Informacoes nome='PRIORIDADE' conteudo={nota.prioridade} />
        <View>
          <Text style={styles.textLabel} > TAGS </Text>
          { `${nota.tags}`.split(' ')[0] ==  '' ? <Text> sem notas... </Text> : <FlatList 
            data={`${nota.tags}`.split(' ')}
            numColumns={10}
            renderItem={renderTag}
            keyExtractor={(item, index) => `${item}${index}`}
          />}
        </View>
        <View>
          <Text style={styles.textLabel} > LISTA DE TAREFAS </Text>
          <View>
            <FlatList
              data={nota.checkList}
              renderItem={renderItem}
              keyExtractor={(item, index) => `${item}${index}`}
            />
          </View>
        </View>
      </View>
    </View>
  )
}

export default DetalhesNotaPage;

const styles = StyleSheet.create({
  textLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
    marginTop: 10,
    color: '#8D8D8D'
  },
  text: {
    margin: 5,
    padding: 15,
    backgroundColor: '#E0E0E0',
    borderRightColor: 20,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 35
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

