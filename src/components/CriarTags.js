import react, { useState } from "react";
import { View, Text, Button } from "react-native";

import adcionarTarefas from '../pages/CreateNotaPage';

const CriarTags = () => {
  const [tags, setTags] = useState([]);

  const handleSubmit = (values) => {
    adcionarTarefas(values);
  }

  return (<View>
    <Text>Ola</Text>
    <TextInput
      placeholder='Tags'
      onChangeText={setTags}
      value={tags}
    />
    <Button onPress={handleSubmit} title="Submit" />  
  </View>);
}

export default CriarTags;
