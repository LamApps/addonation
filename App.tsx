import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, SafeAreaView } from 'react-native';
import {Router} from './src/routes/Router';
import {AuthProvider} from './src/contexts/Auth';
import { StatusBar } from 'expo-status-bar';

const App = () => {
  return (
    <AuthProvider>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <SafeAreaView style={styles.container}>
            <Router />
        </SafeAreaView>
      </KeyboardAvoidingView>
      <StatusBar style="auto" />
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