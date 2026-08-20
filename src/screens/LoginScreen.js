import React, {useState, useContext} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { AuthContext } from '../context/AuthContext';
import { isValidEmail, isValidPassword } from '../utils/validators';
export default function LoginScreen({navigation}){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [err,setErr]=useState('');
  const [loading,setLoading]=useState(false);
  const {login}=useContext(AuthContext);
  const handleLogin = async () => {
    if(!isValidEmail(email)) return setErr('Invalid email');
    if(!isValidPassword(password)) return setErr('Password min 6 chars');
    setLoading(true); setErr('');
    try{ await login(email,password);} catch(e){ setErr(e.message);} finally{ setLoading(false);}
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Railway Login</Text>
      <InputField label="Email" value={email} onChangeText={setEmail} placeholder="you@example.com" autoCapitalize="none" testID="emailInput" />
      <InputField label="Password" value={password} onChangeText={setPassword} secureTextEntry placeholder="******" testID="passwordInput" />
      {err? <Text style={styles.err}>{err}</Text>:null}
      <Button title="Login" onPress={handleLogin} loading={loading} testID="loginButton" />
      <Button title="Create Account" variant="secondary" onPress={()=>navigation.navigate('Register')} />
    </View>
  );
}
const styles = StyleSheet.create({container:{flex:1, padding:20, justifyContent:'center', backgroundColor:'#F8FAFC'}, title:{fontSize:28, fontWeight:'800', marginBottom:20, textAlign:'center'}, err:{color:'#EF4444', marginVertical:8, textAlign:'center'}});
