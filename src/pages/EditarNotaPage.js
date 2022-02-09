import react from 'react';
import { View } from 'react-native';

const EditarNotasPage = ({ navigation }) => {

  return ( 
    <View> { navigation.params.nota.name } </View>
  )
}

export default EditarNotasPage;
