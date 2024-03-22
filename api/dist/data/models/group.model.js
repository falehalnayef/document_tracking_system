"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
function defineGroupModel(sequelize) {
    class GroupModel extends sequelize_1.Model {
        static initModel(sequelize) {
            this.init({
                group_id: {
                    type: sequelize_1.DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                group_name: {
                    type: sequelize_1.DataTypes.STRING(128),
                    allowNull: false
                },
                owner_id: {
                    type: sequelize_1.DataTypes.INTEGER,
                    allowNull: false
                },
                public: {
                    type: sequelize_1.DataTypes.BOOLEAN,
                    defaultValue: false,
                    allowNull: false
                }
            }, {
                sequelize,
                tableName: "groups",
                timestamps: false
            });
        }
        static associate(models) {
            GroupModel.hasMany(models.UserGroupModel, { foreignKey: 'group_id', as: 'user_groups' });
            GroupModel.hasMany(models.FileGroupModel, { foreignKey: 'group_id', as: 'file_groups' });
            GroupModel.belongsTo(models.UserModel, { foreignKey: 'owner_id', as: 'owner' });
        }
    }
    GroupModel.initModel(sequelize);
    return GroupModel;
}
exports.default = defineGroupModel;
