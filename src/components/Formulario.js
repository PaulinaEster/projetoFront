import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable, Alert } from 'react-native';
import { Formik } from 'formik';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from "@react-native-async-storage/async-storage";

import Tags from './tags';
import { adicionarItem } from '../assets/asyncStorage.utils';

const Formulario = ({ notas, navigation }) => {

  const [tags, setTags] = useState([]);
  const [ colorBorder, setColorBorder ] = useState('#000');
  const enviarNota = (nota) => {
    let nome = nota.nome.split(' ').join('');
    AsyncStorage.setItem(
      nome, JSON.stringify(nota),
      (err, result) => {
        if (err) console.log(err);
        else return console.log("adicionado com sucesso", nota);
      }
    );

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

  return (
    <View>

      <View style={{ padding: 10, backgroundColor: '#F8F8F8' }}>
        <Formik
          initialValues={{ nome: '', descricao: '', prioridade: '', data: `${new Date().toLocaleString()}`, cor: '#F8F8F8', tags: '' }}
          onSubmit={values => {
            if (values.nome == '') {
              setColorBorder('red');
              return;
            };
            values.tags = tags;
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
                  onKeyPress={(e) => e.nativeEvent.key == ' ' ? setTags(values.tags.split(" ")) : false}
                  onChangeText={handleChange('tags')}
                  onBlur={handleBlur('tags')}
                  value={values.tags}
                />
              </View>

              <Button onPress={handleSubmit} title="Submit" />

            </View>
          )}
        </Formik>
      </View>
    </View>
  )
}

export default Formulario;

const styles = StyleSheet.create({
  container: {

  },
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
})
