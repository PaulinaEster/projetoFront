import React, { useEffect, useState } from "react";
import { View, Pressable, Text, StyleSheet, Alert, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Cabecalho from "../components/cabecalho";
import ListNotas from "../components/ListNotas";

const HomePage = ({route, navigation }) => {
  const buttonsCabecalho = {
    botoes: [
      {
        para: "CriarNota",
        simbolo: "+"
      },
      {
        para: "pesquisar",
        simbolo: "lupa"
      }
    ]
  };

  const [notas, setNotas] = useState({});

  useEffect(() => {
    AsyncStorage.getAllKeys(
      /* faz update de valores  se ja existir substitui se não existir adiciona*/
      (err, result) => {
        if (err) console.log(err);
        else setNotas(result);
      }
    )
  }, [notas]); 

  return (
    <View>
      <Cabecalho
        title="Notas"
        botoes={buttonsCabecalho.botoes}
        navigation={navigation}
      />
      <View>
        <ListNotas notas={notas} />
      </View>
      <View style={styles.buttonCreateNota}> 
        <Pressable
          onPress={() => navigation.navigate("CriarNota")}
        >
          <Text style={styles.text}>+</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  buttonCreateNota: {
    width: 40,
    height: 40,
    backgroundColor: "#0F62FE",
    zIndex: 10,
    position: 'absolute',
    bottom: -580,
    left: 300,
    justifyContent: 'center',
    alignItems: 'center', 
    flex: 1
  },
  text: {
    fontSize: 38,
    color: "#FFFFFF",

  }
});
