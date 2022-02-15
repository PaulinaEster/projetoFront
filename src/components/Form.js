import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Button, Alert, ScrollView } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNPickerSelect from 'react-native-picker-select';
import BouncyCheckbox from "react-native-bouncy-checkbox";

const Form = ({ nota, mensagem, title }) => {

  const navigation = useNavigation();
  const [colorBorder, setColorBorder] = useState('#000');
  const [nomeAntigo, setNomeAntigo] = useState(nota.nome);
  const [nome, setNome] = useState(nota.nome);
  const [descricao, setDescricao] = useState(nota.descricao);
  const [data, setData] = useState(nota.data);
  const [prioridade, setPrioridade] = useState(nota.prioridade);
  const [cor, setCor] = useState(nota.cor);
  const [tags, setTags] = useState(nota.tags != undefined ? nota.tags : '');
  const [checkList, setCheckList] = useState(nota.checkList != undefined ? nota.checkList : []);

  const [text, setText] = useState('');

  const enviarNota = () => {
    if (nome == '') {
      setColorBorder('red');
      return;
    }
    const notaAtual = {
      nome,
      descricao,
      data: `${new Date().toLocaleString()}`,
      prioridade,
      cor,
      tags,
      checkList
    }

    let keyItem = nome.split(' ').join('').toLowerCase();

    if (nomeAntigo != nome || nomeAntigo == '') {
      if (nomeAntigo != '') {
        let keyItemAntigo = nomeAntigo.split(' ').join('').toLowerCase();

        AsyncStorage.removeItem(
          keyItemAntigo,
          (err, result) => {
            if (err) console.log(err);
            else console.log('removido');
          }
        )
      }
      AsyncStorage.setItem(
        keyItem,
        JSON.stringify(notaAtual),
        (err, result) => {
          if (err) console.log(err);
          else return console.log("adicionado com sucesso", notaAtual);
        }
      )
    } else {
      AsyncStorage.mergeItem(
        keyItem,
        JSON.stringify(notaAtual),
        (err, result) => {
          if (err) console.log(err);
          else console.log('editado! ');
        }
      )
    }

    Alert.alert(
      '',
      mensagem,
      [{ text: 'Voltar para notas', onPress: navigation.navigate('HomePage', { nota: keyItem }) }]
    )
  }

  const renderTag = ({ item }) => <View style={styles.tags}><Text>{item}</Text></View>;

  const renderCheckList = ({ item }) => (
    <View style={{ flexDirection: 'row' }}>
      <BouncyCheckbox
        style={{ width: '70%' }}
        size={20}
        iconStyle={{ borderColor: "#0F62FE", backgroundColor: '#0F62FE' }}
        text={item}
        text={item.nome}
        isChecked={item.valor}
      />
      <Button title="x" onPress={e => { let text = item; removerItemCheckList(text); }} />
    </View>
  )

  const adicionarItemCheckList = (text) => {
    if (text != '') {
      let obj = { nome: text, valor: false }
      let auxList = checkList;
      auxList.push(obj);
      setCheckList(auxList);
      setText('');
    }
  }

  const removerItemCheckList = (text) => {
    let auxList = checkList;
    auxList.splice(auxList.indexOf(text), 1);
    setCheckList(auxList);
  }

  return (
    <ScrollView>
      <View>
        <Text style={styles.textLabel}>Nome (Obrigatório)</Text>
        <TextInput style={{
          marginBottom: 15,
          marginTop: 10,
          height: 40,
          fontSize: 18,
          paddingTop: 10,
          paddingLeft: 10,
          backgroundColor: '#fff',
          borderBottomWidth: 0.5,
          borderColor: colorBorder
        }} value={nome} onChangeText={setNome} />
      </View>
      <View>
        <Text style={styles.textLabel}>Descrição</Text>
        <TextInput style={styles.inputLabel} value={descricao} onChangeText={setDescricao} />
      </View>
      <View>
        <Text style={styles.textLabel}>Data</Text>
        <TextInput style={styles.inputLabel} value={data} />
      </View>
      <View >
        <Text style={styles.textLabel}> Prioridade</Text>
        <RNPickerSelect
          style={styles.inputLabel}
          placeholder={{
            label: 'Escolha',
            value: '',
          }}
          selectedValue={prioridade}
          onValueChange={setPrioridade}
          items={[
            { label: 'Urgente', value: 'urgente' },
            { label: 'Alta', value: 'alta' },
            { label: 'Média', value: 'media' },
            { label: 'Baixa', value: 'baixa' },
          ]}
        />
      </View>
      <View>
        <Text style={styles.textLabel}>Cor</Text>
        <RNPickerSelect
          placeholder={{
            label: 'Escolha',
            value: cor == '' ? '#F8F8F8' : cor,
          }}
          selectedValue={cor}
          onValueChange={setCor}
          items={[
            { label: 'Branco', value: '#F8F8F8' },
            { label: 'Rosa', value: '#FFF3F3' },
            { label: 'Azul', value: '#EAF1FF' },
            { label: 'Verde-água', value: '#E4FFEF' },
          ]}
        />
      </View>
      <View>
        <Text style={styles.textLabel}>Tags</Text>
        {tags == '' ? <Text>sem tags...</Text> :
          <FlatList
            renderItem={renderTag}
            data={`${tags}`.split(' ')}
            numColumns={10}
            keyExtractor={(item, index) => `${item}${index}`}
          />
        }
        <TextInput style={styles.inputLabel} value={tags} onChangeText={setTags} placeholder='adicionar tags...' />
      </View>
      <View>
        <Text styles={styles.textLabel}> Check List </Text>
        <View>
          <FlatList
            data={checkList}
            renderItem={renderCheckList}
            keyExtractor={(item, index) => `item${index}`}
          />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            style={styles.inputLabelCheckList}
            value={text}
            onChangeText={setText}
            placeholder="Novo item..."
          />
          <Button
            title='+'
            onPress={e => {
              if (text != '') {
                let item = text;
                adicionarItemCheckList(item);
              }
            }}
          />
        </View>
      </View>
      <Button title={title} onPress={enviarNota} />
    </ScrollView>
  )
}

export default Form;

const styles = StyleSheet.create({

  textLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
    marginTop: 10,
  },
  inputLabel: {
    marginBottom: 15,
    marginTop: 10,
    height: 40,
    fontSize: 18,
    paddingTop: 10,
    paddingLeft: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
  },
  inputLabelCheckList: {
    width: '70%',
    marginBottom: 15,
    marginTop: 10,
    height: 40,
    fontSize: 18,
    paddingTop: 10,
    paddingLeft: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
  },
  tags: {
    margin: 5,
    padding: 15,
    backgroundColor: '#E0E0E0',
    borderRightColor: 20,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 35
  },
});
