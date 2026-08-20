import React, {useState} from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { bookTicket } from '../api/endpoints';
import { saveTicketOffline } from '../database/sqlite';
import { generatePNR } from '../utils/validators';
export default function BookingScreen({route, navigation}){
  const {train, origin, destination, date} = route.params;
  const [name,setName]=useState(''); const [loading,setLoading]=useState(false);
  const handleBook = async () => {
    if(!name) return Alert.alert('Enter passenger name');
    setLoading(true);
    const payload = {train_id:train.id, travel_date:date, passenger_name:name, origin, destination};
    try{
      let ticket;
      try{
        ticket = await bookTicket(payload);
      }catch(e){
        // offline mock for demo
        ticket = {id: Date.now().toString(), user_id:'me', train_id:train.id, seat_id:'S1-42', booking_date:new Date().toISOString(), travel_date:date, status:'CONFIRMED', pnr:generatePNR(), origin, destination, passenger_name:name};
      }
      await saveTicketOffline(ticket);
      Alert.alert('Booked!', `PNR: ${ticket.pnr}`);
      navigation.navigate('Main');
    }catch(err){ Alert.alert('Error', err.message); } finally{ setLoading(false); }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking: {train.name}</Text>
      <Text style={styles.meta}>{origin} → {destination} | {date}</Text>
      <InputField label="Passenger Name" value={name} onChangeText={setName} placeholder="Full name" testID="passengerNameInput" />
      <Button title="Confirm Booking" onPress={handleBook} loading={loading} testID="confirmBookingButton" />
    </View>
  );
}
const styles = StyleSheet.create({container:{flex:1, padding:16, backgroundColor:'#F8FAFC'}, title:{fontSize:18, fontWeight:'700'}, meta:{color:'#64748B', marginVertical:8}});
