import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import Formulario from "../components/Formulario";

const CreateNotaPage = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <Formulario navigation={navigation} />
    </View>
  )
};

export default CreateNotaPage;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 10, 
    backgroundColor: '#F8F8F8' 
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
