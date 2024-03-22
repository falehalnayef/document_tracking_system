interface IBookingAttributes{
    booking_id: Number;
    file_id: Number;
    user_id: Number;
    check_in_date: Date;
    check_out_date: Date;
    exp_date: Date;
  }


    interface IBooking extends IBookingAttributes{

    
    }






export {IBookingAttributes, IBooking}


