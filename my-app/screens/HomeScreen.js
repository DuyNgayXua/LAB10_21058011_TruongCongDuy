// Screen01.js
import React from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';

const Screen01 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../DATA/Container 17.png')}
        style={styles.image} />

      <Text style={styles.title}>Boost Productivity</Text>
      <Text style={styles.subtitle}>Simplify tasks, boost productivity</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Screen03')}
      >
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button2}
        onPress={() => navigation.navigate('Screen02')}
      >
        <Text style={styles.buttonText2}>Login</Text>
      </TouchableOpacity>

    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 350,
    height: 370,
    borderRadius: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    opacity: 0.7,
    marginLeft: -110,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10,
    marginLeft: -80,
    fontWeight: 600,
  },
  button: {
    width: 300,
    height: 60,
    backgroundColor: '#00eeff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 10,
  },
  button2: {
    width: 300,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 10,
    backgroundColor: '#dbd3d3',

  },
  buttonText: {
    
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonText2: {
    
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Screen01;