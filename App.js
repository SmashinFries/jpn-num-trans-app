import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TopBar } from './components/Topbar/topbar';
import { Home } from './components/Home/home';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={{ flex:1 }}>
        <TopBar />
        <Home />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
