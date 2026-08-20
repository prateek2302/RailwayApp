import React from 'react';
import { View, StyleSheet } from 'react-native';
export default function Card({ children, style }){
  return <View style={[styles.card, style]}>{children}</View>;
}
const styles = StyleSheet.create({
  card:{backgroundColor:'#fff', borderRadius:12, padding:16, shadowColor:'#000', shadowOpacity:0.06, shadowRadius:8, elevation:2, marginVertical:8, borderWidth:1, borderColor:'#F1F5F9'}
});
