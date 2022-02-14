import AsyncStorage from "@react-native-async-storage/async-storage";

const adicionarItemAsync = async (keyItem, item) => {
  await AsyncStorage.setItem(
    keyItem,
    JSON.stringify(item),
    (err, result) => {
      if (err) console.log(err);
      else return console.log("adicionado com sucesso", item);
    }
  )
}

const pegarItemAsync = async (keyItem) => {
  const data = await AsyncStorage.getItem(
    keyItem /* pega item pela chave de identificação */,
    (err, result) => {
      if (err) console.log(err);
      else return result;
    }
  )
  if (data !== null) {
    console.log(data);
    return data;
  }
}

const atualizarItemAsync = async (keyItem, novoItem) => {
  await AsyncStorage.mergeItem(
    keyItem,
    JSON.stringify(novoItem),
    (err, result) => {
      if (err) console.log(err);
      else console.log('editado! ');
    }
  )
}

const removerItemAsync = async (keyItem) => {
  await AsyncStorage.removeItem(
    keyItem,
    (err, result) => {
      if (err) console.log(err);
      else console.log('removido');
    }
  )
}

const pegarTudoAsync = async () => {
  try {
    const data = await AsyncStorage.getAllKeys(
      /* faz update de valores  se ja existir substitui se não existir adiciona*/
      (err, result) => {
        if (err) console.log(err);
        else return result;
      }
    );
    if (data !== null) {
      console.log(data);
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

const removerTudoAsync = async () => {
  const data = await AsyncStorage.clear(
    (err, result) => {
      if (err) console.log(err);
      else return result;
    }
  );
  if (data !== null) {
    console.log(data);
    return data;
  }
}

export { adicionarItemAsync, pegarItemAsync, atualizarItemAsync, pegarTudoAsync, removerItemAsync, removerTudoAsync };
