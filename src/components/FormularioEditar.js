import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { pegarItemAsync } from '../assets/asyncStorage.utils';
import Form from './Form';

const FormularioEditar = ({ route, navigation, keyItem }) =>{

  const [ nota, setNota ] = useState({});

  const pegarNota = async () => {
    let data = await pegarItemAsync(keyItem);
    setNota(JSON.parse(data));
   
    console.log(JSON.parse(data), 'ESTA NOTA');
  } 

  useEffect(()=>{
    pegarNota(nota);
  },[Nota])


  const Nota = () =>(<Form nota={nota} mensagem='Nota editada com sucesso!' title='Editar Nota'/>) 

  return (
    <View>
      <Nota/>
    </View>
  )

}

export default FormularioEditar;
