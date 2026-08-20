import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(false);
SQLite.enablePromise(true);

let dbInstance = null;

export const getDB = async () => {
  if (dbInstance) return dbInstance;
  dbInstance = await SQLite.openDatabase({ name: 'railway.db', location: 'default' });
  return dbInstance;
};

export const initDB = async () => {
  const db = await getDB();
  await db.executeSql(`CREATE TABLE IF NOT EXISTS routes (
    id TEXT PRIMARY KEY, origin TEXT, destination TEXT, distance INTEGER
  );`);
  await db.executeSql(`CREATE TABLE IF NOT EXISTS trains (
    id TEXT PRIMARY KEY, name TEXT, route_id TEXT, departure_time TEXT, arrival_time TEXT, total_seats INTEGER
  );`);
  await db.executeSql(`CREATE TABLE IF NOT EXISTS seats (
    id TEXT PRIMARY KEY, train_id TEXT, seat_number TEXT, class TEXT, is_booked INTEGER
  );`);
  await db.executeSql(`CREATE TABLE IF NOT EXISTS tickets (
    id TEXT PRIMARY KEY, user_id TEXT, train_id TEXT, seat_id TEXT, booking_date TEXT, travel_date TEXT, status TEXT, pnr TEXT, pdf_path TEXT, origin TEXT, destination TEXT, passenger_name TEXT
  );`);
  await db.executeSql(`CREATE TABLE IF NOT EXISTS recent_searches (
    id INTEGER PRIMARY KEY AUTOINCREMENT, origin TEXT, destination TEXT, travel_date TEXT, searched_at TEXT
  );`);
};

export const saveRecentSearch = async (origin, destination, travelDate) => {
  const db = await getDB();
  await db.executeSql(`INSERT INTO recent_searches (origin, destination, travel_date, searched_at) VALUES (?,?,?,?)`, [origin, destination, travelDate, new Date().toISOString()]);
};

export const getRecentSearches = async () => {
  const db = await getDB();
  const [results] = await db.executeSql(`SELECT * FROM recent_searches ORDER BY searched_at DESC LIMIT 10`);
  const items = [];
  for (let i=0;i<results.rows.length;i++) items.push(results.rows.item(i));
  return items;
};

export const saveTicketOffline = async (ticket) => {
  const db = await getDB();
  await db.executeSql(`INSERT OR REPLACE INTO tickets (id,user_id,train_id,seat_id,booking_date,travel_date,status,pnr,pdf_path,origin,destination,passenger_name) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
  [ticket.id, ticket.user_id, ticket.train_id, ticket.seat_id, ticket.booking_date, ticket.travel_date, ticket.status, ticket.pnr, ticket.pdf_path||'', ticket.origin, ticket.destination, ticket.passenger_name]);
};

export const getOfflineTickets = async () => {
  const db = await getDB();
  const [results] = await db.executeSql(`SELECT * FROM tickets ORDER BY booking_date DESC`);
  const items=[]; for(let i=0;i<results.rows.length;i++) items.push(results.rows.item(i)); return items;
};

export const deleteTicketOffline = async (id) => {
  const db = await getDB();
  await db.executeSql(`DELETE FROM tickets WHERE id=?`, [id]);
};
