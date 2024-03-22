"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
function defineFileGroupModel(sequelize) {
    class FileGroupModel extends sequelize_1.Model {
        static initModel(sequelize) {
            this.init({
                fg_id: {
                    type: sequelize_1.DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                group_id: {
                    type: sequelize_1.DataTypes.INTEGER,
                    allowNull: false
                },
                file_id: {
                    type: sequelize_1.DataTypes.INTEGER,
                    allowNull: false
                }
            }, {
                sequelize,
                tableName: "file_groups",
                timestamps: false
            });
        }
        static associate(models) {
            FileGroupModel.belongsTo(models.FileModel, { foreignKey: 'file_id', as: 'file' });
            FileGroupModel.belongsTo(models.GroupModel, { foreignKey: 'group_id', as: 'group' });
        }
    }
    FileGroupModel.initModel(sequelize);
    return FileGroupModel;
}
exports.default = defineFileGroupModel;
