"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
function defineArchiveModell(sequelize) {
    class ArchiveModel extends sequelize_1.Model {
        static initModel(sequelize) {
            this.init({
                archive_id: {
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
                path: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false
                },
                date: {
                    type: sequelize_1.DataTypes.DATE,
                    allowNull: false
                }
            }, {
                sequelize,
                tableName: "archives",
                timestamps: false
            });
        }
        static associate(models) {
            ArchiveModel.belongsTo(models.UserModel, { foreignKey: 'user_id', as: 'user' });
            ArchiveModel.belongsTo(models.FileModel, { foreignKey: 'file_id', as: 'file' });
        }
    }
    ArchiveModel.initModel(sequelize);
    return ArchiveModel;
}
exports.default = defineArchiveModell;
