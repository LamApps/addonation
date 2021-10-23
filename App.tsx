import React from 'react';
import {Router} from './src/routes/Router';
import {AuthProvider} from './src/contexts/Auth';
import { StatusBar } from 'expo-status-bar';

const App = () => {
  return (
    <AuthProvider>
      <Router />
      <StatusBar style="dark" />
    </AuthProvider>
  );
};

export default App;