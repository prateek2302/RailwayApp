import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://10.0.2.2:3000'; // Android emulator
export const apiClient = async (endpoint, {method='GET', body, auth=true}={}) => {
  if (BASE_URL.includes('.example.com')) {
    throw new Error('API URL is not configured. Set BASE_URL in src/api/client.js to your backend URL.');
  }

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
