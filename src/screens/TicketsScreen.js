import React, {useEffect, useState, useCallback} from 'react';
import { View, FlatList, StyleSheet, Text, RefreshControl } from 'react-native';
import TicketItem from '../components/TicketItem';
import { getTickets } from '../api/endpoints';
import { getOfflineTickets } from '../database/sqlite';
import { useFocusEffect } from '@react-navigation/native';
export default function TicketsScreen({navigation}){
  const [tickets,setTickets]=useState([]); const [refreshing,setRefreshing]=useState(false);
  const load = async () => {
    setRefreshing(true);
    try{
      const online = await getTickets().catch(()=>null);
      if(online?.tickets) setTickets(online.tickets);
      else { const offline = await getOfflineTickets(); setTickets(offline); }
    }finally{ setRefreshing(false); }
  };
  useFocusEffect(useCallback(()=>{ load(); },[]));
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Tickets (Cached Offline)</Text>
      <FlatList data={tickets} keyExtractor={i=>i.id} renderItem={({item})=>(
        <TicketItem ticket={item} onPress={()=>navigation.navigate('TicketDetail', {ticket:item})} />
      )} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={load} />} ListEmptyComponent={<Text style={styles.empty}>No tickets yet</Text>} />
    </View>
  );
}
const styles = StyleSheet.create({container:{flex:1, padding:12, backgroundColor:'#F8FAFC'}, title:{fontSize:18, fontWeight:'700', padding:8}, empty:{textAlign:'center', marginTop:40, color:'#94A3B8'}});
