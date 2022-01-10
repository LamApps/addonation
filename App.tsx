import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { Router } from './src/routes/Router';
import { AuthProvider } from './src/contexts/Auth';
import { StatusBar } from 'expo-status-bar';

const App = () => {
  return (
    <AuthProvider>
      <SafeAreaView style={styles.container}>
          <Router />
      </SafeAreaView>
      <StatusBar style="light" />
    </AuthProvider>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
export default App;