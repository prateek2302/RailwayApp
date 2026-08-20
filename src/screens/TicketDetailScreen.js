import React, {useState} from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Card from '../components/Card';
import Button from '../components/Button';
import { cancelTicket } from '../api/endpoints';
import { deleteTicketOffline } from '../database/sqlite';
import { downloadTicketPDF } from '../utils/pdfGenerator';
export default function TicketDetailScreen({route, navigation}){
  const {ticket} = route.params;
  const [loading,setLoading]=useState(false);
  const handleCancel = async () => {
    setLoading(true);
    try{ await cancelTicket(ticket.id).catch(()=>{}); await deleteTicketOffline(ticket.id); Alert.alert('Cancelled'); navigation.goBack(); } catch(e){ Alert.alert('Error', e.message);} finally{ setLoading(false);}
  };
  const handleDownload = async () => {
    try{ const path = await downloadTicketPDF(ticket.id, ticket.pnr); Alert.alert('Downloaded', path); } catch(e){ Alert.alert('PDF Error', 'Ensure backend GET /tickets/:id/pdf is implemented'); }
  };
  return (
    <View style={styles.container}>
      <Card>
        <Text style={styles.pnr}>PNR: {ticket.pnr}</Text>
        <Text style={styles.route}>{ticket.origin} → {ticket.destination}</Text>
        <Text>Passenger: {ticket.passenger_name}</Text>
        <Text>Train: {ticket.train_id} Seat: {ticket.seat_id}</Text>
        <Text>Travel: {ticket.travel_date} Status: {ticket.status}</Text>
      </Card>
      <Button title="Download PDF" onPress={handleDownload} testID="downloadPdfButton" />
      <Button title="Cancel Ticket" variant="secondary" onPress={handleCancel} loading={loading} testID="cancelButton" />
    </View>
  );
}
const styles = StyleSheet.create({container:{flex:1, padding:16, backgroundColor:'#F8FAFC'}, pnr:{fontWeight:'800', fontSize:18}, route:{fontSize:16, fontWeight:'600', marginVertical:6}});
