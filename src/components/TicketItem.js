import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Card from './Card';
export default function TicketItem({ ticket, onPress }){
  return (
    <TouchableOpacity onPress={onPress}>
      <Card>
        <View style={styles.row}><Text style={styles.pnr}>PNR: {ticket.pnr}</Text><Text style={[styles.status, ticket.status==='CANCELLED'&&{color:'#EF4444'}]}>{ticket.status}</Text></View>
        <Text style={styles.route}>{ticket.origin} → {ticket.destination}</Text>
        <Text style={styles.meta}>Train: {ticket.train_id} | Seat: {ticket.seat_id}</Text>
        <Text style={styles.meta}>Travel: {ticket.travel_date} | Booked: {ticket.booking_date?.slice(0,10)}</Text>
      </Card>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  row:{flexDirection:'row', justifyContent:'space-between'},
  pnr:{fontWeight:'700', color:'#0F172A'},
  status:{fontWeight:'600', color:'#16A34A'},
  route:{fontSize:16, fontWeight:'600', marginTop:6},
  meta:{fontSize:13, color:'#64748B', marginTop:2}
});
