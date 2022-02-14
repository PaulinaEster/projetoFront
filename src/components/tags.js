import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const Tags = ({ tagsString, nome }) => {

  const [tags, setTags] = useState(`${tagsString}`.split(' '));
  const [numTags, setNumTags] = useState();
  /* 
 /*  let auxTag = ;
  console.log(auxTag)
  console.log(tagsString);
  setTags(auxTag);
 */
  const pegarTags= ()=> {
    console.log('a');
  }

  useEffect(()=>{
    pegarTags();
  },[])
 

  const renderItem = ({item}) => (<View style={styles.text}><Text>{item}</Text></View>);

  return (
    <View >
       <FlatList 
        data={tags}
        numColumns={10}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item}${index}`}
      />
    </View>
  )
}

export default Tags;

const styles = StyleSheet.create({
  text: {
    margin: 5,
    padding: 15,
    backgroundColor: '#E0E0E0',
    borderRightColor: 20,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 35
  }
});
