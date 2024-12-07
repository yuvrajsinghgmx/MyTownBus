import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';

const api = "http://192.168.1.75:8000/api"; 
const Global = {
    api: api,
}

export default Global;