import { apiClient } from './client';
// POST /register, POST /login, GET /routes, GET /trains, POST /book, GET /tickets etc.
export const register = (email,password) => apiClient('/register', {method:'POST', body:{email,password}, auth:false});
export const login = (email,password) => apiClient('/login', {method:'POST', body:{email,password}, auth:false});
export const getRoutes = (origin,destination,date) => apiClient(`/routes?origin=${origin}&destination=${destination}&date=${date}`);
export const getTrains = (routeId) => apiClient(`/trains/${routeId}`);
export const bookTicket = (payload) => apiClient('/book', {method:'POST', body:payload});
export const getTickets = () => apiClient('/tickets');
export const getTicketById = (id) => apiClient(`/tickets/${id}`);
export const cancelTicket = (id) => apiClient(`/tickets/${id}/cancel`, {method:'POST'});
export const downloadTicketPdf = (id) => apiClient(`/tickets/${id}/pdf`);
