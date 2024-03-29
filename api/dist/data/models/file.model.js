"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
function defineFileModel(sequelize) {
    class FileModel extends sequelize_1.Model {
        static initModel(sequelize) {
            this.init({
                file_id: {
                    type: sequelize_1.DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                file_name: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false
                },
                path: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false
                },
                public: {
                    type: sequelize_1.DataTypes.BOOLEAN,
                    defaultValue: false,
                    allowNull: false
                },
                checked: {
                    type: sequelize_1.DataTypes.BOOLEAN,
                    defaultValue: false,
                    allowNull: false
                },
                owner_id: {
                    type: sequelize_1.DataTypes.INTEGER,
                    allowNull: false
                },
                date: {
                    type: sequelize_1.DataTypes.DATE,
                    allowNull: false
                }
            }, {
                sequelize,
                tableName: "files",
                timestamps: false
            });
        }
        static associate(models) {
            FileModel.hasMany(models.BookingModel, { foreignKey: 'file_id', as: 'bookings' });
            FileModel.hasMany(models.ArchiveModel, { foreignKey: 'file_id', as: 'archives' });
            FileModel.hasOne(models.FileGroupModel, { foreignKey: 'file_id', as: 'file_groups' });
            FileModel.belongsTo(models.UserModel, { foreignKey: 'owner_id', as: 'owner' });
        }
    }
    FileModel.initModel(sequelize);
    return FileModel;
}
exports.default = defineFileModel;
