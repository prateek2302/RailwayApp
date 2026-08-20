import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login as loginApi, register as registerApi } from '../api/endpoints';
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    AsyncStorage.getItem('token').then(t => { setUserToken(t); setLoading(false); });
  }, []);
  const login = async (email, password) => {
    const data = await loginApi(email, password);
    await AsyncStorage.setItem('token', data.token);
    setUserToken(data.token);
    return data;
  };
  const register = async (email, password) => {
    const data = await registerApi(email, password);
    await AsyncStorage.setItem('token', data.token);
    setUserToken(data.token);
    return data;
  };
  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setUserToken(null);
  };
  return <AuthContext.Provider value={{ userToken, login, register, logout, loading }}>{children}</AuthContext.Provider>;
};
