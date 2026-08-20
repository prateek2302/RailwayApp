import React, {useState} from 'react';
import { View, Platform, TouchableOpacity, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import InputField from './InputField';
export default function DatePicker({ label, value, onChange }){
  const [show, setShow] = useState(false);
  return (
    <View>
      <TouchableOpacity onPress={()=>setShow(true)}>
        <InputField label={label} value={value} editable={false} placeholder="YYYY-MM-DD" pointerEvents="none" />
      </TouchableOpacity>
      {show && (
        <DateTimePicker value={value? new Date(value): new Date()} mode="date" display={Platform.OS==='ios'?'inline':'default'} onChange={(e, d)=>{
          if(Platform.OS==='android') setShow(false);
          if(d) onChange(d.toISOString().slice(0,10));
        }} />
      )}
    </View>
  );
}
