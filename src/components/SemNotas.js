import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

import semNotasImage from "../assets/semNotasImage.png";

const SemNotas = () => (
  <View>
    <Image style={styles.stretch} source={semNotasImage} />
    <Text style={styles.texto1}> Não tem nenhuma nota aqui</Text>
    <Text style={styles.texto2}> Crie notas e você poderá vê-las aqui.</Text>
  </View>
);

export default SemNotas;

const styles = StyleSheet.create({
  stretch: {
    position: "absolute",
    width: 121,
    height: 170,
    left: 16,
    top: 88
  },
  texto1: {
    /* position: "absolute", */
    left: 4.44,
    right: 23.89,
    top: 308.75,
    bottom: 47.5,
    /* fontFamily: "IBM Plex Sans", */
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 20,
    lineHeight: 24,
    /* identical to box height, or 120% */
    letterSpacing: 0.16,
    /* fontFeatureSettings: 'pnum' on, 'lnum' on, */
    /* ui-05 */
    color: "#161616"
  },
  texto2: {
    /* position: "absolute", */
    left: 4.44,
    right: 4.44,
    top: 343.75,
    bottom: 43.75,
    /* fontFamily: "IBM Plex Sans", */
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 14,
    lineHeight: 16,
    /* identical to box height, or 114% */
    letterSpacing: 0.16,
    /* font-feature-settings: 'pnum' on, 'lnum' on, */
    /* state / disabled-03 */
    color: "#8D8D8D"
  }
});
