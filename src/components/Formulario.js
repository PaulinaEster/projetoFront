import React, { useState } from 'react';
import { View } from 'react-native';
import Form from './Form';
const Formulario = ({ notas, navigation }) => {
  const [ nota, setNota ] = useState({
    nome: '',
    descricao: '',
    cor: '',
    prioridade: '',
    data: `${new Date().toLocaleString()}`,
    tags: '',
    checkList: [],
  })

  return(<View>
      <Form nota={nota} mensagem='Nota criada com Sucesso'  title='Criar Nota'/>
    </View>
  )
};

export default Formulario;
