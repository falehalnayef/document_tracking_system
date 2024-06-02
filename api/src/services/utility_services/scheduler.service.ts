import schedule from "node-schedule";
import FileRepository from "../../data/repositories/file.repository";
import BookingRepository from "../../data/repositories/booking.repository";

import db from "../../data/database/db";
import { Transaction } from "sequelize";

class Scheduler {
  fileRepository: FileRepository;
  bookingRepository: BookingRepository;

  constructor() {
    this.fileRepository = new FileRepository();
    this.bookingRepository = new BookingRepository();
  }

  async run() {
    schedule.scheduleJob("0 0 * * *", async () => {
      try {
        await this.checkOutJop();
      } catch (error) {
        console.log("can`t connect to the DB");
      }
    });
  }

  async checkOutJop() {
    try {
      const bookings = await this.bookingRepository.getAllExpiredBookings();

      for (const booking of bookings) {
        await db.sequelize.transaction(async (t: Transaction) => {
          await this.fileRepository.updateBooking(
            booking.booking_id,
            { check_out_date: new Date() },
            t
          );
          await this.fileRepository.update(
            booking.file_id,
            { checked: false },
            t
          );
          console.log(`file ${booking.file_id} has checked out`);
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export default Scheduler;
