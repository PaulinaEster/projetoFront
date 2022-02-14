import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable, Alert, FlatList } from 'react-native';
import { Formik } from 'formik';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from "@react-native-async-storage/async-storage";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { adicionarItemAsync } from '../assets/asyncStorage.utils';

const Formulario = ({ notas, navigation }) => {
  const [colorBorder, setColorBorder] = useState('#000');
  const [lista, setLista] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    setLista(lista);
  }, [lista, renderItem, text, adicionarItem, removerItem])

  const enviarNota = (nota) => {
    let nome = nota.nome.split(' ').join('');
    adicionarItemAsync(nome, nota);

    Alert.alert(
      '',
      'Nota criada com sucesso',
      [
        {
          text: 'Ver nota',
          onPress: () => navigation.navigate('Detalhes', { nome }),
          style: 'cancel',
        },
        { text: 'Voltar', onPress: navigation.navigate('HomePage', { nota }) },
      ]
    )
  }

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row' }}>
      <BouncyCheckbox
        style={{ width: '70%' }}
        size={20}
        iconStyle={{ borderColor: "#0F62FE", backgroundColor: '#0F62FE' }}
        text={item}
        text={item.nome}
        isChecked={item.valor}
      />
      <Button title="x" onPress={e => { let text = item; removerItem(text);}} />
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
      <View>
        <Formik
          initialValues={{ nome: '', descricao: '', prioridade: '', data: `${new Date().toLocaleString()}`, cor: '#F8F8F8', tags: '', checkList: [] }}
          onSubmit={values => {
            if (values.nome == '') {
              setColorBorder('red');
              return;
            };
            values.checkList = lista;
            enviarNota(values);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>
              <View >
                <Text style={styles.textLabel}> Nome (Obrigatório) </Text>
                <TextInput
                  style={{
                    marginBottom: 15,
                    marginTop: 10,
                    height: 40,
                    fontSize: 18,
                    paddingTop: 10,
                    paddingLeft: 10,
                    backgroundColor: '#fff',
                    borderBottomWidth: 0.5,
                    borderColor: colorBorder
                  }}
                  onChangeText={handleChange('nome')}
                  onBlur={handleBlur('nome')}
                  value={values.nome}
                />
              </View>
              <View >
                <Text style={styles.textLabel}> Descrição </Text>
                <TextInput
                  style={styles.inputLabel}
                  onChangeText={handleChange('descricao')}
                  onBlur={handleBlur('descricao')}
                  value={values.descricao}
                />
              </View>
              <View >
                <Text style={styles.textLabel}> Data </Text>
                <TextInput
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
                    value: '',
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
                    value: '#F8F8F8',
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
                    keyExtractor={(item, index) => `item${index}`}
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
          )}
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
