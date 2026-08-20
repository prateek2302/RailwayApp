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
# RailwayApp
