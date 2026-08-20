import React, {useState, useContext} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { AuthContext } from '../context/AuthContext';
import { isValidEmail, isValidPassword } from '../utils/validators';
export default function RegisterScreen({navigation}){
  const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [err,setErr]=useState(''); const [loading,setLoading]=useState(false);
  const {register}=useContext(AuthContext);
  const handle = async () => {
    if(!isValidEmail(email)) return setErr('Invalid email');
    if(!isValidPassword(password)) return setErr('Password min 6 chars');
    setLoading(true); try{ await register(email,password);} catch(e){ setErr(e.message);} finally{ setLoading(false);}
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <InputField label="Email" value={email} onChangeText={setEmail} placeholder="you@example.com" />
      <InputField label="Password" value={password} onChangeText={setPassword} secureTextEntry placeholder="******" />
      {err? <Text style={styles.err}>{err}</Text>:null}
      <Button title="Register" onPress={handle} loading={loading} />
      <Button title="Back to Login" variant="secondary" onPress={()=>navigation.goBack()} />
    </View>
  );
}
const styles = StyleSheet.create({container:{flex:1, padding:20, justifyContent:'center', backgroundColor:'#F8FAFC'}, title:{fontSize:24, fontWeight:'700', marginBottom:20, textAlign:'center'}, err:{color:'#EF4444', textAlign:'center'}});
