import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://api.railway.example.com'; // Replace with your backend

export const apiClient = async (endpoint, {method='GET', body, auth=true}={}) => {
  const headers = {'Content-Type':'application/json'};
  if(auth){
    const token = await AsyncStorage.getItem('token');
    if(token) headers['Authorization'] = `Bearer ${token}`;
  }
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if(!res.ok) throw new Error(data.message || 'API Error');
  return data;
};
