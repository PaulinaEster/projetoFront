
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';

import HomePage from './src/pages/HomePage';
import CreateNotaPage from './src/pages/CreateNotaPage';
import EditarNotasPage from './src/pages/EditarNotaPage';
import DetalhesNotaPage from './src/pages/DetalhesNotaPage';

const Stack = createNativeStackNavigator();

const Botao = ({ title, para, color, navigation, nome }) => (
  <Button 
    title={title}
    onPress={()=> navigation.navigate(`${para}`, nome == '' ? '' : { nome: nome })}
    color={color}
  />
)

const App = () => {

  const naoApagar = (navigation) => {
    navigation.navigate('HomePage');
  }

  const apagarNota = (nome, navigation) => {
    AsyncStorage.removeItem(
      nome,
      (err, result) => {
        if (err) console.log(err);
        else console.log(result);
      }
    )
    Alert.alert(
      '',
      'Nota apagada com sucesso!',
      [{ text: 'OK', onPress: navigation.navigate('HomePage') }]
    )
  }

  const aviso = (nome, navigation) => {
    Alert.alert(
      '',
      'Certeza que deseja apagar esta nota?',
      [
        { text: 'Sim', onPress: (()=>{apagarNota(nome, navigation)}) },
        { text: 'Não', onPress: (()=> naoApagar(navigation)) }
      ]
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={({ navigation }) => ({
            headerStyle: { backgroundColor: '#0F62FE' },
            headerTintColor: '#0F62FE',
            headerLeft: () => ( <Text style={styles.title}> Notas </Text> )
          })}
        />

        <Stack.Screen name="EditarNota"
          component={EditarNotasPage}
          options={({ route, navigation }) => ({
            headerStyle: { backgroundColor: '#0F62FE' },
            headerTintColor: '#0F62FE', 
            headerRight: () => (
              <View style={{ flexDirection: 'row' }}>
                <Botao navigation={navigation} title="Voltar" color="#fff" para='Detalhes'/>
                <Button onPress={() => aviso(route.params?.nome, navigation)} title="Apagar" color="#fff" />
              </View>
            ),
            headerLeft: () => ( <Text style={styles.title}> Editar Nota </Text> ),
          })} 
        />

        <Stack.Screen name="CriarNota" component={CreateNotaPage}
          options={({ navigation }) => ({
            headerStyle: { backgroundColor: '#0F62FE' },
            headerTintColor: '#0F62FE',
            headerLeft: () => ( <Text style={styles.title}> Criar Nota </Text> ),
            headerRight: () => ( <Botao  para='HomePage'  title="Voltar" color="#fff" navigation={navigation} /> )
          })}
        />

        <Stack.Screen name="Detalhes" component={DetalhesNotaPage}
          options={({ route, navigation }) => ({
            headerStyle: { backgroundColor: '#0F62FE' },
            headerTintColor: '#0F62FE',
            headerRight: () => (
              <View style={{ flexDirection: 'row' }}>
                <Botao title="Editar" color="#fff" para='EditarNota' navigation={navigation} nome={route.params?.nome}/>
                <Button onPress={() => aviso(route.params?.nome, navigation)} title="Apagar" color="#fff" />
              </View>
            ),
            headerLeft: () => ( <Botao title="Voltar" color="#fff" navigation={navigation} para='HomePage'/> ),
          })} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '15%',
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
    top: 15.18,
    bottom: 18.75,
  },
  title: {
    fontSize: 32,
    lineHeight: 32,
    fontWeight: '300',
    fontStyle: "normal",
    color: "#FFFFFF"
  },
  inputText:{
    color: '#fff',
    padding: 5,
    fontSize: 18,
    height: 28,
    width: 150,
    alignSelf: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    marginRight: 15,
  }
});

export default App;
