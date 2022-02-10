import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import Cabecalho from "../components/cabecalho";
import Formulario from "../components/Formulario";

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
      <View>
        <Formulario navigation={navigation} />
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
