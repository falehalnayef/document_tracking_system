import { IBooking } from "../interfaces/business_interfaces/booking.interfaces.js";

class Booking implements IBooking {
  booking_id: number;
  file_id: number;
  user_id: number;
  check_in_date: Date;
  check_out_date: Date;
  exp_date: Date;

  constructor(booking: IBooking) {
    this.booking_id = booking.booking_id;
    this.user_id = booking.user_id;
    this.check_in_date = booking.check_in_date;
    this.check_out_date = booking.check_out_date;
    this.exp_date = booking.exp_date;
    this.file_id = booking.file_id;
  }

  display(): object {
    return this;
  }
}

export default Booking;
