import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import { Formik } from 'formik';

import Cabecalho from "../components/cabecalho";

const CreateNotaPage = ({ navigation }) => {

  const [teste, setTeste] = useState({});

  const adicionarTarefa = (value)=>{
    setTeste(value);
  } 

  return (
    <View>
      <Cabecalho
        title="Criar Nota"
        botoes={[{ para: "HomePage", simbolo: "x" }]}
        navigation={navigation}
      />

      <View  style={{padding: 10, backgroundColor: '#F8F8F8'}}>
        <Formik
          initialValues={{ nome: '', descricao: '', prioridade: '', data: `${new Date().toLocaleString()}`, cor: '', tags: [] }}
          onSubmit={values => console.log(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>
              <View >
                <Text style={styles.textLabel}> Nome (Obrigatório) </Text>
                <TextInput
                  style={styles.inputLabel}
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
                    value: '',
                  }}
                  selectedValue={values.cor}
                  onValueChange={handleChange('cor')}
                  onBlur={handleBlur("cor")}
                  
                  items={[
                    { label: 'Branco', value: '#F8F8F8'},
                    { label: 'Rosa', value: '#FFF3F3' },
                    { label: 'Azul', value: '#EAF1FF' },
                    { label: 'Verde-água', value: '#E4FFEF' },
                  ]}
                />
              </View>
              <Button onPress={handleSubmit} title="Submit" />
              
            </View>
          )}
        </Formik>

        
      </View>
      
    </View>
  )
};

export default CreateNotaPage;

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
