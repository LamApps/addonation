import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, SafeAreaView } from 'react-native';
import {Router} from './src/routes/Router';
import {AuthProvider} from './src/contexts/Auth';
import { StatusBar } from 'expo-status-bar';

const App = () => {
  return (
    <AuthProvider>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
          <Router />
        </KeyboardAvoidingView>
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