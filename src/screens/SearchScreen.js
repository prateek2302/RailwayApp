import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import InputField from '../components/InputField';
import DatePicker from '../components/DatePicker';
import Button from '../components/Button';
import Card from '../components/Card';
import { saveRecentSearch, getRecentSearches } from '../database/sqlite';
export default function SearchScreen({navigation}){
  const [origin,setOrigin]=useState('Jaipur');
  const [destination,setDestination]=useState('Delhi');
  const [date,setDate]=useState(new Date().toISOString().slice(0,10));
  const [recents,setRecents]=useState([]);
  useEffect(()=>{ getRecentSearches().then(setRecents); },[]);
  const search = async () => {
    await saveRecentSearch(origin,destination,date);
    navigation.navigate('Results', {origin,destination,date});
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book Train Ticket</Text>
      <InputField label="Origin" value={origin} onChangeText={setOrigin} placeholder="Origin station" testID="originInput" />
      <InputField label="Destination" value={destination} onChangeText={setDestination} placeholder="Destination station" testID="destinationInput" />
      <DatePicker label="Travel Date" value={date} onChange={setDate} />
      <Button title="Search Trains" onPress={search} testID="searchButton" />
      <Text style={styles.sub}>Recent Searches (SQLite cache)</Text>
      <FlatList data={recents} keyExtractor={i=>String(i.id)} renderItem={({item})=>(
        <Card><Text>{item.origin} → {item.destination} on {item.travel_date}</Text></Card>
      )} />
    </View>
  );
}
const styles = StyleSheet.create({container:{flex:1, padding:16, backgroundColor:'#F8FAFC'}, title:{fontSize:22, fontWeight:'700', marginBottom:10}, sub:{marginTop:16, fontWeight:'600'}});
