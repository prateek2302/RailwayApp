import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import { initDB } from './src/database/sqlite';
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    initDB().then(() => console.log('DB initialized')).catch(console.error);
  }, []);
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
