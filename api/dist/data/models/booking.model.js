"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
function defineBookingModel(sequelize) {
    class BookingModel extends sequelize_1.Model {
        static initModel(sequelize) {
            this.init({
                booking_id: {
                    type: sequelize_1.DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                file_id: {
                    type: sequelize_1.DataTypes.INTEGER,
                    allowNull: false
                },
                user_id: {
                    type: sequelize_1.DataTypes.INTEGER,
                    allowNull: false
                },
                check_in_date: {
                    type: sequelize_1.DataTypes.DATE,
                    allowNull: false
                },
                check_out_date: {
                    type: sequelize_1.DataTypes.DATE,
                    allowNull: false
                },
                exp_date: {
                    type: sequelize_1.DataTypes.DATE,
                    allowNull: false
                }
            }, {
                sequelize,
                tableName: "bookings",
                timestamps: false
            });
        }
        static associate(models) {
            BookingModel.belongsTo(models.UserModel, { foreignKey: 'user_id', as: 'user' });
            BookingModel.belongsTo(models.FileModel, { foreignKey: 'file_id', as: 'file' });
        }
    }
    BookingModel.initModel(sequelize);
    return BookingModel;
}
exports.default = defineBookingModel;
