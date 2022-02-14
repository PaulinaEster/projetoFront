import AsyncStorage from "@react-native-async-storage/async-storage";

const adicionarItemAsync = async (keyItem, item) => {
  await AsyncStorage.setItem(
    keyItem,
    JSON.stringify(item),
    (err, result) => {
      if (err) console.log(err);
      else return console.log("adicionado com sucesso", item);
    }
  )
}

const pegarItemAsync = async (keyItem) => {
  const data = await AsyncStorage.getItem(
    keyItem /* pega item pela chave de identificação */,
    (err, result) => {
      if (err) console.log(err);
      else return result;
    }
  )
  if (data !== null) {
    console.log(data);
    return data;
  }
}

const atualizarItemAsync = async (keyItem, novoItem) => {
  await AsyncStorage.mergeItem(
    keyItem,
    JSON.stringify(novoItem),
    (err, result) => {
      if (err) console.log(err);
      else console.log('editado! ');
    }
  )
}

const removerItemAsync = async (keyItem) => {
  await AsyncStorage.removeItem(
    keyItem,
    (err, result) => {
      if (err) console.log(err);
      else console.log('removido');
    }
  )
}

const pegarTudoAsync = async () => {
  try {
    const data = await AsyncStorage.getAllKeys(
      /* faz update de valores  se ja existir substitui se não existir adiciona*/
      (err, result) => {
        if (err) console.log(err);
        else return result;
      }
    );
    if (data !== null) {
      console.log(data);
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

const removerTudoAsync = async () => {
  const data = await AsyncStorage.clear(
    (err, result) => {
      if (err) console.log(err);
      else return result;
    }
  );
  if (data !== null) {
    console.log(data);
    return data;
  }
}

export { adicionarItemAsync, pegarItemAsync, atualizarItemAsync, pegarTudoAsync, removerItemAsync, removerTudoAsync };



/* import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Alert } from 'react-native';
import { Formik } from 'formik';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { removerItemAsync, pegarItemAsync, adicionarItemAsync, atualizarItemAsync } from '../assets/asyncStorage.utils';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Formulario = ({ keyItem }) => {

  const [nota, setNota] = useState({});
  const [lista, setLista] = useState([{}]);
  const [text, setText] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    pegarNota();
  }, [lista, renderItem, text, adicionarItem, removerItem])

  const verificaValores = (notaAtual, nomeAtual) => {
    if(notaAtual.nome == '') notaAtual.nome = nota.nome;
    if(notaAtual.descricao == '') notaAtual.descricao = nota.descricao;
    if(notaAtual.prioridade == '') notaAtual.prioridade = nota.prioridade;
    if(notaAtual.cor == '') notaAtual.cor = nota.cor;
    if(notaAtual.tags == '') notaAtual.tags = nota.tags;
    if(notaAtual.checkList == null) notaAtual.checkList = nota.checkList;
    enviarNota(notaAtual, nomeAtual);
  }

  const enviarNota = (notaAtual, nomeAtual) => {
    console.log(nomeAtual)
    if (keyItem != nomeAtual) {
      AsyncStorage.removeItem(
        keyItem,
        (err, result) => {
          if (err) console.log(err);
          else console.log('removido');
        }
      )

      AsyncStorage.setItem(
        nomeAtual,
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
      'Nota editada com sucesso',
      [{ text: 'Voltar para notas', onPress: navigation.navigate('HomePage', { nota: nomeAtual })}]
    )
  }

  const pegarNota = () => {
    AsyncStorage.getItem(
      keyItem,
      (err, result) => {
        if (err) console.log(err);
        else setNota(JSON.parse(result));
      }
    )
    console.log(nota)
    setLista(nota.checkList);
  }

  const renderItem = ({ item }) => (
    <View style={{flexDirection:'row'}}>
      <BouncyCheckbox
        style={{ width: '70%' }}
        size={20}
        iconStyle={{ borderColor: "#0F62FE", backgroundColor: '#0F62FE' }}
        text={item}
        text={item.nome}
        isChecked={item.valor}
      />
      <Button title="x" onPress={e => { let text = item; removerItem(text); }} />
    </View>
  )

  const adicionarItem = (text) => {
    if (text != '') {
      let obj = { nome: text, valor: false }
      let auxList = lista;
      auxList.push(obj);
      setLista(auxList);
      setText('');
    }
  }

  const removerItem = (text) => {
    let auxList = lista;
    auxList.splice(auxList.indexOf(text), 1);
    setLista(auxList);
  }

  return (
    <View>
      <View style={{ padding: 10, backgroundColor: '#F8F8F8' }}>
        <Formik
          initialValues={{nome: nota.nome, descricao: nota.descricao, prioridade: '', cor: '', tags: '', checkList: ''}}
          onSubmit={values => {
            let nome = `${values.nome}`.split('').join('').toLowerCase();
            enviarNota(values, nome);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => {
            return (
              <View>
                <View >
                  <Text style={styles.textLabel}> Nome (Obrigatório) </Text>
                  <TextInput
                    placeholder={nota.nome}
                    style={styles.inputLabel}
                    onChangeText={handleChange('nome')}
                    onBlur={handleBlur('nome')}
                    value={values.nome}
                  />
                </View>
                <View >
                  <Text style={styles.textLabel}> Descrição </Text>
                  <TextInput 
                    placeholder={nota.descricao}
                    style={styles.inputLabel}
                    onChangeText={handleChange('descricao')}
                    onBlur={handleBlur('descricao')}
                    value={values.descricao}
                  />
                </View>
                <View >
                  <Text style={styles.textLabel}> Data </Text>
                  <TextInput
                    placeholder={nota.data}
                    style={styles.inputLabel}
                    onBlur={handleBlur('data')}
                    value={values.data}
                  />
                </View>
                <View >
                  <Text style={styles.textLabel}> Prioridade</Text>
                  <RNPickerSelect
                    style={styles.inputLabel}
                    placeholder={{
                      label: 'Escolha',
                      value: `${nota.prioridade}`,
                    }}
                    selectedValue={values.prioridade}
                    onValueChange={handleChange('prioridade')}
                    onBlur={handleBlur("prioridade")}
                    items={[
                      { label: 'Urgente', value: 'urgente' },
                      { label: 'Alta', value: 'alta' },
                      { label: 'Média', value: 'media' },
                      { label: 'Baixa', value: 'baixa' },
                    ]}
                  />
                </View>
                <View >
                  <Text style={styles.textLabel}>Cor</Text>
                  <RNPickerSelect
                    placeholder={{
                      label: 'Escolha',
                      value: nota.cor,
                    }}
                    selectedValue={values.cor}
                    onValueChange={handleChange('cor')}
                    onBlur={handleBlur("cor")}
                    items={[
                      { label: 'Branco', value: '#F8F8F8' },
                      { label: 'Rosa', value: '#FFF3F3' },
                      { label: 'Azul', value: '#EAF1FF' },
                      { label: 'Verde-água', value: '#E4FFEF' },
                    ]}
                  />
                </View>
                <View>
                  <Text styles={styles.textLabel}> Tags </Text>
                  <TextInput
                    style={styles.inputLabel}
                    onChangeText={handleChange('tags')}
                    onBlur={handleBlur('tags')}
                    value={values.tags}
                  />
                </View>
                <View>
                  <Text styles={styles.textLabel}> Check List </Text>
                  <View>
                    <FlatList
                      data={lista}
                      renderItem={renderItem}
                      keyExtractor={(item, index) => `${item}${index}`}
                    />
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <TextInput
                      style={{ width: '70%' }}
                      value={text}
                      onChangeText={setText}
                      placeholder="Novo item..."
                    />
                    <Button
                      title='+'
                      onPress={e => {
                        if (text != '') {
                          let item = text;
                          adicionarItem(item);
                        }
                      }}
                    />
                  </View>
                </View>
                <Button onPress={handleSubmit} title="Submit" />
              </View>
            )
          }}
        </Formik>
      </View>
    </View>
  )
};

export default Formulario;

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

  }
});
 */