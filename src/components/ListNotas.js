import React, { useState, useEffect } from "react";
import { View, Pressable, Text, StyleSheet, FlatList, RefreshControl } from "react-native";

import SemNotas from "./SemNotas";
import Notas from "./Notas";

const ListNotas = ({notas, navigation }) => {

  const renderItem = ({item}) =>(<Notas keyItem={item} navigation={navigation} />)

  return (
    <View>
      {console.log(JSON.stringify(notas))}
      {notas == null || notas.length <= 0 ? <SemNotas /> :
        <View style={styles.sectionContainer}>
          <FlatList
            numColumns={2}
            data={notas}
            renderItem={renderItem}
            
          />
        </View>
      }

    </View>
  );
};

export default ListNotas;

const styles = StyleSheet.create({
  sectionContainer: {
    position: 'relative',
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 5,
    overflowY: 'scroll',
  }
});

