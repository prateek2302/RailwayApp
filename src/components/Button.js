import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
export default function Button({ title, onPress, loading, disabled, variant='primary', style }){
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled||loading} style={[styles.base, variant==='primary'?styles.primary:styles.secondary, disabled&&styles.disabled, style]}>
      {loading? <ActivityIndicator color="#fff"/> : <Text style={styles.text}>{title}</Text>}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  base:{padding:14, borderRadius:8, alignItems:'center', marginVertical:6},
  primary:{backgroundColor:'#0F172A'},
  secondary:{backgroundColor:'#E2E8F0'},
  disabled:{opacity:0.5},
  text:{color:'#fff', fontWeight:'600', fontSize:16}
});
