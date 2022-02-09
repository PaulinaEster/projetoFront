import React from "react";
import { View, StyleSheet, Text, FlatList, Pressable } from "react-native";

const Cabecalho = ({ navigation, title, botoes }) => {
  const renderItem = ({ item }) => (
    <Pressable onPress={() => navigation.navigate(item.para)}>
      <Text style={styles.text}>{item.simbolo}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.containe}>
        <Text style={styles.title}> {title} </Text>
        <View style={styles.icons}>
          <FlatList 
            data={botoes}
            renderItem={renderItem}
            keyExtractor={(intem, index) => index.toString()}
          />
        </View>
      </View>
    </View>
  );
};

export default Cabecalho;

const styles = StyleSheet.create({
  container: {
    height: 112,
    position: "relative",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "#0F62FE"
  },
  containe: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: 4.44,
    right: 72.22,
    top: 65.18,
    bottom: 18.75,
  },

  title: {
    /* position: "absolute", */
    fontSize: 32,
    lineHeight: 32,
    fontWeight: '300',
    fontStyle: "normal",
    color: "#FFFFFF"
  /*fontFamily: "IBM Plex Sans",
    /* identical to box height, or 56%
    letterspacing: 0.16, */
  },
  icons: {
    left: -20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  }
});
