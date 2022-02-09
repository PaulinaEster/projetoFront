import React, { useState, useEffect } from "react";
import { View /* Pressable, Text, StyleSheet */ } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import SemNotas from "./SemNotas";
import Notas from "./Notas";

const ListNotas = ({ navigation }) => {
  const [notas, setNotas] = useState([]);

  useEffect(() => {
    AsyncStorage.getAllKeys(
      /* faz update de valores  se ja existir substitui se não existir adiciona*/
      (err, result) => {
        if (err) console.log(err);
        setNotas(result);
      }
    );
  }, []);

  return (
    <View>
      {console.log(notas)}
      {notas == null ? <SemNotas /> : <Notas notas={notas} />}
      
      </View>
  );
};

export default ListNotas;
