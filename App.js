/*import { StatusBar } from 'expo-status-bar';*/
import {Text, View, Button, TextInput, ScrollView, Alert} from 'react-native';
import React from 'react';
import { useState } from 'react';
import StyleSheet from './Styles';
import {Picker} from '@react-native-picker/picker';
import RadioForm from 'react-native-simple-radio-button';

export default function App() {
  const [weight, setWeight] = useState(0);
  const [bottle, setBottle] = useState(0);
  const [time, setTime] = useState(0);
  const [gender, setGender] = useState('male');
  const [alcometor, setAlcometor] = useState(0);

  const bottles = Array();
  bottles.push({label: '0 bottle', value: 0});
  bottles.push({label: '1 bottle', value: 1});
  bottles.push({label: '2 bottle', value: 2});
  bottles.push({label: '3 bottle', value: 3});
  bottles.push({label: '4 bottle', value: 4});
  bottles.push({label: '5 bottle', value: 5});

  const times = Array();
  times.push({label: '0 hours', value: 0});
  times.push({label: '1 hours', value: 1});
  times.push({label: '2 hours', value: 2});
  times.push({label: '3 hours', value: 3});
  times.push({label: '4 hours', value: 4});
  times.push({label: '5 hours', value: 5});

  const genders = [
    {label: 'Male', value: 0},
    {label: 'Female', value: 1}
  ];

  function calculate() {
    let result = 0;

    if (weight === 0) {
      alert(
      "Please enter your weight."
    );
    }

    let litres = bottle * 0.33;
    let grams = litres * 8 * 4.5;
    let burning = weight / 10;
    let grams_left = grams - (burning * time);

    /* Gender */
    if (gender === 0) {
      result = grams_left / ( weight * 0.7 );
    }
    else {
      result = grams_left / ( weight * 0.6 );
    }

    /* No negative results */
    if (result <= 0) {
      result = 0;
      setAlcometor(result);
    } 
    else {
      setAlcometor(result);
    }
  }
  

  return (
    <ScrollView style={StyleSheet.container}>

      <View style={StyleSheet.field}>
        <Text style={StyleSheet.header}>Alcometor</Text>
      </View>

      <View style={StyleSheet.field}>
        <Text style={StyleSheet.label}>Weight</Text>
        <TextInput
          keyboardType='number-pad'
          style={StyleSheet.input}
          onChangeText={text => setWeight(text)}
          placeholder="in kilograms"
          keyboardType='numeric'></TextInput>
      </View>

      <View style={StyleSheet.field}>
        <Text style={StyleSheet.label}>Bottle</Text>
        <Picker style={StyleSheet.bottle}
          onValueChange={(itemValue) => setBottle(itemValue)}
          selectedValue={bottle}
          >
            {bottles.map((bottle, index) => (
              <Picker.Item key={index} label={bottle.label} value={bottle.value}/>
            ))
            }
        </Picker>
      </View>

      <View style={StyleSheet.field}>
        <Text style={StyleSheet.label}>Time</Text>
        <Picker style={StyleSheet.time}
          onValueChange={(itemValue) => setTime(itemValue)}
          selectedValue={time}
          >
            {times.map((time, index) => (
              <Picker.Item key={index} label={time.label} value={time.value}/>
            ))
            }
        </Picker>
      </View>

      <View style={StyleSheet.field}>
      <Text style={StyleSheet.label}>Gender</Text>
      <RadioForm
        style={StyleSheet.radio}
        buttonSize={5}
        radio_props={genders}
        initial={gender}
        onPress={(value) => {setGender(value)}}
      />
      <Text style={StyleSheet.result}>{alcometor.toFixed(2)}</Text>
      </View>

      <Button onPress={calculate} title='Calculate'></Button>
    </ScrollView>
  );
};

