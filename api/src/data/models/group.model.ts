import { Sequelize, DataTypes, Model } from 'sequelize';

import {IGroupAttributes} from '../../interfaces/business_interfaces/group.interfaces';

export default function defineGroupModel(sequelize: Sequelize) {
  class GroupModel extends Model<IGroupAttributes> {


    static initModel(sequelize: Sequelize) {
      this.init(
        {
          group_id: {
              type: DataTypes.INTEGER,
              autoIncrement: true,
              primaryKey: true
          },
          group_name: {
              type: DataTypes.STRING,
              allowNull: false
          },
          owner_id: {
              type: DataTypes.INTEGER,
              allowNull: false
          },
          is_public: {
              type: DataTypes.BOOLEAN,
              defaultValue: false,
              allowNull: false
          }
      },
      {
          sequelize,
          tableName: "groups",
          timestamps: false 
      }
      );
    }

    public static associate(models: any): void {
        GroupModel.hasMany(models.UserGroupModel, { foreignKey: 'group_id', as: 'user_groups' });
        GroupModel.hasMany(models.FileGroupModel, { foreignKey: 'group_id', as: 'file_groups' });
        GroupModel.belongsTo(models.UserModel, { foreignKey: 'owner_id', as: 'owner' });
      }
  }

  GroupModel.initModel(sequelize);

  return GroupModel;
}
