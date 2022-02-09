import React from "react";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";

const data = {
  notas: [
    {
      name: 'casa',
      descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at metus nulla. Quisque eleifend fermentum ipsum, et tincidunt purus vestibulum sit amet.Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at metus nulla. Quisque eleifend fermentum ipsum, et tincidunt purus vestibulum sit amet. ',
      prioridade: 'Baixa',
      backgroundColor: 'red'
    },
    {
      name: 'Escola',
      descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.  ',
      prioridade: 'Alta',
      backgroundColor: 'green'
    },
    {
      name: 'Escritorio',
      descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at metus nulla. Quisque eleifend fermentum ipsum, et tincidunt purus vestibulum sit amet.Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at metus nulla. Quisque eleifend fermentum ipsum, et tincidunt purus vestibulum sit amet. ',
      prioridade: 'Media',
      backgroundColor: 'blue'
    },
    {
      name: 'despesas',
      descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at metus nulla. Quisque eleifend fermentum ipsum, et tincidunt purus vestibulum sit amet.Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at metus nulla. Quisque eleifend fermentum ipsum, et tincidunt purus vestibulum sit amet. ',
      prioridade: 'Alta',
      backgroundColor: 'green'
    }
  ]
}

const Notas = () => {

  const nota = ({ item }) => (
    <View style={{
      width: 180,
      borderWidth: 1,
      borderColor: item.backgroundColor,
      backgroundColor: item.backgroundColor,
      padding: 14,
      margin: 4,
      boxSizing: 'border-box',
      alignItems: 'center',
      flex: 1,

    }}>
      <Pressable
        onPress={() => console.log(item.name)}
      >
        <Text style={styles.sectionTitle}> {item.name} </Text>
        <Text style={styles.sectionDescription}> {item.descricao} </Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.sectionContainer}>
      <FlatList
        numColumns={2}
        data={data.notas}
        renderItem={nota}
      />
    </View>
  )
};

export default Notas;

const styles = StyleSheet.create({
  sectionContainer: {
    position: 'relative',
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 5,
    overflowY: 'scroll',
  },
  sectionNota: {

  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'justify'
  },
  highlight: {
    fontWeight: '700',
  },
});
