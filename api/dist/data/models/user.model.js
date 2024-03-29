"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
function defineUserModel(sequelize) {
    class UserModel extends sequelize_1.Model {
        static initModel(sequelize) {
            this.init({
                user_id: {
                    type: sequelize_1.DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                user_name: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false
                },
                email: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                    unique: {
                        name: 'email',
                        msg: 'Email Must Be Unique.'
                    },
                    validate: {
                        isEmail: {
                            msg: 'Invalid Email Format.'
                        }
                    }
                },
                password: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false
                }
            }, {
                sequelize,
                tableName: "users",
                timestamps: false
            });
        }
        static associate(models) {
            UserModel.hasMany(models.GroupModel, { foreignKey: 'owner_id', as: 'groups' });
            UserModel.hasMany(models.FileModel, { foreignKey: 'owner_id', as: 'files' });
            UserModel.hasMany(models.BookingModel, { foreignKey: 'user_id', as: 'bookings' });
            UserModel.hasMany(models.UserGroupModel, { foreignKey: 'user_id', as: 'user_groups' });
            UserModel.hasMany(models.ArchiveModel, { foreignKey: 'user_id', as: 'archives' });
        }
    }
    UserModel.initModel(sequelize);
    return UserModel;
}
exports.default = defineUserModel;
