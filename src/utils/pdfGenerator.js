import RNFetchBlob from 'rn-fetch-blob';
import { Platform } from 'react-native';
// For actual backend: use GET /tickets/:id/pdf which returns PDF url
export const downloadTicketPDF = async (ticketId, pnr) => {
  // Mock local PDF generation placeholder - replace with API call
  const url = `https://api.railway.example.com/tickets/${ticketId}/pdf`;
  const { config, fs } = RNFetchBlob;
  const dir = fs.dirs.DocumentDir;
  const path = `${dir}/${pnr}.pdf`;
  const res = await config({ fileCache:true, path, addAndroidDownloads:{useDownloadManager:true, notification:true, title:`${pnr}.pdf`, mime:'application/pdf'} }).fetch('GET', url);
  return res.path();
};
export const getLocalPdfPath = (pnr) => {
  return `${RNFetchBlob.fs.dirs.DocumentDir}/${pnr}.pdf`;
};
