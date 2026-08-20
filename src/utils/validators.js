export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const isValidPassword = (pwd) => typeof pwd === 'string' && pwd.length >= 6;
export const isValidPNR = (pnr) => /^[A-Z0-9]{6,10}$/.test(pnr);
export const formatDate = (iso) => iso ? iso.slice(0,10) : '';
export const generatePNR = () => Math.random().toString(36).substring(2,8).toUpperCase();
