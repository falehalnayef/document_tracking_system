import { Sequelize, DataTypes, Model } from 'sequelize';
import { IBookingAttributes } from '../../interfaces/business_interfaces/booking.interfaces.js';


export default function defineBookingModel(sequelize: Sequelize) {
  class BookingModel extends Model<IBookingAttributes> {

   
    static initModel(sequelize: Sequelize) {
      this.init(
        {
          booking_id: {
              type: DataTypes.INTEGER,
              autoIncrement: true,
              primaryKey: true
          },
          file_id: {
              type: DataTypes.INTEGER,
              allowNull: false
          },
          user_id: {
              type: DataTypes.INTEGER,
              allowNull: false
          },
          check_in_date: {
              type: DataTypes.DATE,
              allowNull: false
          },
          check_out_date: {
              type: DataTypes.DATE,
              allowNull: true
          },
          exp_date: {
              type: DataTypes.DATE,
              allowNull: false
          }
      },
      {
          sequelize,
          tableName: "bookings",
          timestamps: false 
      }
      );
    }

    public static associate(models: any): void {
        BookingModel.belongsTo(models.UserModel, { foreignKey: 'user_id', as: 'user', onDelete: "cascade" });
        BookingModel.belongsTo(models.FileModel, { foreignKey: 'file_id', as: 'file', onDelete: "cascade"});

      }
  }

  BookingModel.initModel(sequelize);

  return BookingModel;
}
