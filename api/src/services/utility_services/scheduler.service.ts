import schedule from "node-schedule";
import FileRepository from "../../data/repositories/file.repository";
import db from "../../data/database/db";
import { Transaction } from "sequelize";

class Scheduler {
  fileRepository: FileRepository;

  constructor() {
    this.fileRepository = new FileRepository();
  }

  async run() {
    schedule.scheduleJob("0 0 * * *", async () => {
      //'0 0 * * *'
      //*/10 * * * * *
      try {
        await this.checkOutJop();
      } catch (error) {
        console.log("can`t connect to the DB");
      }
    });
  }

  async checkOutJop() {
    try {
      const bookings = await this.fileRepository.getAllExpiredBookings();

      for (const booking of bookings){

        await db.sequelize.transaction(async (t: Transaction) => {
            await this.fileRepository.updateBooking(booking.booking_id, {check_out_date: new Date()}, t);
            await this.fileRepository.update(booking.file_id, {checked:false}, t);
            console.log(`file ${booking.file_id} has checked out`);
        });    

      }

    } catch (error) {
      console.error(error);
    }
  }
}

export default Scheduler;
