"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
function defineUserGroupModel(sequelize) {
    class UserGroupModel extends sequelize_1.Model {
        static initModel(sequelize) {
            this.init({
                ug_id: {
                    type: sequelize_1.DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                group_id: {
                    type: sequelize_1.DataTypes.INTEGER,
                    allowNull: false
                },
                user_id: {
                    type: sequelize_1.DataTypes.INTEGER,
                    allowNull: false
                }
            }, {
                sequelize,
                tableName: "user_groups",
                timestamps: false
            });
        }
        static associate(models) {
            UserGroupModel.belongsTo(models.UserModel, { foreignKey: 'user_id', as: 'user' });
            UserGroupModel.belongsTo(models.GroupModel, { foreignKey: 'group_id', as: 'group' });
        }
    }
    UserGroupModel.initModel(sequelize);
    return UserGroupModel;
}
exports.default = defineUserGroupModel;
