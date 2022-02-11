import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import Cabecalho from '../components/cabecalho';
import FormularioEditar from '../components/FormularioEditar';

const EditarNotasPage = ({ route, navigation }) => {

  const [nota, setNota] = useState({});

  let nome = route.params?.nome;

  useEffect(() => {
    AsyncStorage.getItem(
      nome /* pega item pela chave de identificação */,
      (err, result) => {
        if (err) console.log(err);
        else setNota(JSON.parse(`${result}`));
      }
    )
  }, []);

  const apagarNota = () =>{
    AsyncStorage.removeItem(
      nome /* faz update de valores  se ja existir substitui se não existir adiciona*/,
      (err, result) => {
        if (err) console.log(err);
        else console.log(result);
      }
    )
  }

  const aviso = () => {

    Alert.alert(
      '',
      'Certeza que deseja apagar esta nota?',
      [
        {
          text: 'Sim', onPress: apagarNota
        },
        {
          text: 'Não', onPress: navigation.navigate('HomePage')
        },
      ]
    )

  }

  return (<View>
    <Cabecalho title='Editar Nota' />
    <Button title='Apagar' onPress={aviso} />
    <FormularioEditar nota={nota} keyItem={nome} />
  </View>)
}

export default EditarNotasPage;
