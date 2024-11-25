import axios from 'axios';

const API_BASE_URL = "http://192.168.1.75:8000"; 

export const fetchBuses = async () => {
    const response = await axios.get(`${API_BASE_URL}/api/buses/`);
    return response.data;
};

export const fetchRoutes = async () => {
    const response = await axios.get(`${API_BASE_URL}/api/routes/`);
    return response.data;
};

export const createBooking = async (data: any) => {
    const response = await axios.post(`${API_BASE_URL}/api/bookings/`, data);
    return response.data;
};
