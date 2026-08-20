import React, {useState} from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
export default function InputField({ label, value, onChangeText, placeholder, secureTextEntry, error, ...props }){
  return (
    <View style={styles.wrap}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput style={[styles.input, error&&styles.inputError]} value={value} onChangeText={onChangeText} placeholder={placeholder} secureTextEntry={secureTextEntry} {...props} />
      {error ? <Text style={styles.err}>{error}</Text> : null}
    </View>
  );
}
const styles = StyleSheet.create({
  wrap:{marginVertical:8},
  label:{fontSize:14, fontWeight:'500', marginBottom:4, color:'#334155'},
  input:{borderWidth:1, borderColor:'#CBD5E1', borderRadius:8, padding:12, backgroundColor:'#fff'},
  inputError:{borderColor:'#EF4444'},
  err:{color:'#EF4444', fontSize:12, marginTop:4}
});
