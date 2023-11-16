import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

function CounterScreen({ navigation }) {
  const [count, setCount] = useState(0);

  const fnSaveValue = async () => {
    AsyncStorage.setItem('@data', (count + 1).toString());
  };
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 300, }}>
      <View style={styles.container}>
        <Text style={styles.textDisp}>COUNTER</Text>
        <View style={styles.buttons}>
          <Button
          title='Increment'
          onPress={() => {setCount(count + 1); fnSaveValue()}}
          />
        </View>
        <Text style={styles.textDisp}>Count: {count}</Text>
      </View>
      <Button
        title="Go to display screen"
        onPress={() => navigation.navigate('DisplayCounterScreen')}
      />
    </View>
  );
}


function DisplayCounterScreen({ navigation }) {
  const [getValue, setGetValue] = useState('')

  const fnGetValue = async () => {
    const value = await AsyncStorage.getItem('@data')
    AsyncStorage.getItem('@data').then(
      (value) => setGetValue(value)
    );
  };

  useEffect(() => {
    fnGetValue();
}, [])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.textDisp}>The count is: {getValue}</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}


const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CounterScreen" component={CounterScreen} />
      <Stack.Screen name="DisplayCounterScreen" component={DisplayCounterScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  buttons: {
    margin: 5,
    padding: 5,
  },
  textDisp: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
