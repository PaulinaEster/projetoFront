import AsyncStorage from "@react-native-async-storage/async-storage";

const adicionarItem = async (keyItem, item) => {
  try {
    await AsyncStorage.setItem(
      keyItem /* coloca item */,
      JSON.stringify(item),
      (err, result) => {
        if (err) console.log(err);
        else return console.log("adicionado com sucesso", item);
      }
    );
  } catch (error) {
    console.log(error);
  }
}

const pegarItem = async (keyItem) => {
  try {
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
  } catch (error) {
    console.log(error);
  }
}

const atualizarItem = async (keyItemAtual, novoItem) => {
  try {
    const data = await AsyncStorage.mergeItem(
      keyItemAtual /* faz update de valores  se ja existir substitui se não existir adiciona*/,
      JSON.stringify(novoItem),
      (err, result) => {
        if (err) console.log(err);
        else return result;
      }
    )
    if (data !== null) {
      console.log(data);
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}

const removerItem = async (keyItem) => {
  try {
    await AsyncStorage.removeItem(
      keyItem /* faz update de valores  se ja existir substitui se não existir adiciona*/,
      (err, result) => {
        if (err) console.log(err);
        else console.log(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
}

const pegarTudo = async () => {
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

const removerTudo = async () => {
  try {
    const data = await AsyncStorage.clear(
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
}

export { adicionarItem, pegarItem, atualizarItem, pegarTudo, removerItem, removerTudo };
