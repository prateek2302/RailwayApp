import React, {useEffect, useState} from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import Card from '../components/Card';
import Button from '../components/Button';
import { getRoutes } from '../api/endpoints';
// Mock fallback if API not ready
const MOCK_TRAINS = [{id:'12951', name:'Mumbai Rajdhani', departure_time:'16:35', arrival_time:'08:30', total_seats:120}];
export default function ResultsScreen({route, navigation}){
  const {origin,destination,date}=route.params;
  const [trains,setTrains]=useState([]);
  const [loading,setLoading]=useState(true);
  useEffect(()=>{
    (async()=>{
      try{
        const data = await getRoutes(origin,destination,date);
        setTrains(data.trains || MOCK_TRAINS);
      }catch(e){ setTrains(MOCK_TRAINS); } finally{ setLoading(false); }
    })();
  },[]);
  if(loading) return <View style={styles.center}><Text>Loading trains...</Text></View>;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{origin} → {destination} on {date}</Text>
      <FlatList data={trains} keyExtractor={i=>i.id} renderItem={({item})=>(
        <Card>
          <Text style={styles.name}>{item.name} ({item.id})</Text>
          <Text>{item.departure_time} → {item.arrival_time} | Seats: {item.total_seats}</Text>
          <Button title="Book Now" onPress={()=>navigation.navigate('Booking', {train:item, origin, destination, date})} />
        </Card>
      )} />
    </View>
  );
}
const styles = StyleSheet.create({container:{flex:1, padding:16, backgroundColor:'#F8FAFC'}, center:{flex:1, alignItems:'center', justifyContent:'center'}, title:{fontSize:16, fontWeight:'600', marginBottom:10}, name:{fontWeight:'700', fontSize:16}});
