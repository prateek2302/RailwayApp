// Data Models - JS classes mirroring SQLite schema
export class Route {
  constructor({id, origin, destination, distance}) {
    this.id=id; this.origin=origin; this.destination=destination; this.distance=distance;
  }
}
export class Train {
  constructor({id, name, route_id, departure_time, arrival_time, total_seats}) {
    this.id=id; this.name=name; this.route_id=route_id; this.departure_time=departure_time; this.arrival_time=arrival_time; this.total_seats=total_seats;
  }
}
export class Seat {
  constructor({id, train_id, seat_number, class: cls, is_booked}) {
    this.id=id; this.train_id=train_id; this.seat_number=seat_number; this.class=cls; this.is_booked=is_booked;
  }
}
export class Ticket {
  constructor({id, user_id, train_id, seat_id, booking_date, travel_date, status, pnr, pdf_path, origin, destination, passenger_name}) {
    this.id=id; this.user_id=user_id; this.train_id=train_id; this.seat_id=seat_id; this.booking_date=booking_date; this.travel_date=travel_date; this.status=status; this.pnr=pnr; this.pdf_path=pdf_path; this.origin=origin; this.destination=destination; this.passenger_name=passenger_name;
  }
}
