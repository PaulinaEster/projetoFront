import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";

import Cabecalho from "../components/cabecalho";
import ListNotas from "../components/ListNotas";

const HomePage = ({ navigation }) => {
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

  return (
    <View>
      <Cabecalho
        title="Notas"
        botoes={buttonsCabecalho.botoes}
        navigation={navigation}
      />
      <ListNotas />
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
