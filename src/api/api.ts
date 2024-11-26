import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = "http://192.168.1.75:8000"; 

export const fetchBuses = async () => {
    const token = await AsyncStorage.getItem('authToken');
    const response = await axios.get(`${API_BASE_URL}/api/buses/`, {
        headers: { Authorization: `Token ${token}` },
    });
    return response.data;
};

export const fetchRoutes = async () => {
    const token = await AsyncStorage.getItem('authToken');
    const response = await axios.get(`${API_BASE_URL}/api/routes/`, {
        headers: { Authorization: `Token ${token}` },
    });
    return response.data;
};

export const createBooking = async (data: any) => {
    const token = await AsyncStorage.getItem('authToken');
    const response = await axios.post(`${API_BASE_URL}/api/bookings/`, data, {
        headers: { Authorization: `Token ${token}` },
    });
    return response.data;
};
