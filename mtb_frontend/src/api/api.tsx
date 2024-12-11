import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';

const api = "http://10.21.82.227:8000/api"; 
const Global = {
    api: api,
}

export default Global;