import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable, Alert } from 'react-native';
import { Formik } from 'formik';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';

const Formulario = ({keyItem }) => {

  const [tags, setTags] = useState();
  const [tag, setTag] = useState('');
  const [ nota, setNota ] = useState({});
  
  const navigation = useNavigation(); 

  const enviarNota = (nota) => {
    let nome = keyItem;
    let nomeAtual = nota.nome.split(' ').join('');
    if(nome != nomeAtual){
      AsyncStorage.removeItem(
        keyItem /* faz update de valores  se ja existir substitui se não existir adiciona*/,
        (err, result) => {
          if (err) console.log(err);
          else console.log(keyItem, ' removido com sucesso!');
        }
      )

      AsyncStorage.setItem(
        nomeAtual /* coloca item */,
        JSON.stringify(nota),
        (err, result) => {
          if (err) console.log(err);
          else return console.log("adicionado com sucesso", nota);
        }
      );
    }else{
      AsyncStorage.mergeItem(
        nome, JSON.stringify(nota),
        (err, result) => {
          if (err) console.log(err);
          else return console.log("Editado com sucesso", nota);
        }
      );
    }
    
    Alert.alert(
      '',
      'Nota editada com sucesso',
      [ 
        {text: 'Voltar para notas', onPress: navigation.navigate('HomePage', { nota: nomeAtual })},  
      ]  
    )
  }
  
  const pegarNota = () => {
    AsyncStorage.getItem(
      keyItem,
      (err, result) => {
        if (err) console.log(err);
        setNota(JSON.parse(`${result}`));
      }
    );
  }

  useEffect(()=>{
    pegarNota();
  }, [])

  return (
    <View>
      <View style={{ padding: 10, backgroundColor: '#F8F8F8' }}>

        <Formik
          initialValues={{ nome: nota.nome, descricao: nota.descricao, prioridade: nota.prioridade, data: nota.data , cor: nota.cor, tags: '' }}

          onSubmit={values => {
            if (values.nome == '') return;
            values.tags = tags;
            values.nome = nota.nome;
            values.data = `${new Date().toLocaleString()}`;
            enviarNota(values);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
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
                    value: nota.prioridade,
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
