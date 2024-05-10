interface IBookingAttributes{
    booking_id: number;
    file_id: number;
    user_id: number;
    check_in_date: Date;
    check_out_date: Date;
    exp_date: Date;
  }


    interface IBooking extends IBookingAttributes{
      display(): object;

    
    }






export {IBookingAttributes, IBooking}


