import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async <T>(
  value: T,
  storageKey: string
) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(storageKey, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const getData = async <T>(storageKey: string): Promise<T | undefined> => {
  try {
    const value = await AsyncStorage.getItem(storageKey);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (e) {
    console.log(e);
  }
};
