import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveDataToAsyncStorage = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error('Failed to save data to AsyncStorage:', e);
  }
};

export const getDataFromAsyncStorage = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.error('Failed to retrieve data from AsyncStorage:', e);
  }
};
