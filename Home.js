import React from 'react';
import { SafeAreaView, Text } from 'react-native';

const Home = () => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: 'chartreuse',
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Hello</Text>
    </SafeAreaView>
  );
};

export default Home;
