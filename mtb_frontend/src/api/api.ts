import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';

const API_BASE_URL = "http://192.168.1.75:8000"; 


const Global = {
    token: null,
    user: null,
  };

const saveToken = async (username:string,token: string) => {
    await Keychain.setGenericPassword(username, token);
};
const getToken = async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        console.log('Token retrieved:', credentials.password);
        return credentials.password;
      } else {
        console.log('No token found');
        return null;
      }
    } catch (error) {
      console.error('Error retrieving token:', error);
      return null;
    }
  };
  const deleteToken = async () => {
    try {
      await Keychain.resetGenericPassword();
      console.log('Token deleted successfully');
    } catch (error) {
      console.error('Error deleting token:', error);
    }
  };
    
  
  export default Global;
