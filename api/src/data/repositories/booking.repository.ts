import { Op, Transaction } from "sequelize";
import db from "../database/db.js";
import { IBooking, IBookingRepository } from "../../interfaces/business_interfaces/booking.interfaces.js";

const BookingModel = db.BookingModel;

class BookingRepository implements IBookingRepository {


 async getAllExpiredBookings(): Promise<IBooking[]> {
    const bookedFileEntities = await BookingModel.findAll({
      where: {
        check_out_date: null,
        exp_date: { [Op.lt]: new Date() },
      },
    });

    return bookedFileEntities;
  }


  async getBookings(file_id: number): Promise<IBooking[]> {
    const bookedFileEntity = await BookingModel.findAll({ where: { file_id } });

    return bookedFileEntity;
  }

  async getBookingsByUserId(user_id: number): Promise<IBooking[]> {
    const bookedFileEntity = await BookingModel.findAll({ where: { user_id } });

    return bookedFileEntity;
  }
  

  async updateBooking(
    booking_id: number,
    data: object,
    transaction?: Transaction
  ): Promise<void> {
    await BookingModel.update(
      data,
      {
        where: {
          booking_id,
        },
      },
      { transaction }
    );
  }

  async getActiveBooking(user_id: number, file_id: number): Promise<IBooking> {
    const bookedFileEntity = await BookingModel.findOne({
      where: { user_id, file_id, check_out_date: null },
    });

    return bookedFileEntity;
  }


  async createBooking(
    file_id: number,
    user_id: number,
    check_in_date: Date,
    exp_date: Date,
    transaction?: Transaction
  ): Promise<object> {
    const bookedFile = await BookingModel.create(
      { file_id, user_id, check_in_date, exp_date, check_out_date: null },
      { transaction }
    );

    return bookedFile;
  }

}

export default BookingRepository;
