import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable } from 'react-native';
import { Formik } from 'formik';
import RNPickerSelect from 'react-native-picker-select';

const Tags = ({ navigaton }) => {
  const [ tag, setTag ] = useState('');
  const [ tags, setTags ] = useState([]);

  return (
    <View>
      <Text styles={styles.textLabel}> Tags </Text>
      <TextInput
        style={styles.inputLabel}
        onKeyPress={(e)=> e.nativeEvent.key == ' ' ? setTags(tag.split(" ")) : false }
        onChangeText={setTag}
        value={tag}
      />
    </View>
  )

}

export default Tags;

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