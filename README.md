# Railway Ticket Booking App
React Native CLI + JavaScript

## Features
- Email/password auth (POST /login, POST /register)
- Search routes, view trains
- Book, view, cancel, download PDF tickets
- SQLite offline cache for recent searches & tickets (react-native-sqlite-storage)

## Run
npx react-native init RailwayApp --version 0.73.6
Copy src/ over
npm install
cd ios && pod install
npx react-native run-android / run-ios

## Testing
npm test (Jest)
detox test -c ios.sim.debug (E2E)

## API required
See blueprint for endpoints: GET /routes, POST /book, GET /tickets, POST /login, POST /register, etc.

Before using login or registration, set `BASE_URL` in `src/api/client.js` to a running backend. For a backend running on your development machine, use `http://10.0.2.2:3000` on the Android emulator, `http://localhost:3000` on the iOS simulator, or your computer's LAN IP address on a physical device. The backend must expose `POST /register` and return a JSON object containing `token`.
# RailwayApp
