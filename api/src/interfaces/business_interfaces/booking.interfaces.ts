import { Transaction } from "sequelize";

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

    interface IBookingRepository {

      createBooking(file_id: number, user_id: number, check_in_date: Date, exp_date: Date, transaction?: Transaction): Promise<object>;    
      getActiveBooking(user_id: number, file_id: number): Promise<IBooking>;
      updateBooking(booking_id: number, data: object, transaction?: Transaction): Promise<void>;
      getBookings(file_id: number): Promise<IBooking[]>;
      getBookingsByUserId(user_id: number): Promise<IBooking[]>;
      getAllExpiredBookings(): Promise<IBooking[]>;
  

    
    }



    
export {IBookingAttributes, IBooking, IBookingRepository}


