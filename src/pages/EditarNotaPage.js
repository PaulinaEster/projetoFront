import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import FormularioEditar from '../components/FormularioEditar';

const EditarNotasPage = ({ route }) => {

  const [nota, setNota] = useState({});
  let nome = route.params?.nome;

  useEffect(() => {
    AsyncStorage.getItem(
      nome ,
      (err, result) => {
        if (err) console.log(err);
        else setNota(JSON.parse(`${result}`));
      }
    )
  }, []);

  return (<ScrollView>
    
    <FormularioEditar keyItem={nome} />
  </ScrollView>)
}

export default EditarNotasPage;
