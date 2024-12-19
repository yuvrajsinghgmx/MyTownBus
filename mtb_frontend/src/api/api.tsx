import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';
const api2 = "https://mytownbus.up.railway.app/api";
const api = "http://192.168.1.97:8000/api"; 
const api3 = "http://10.21.120.66:8000/api"
const Global = {
    api: api,
}

export default Global;