import React, { useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import FormularioEditar from '../components/FormularioEditar';

const EditarNotasPage = ({ route }) => {

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

  return (<View>
    <FormularioEditar nota={nota} keyItem={nome} />
  </View>)
}

export default EditarNotasPage;
