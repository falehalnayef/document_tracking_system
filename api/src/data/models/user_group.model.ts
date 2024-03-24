import { Sequelize, DataTypes, Model } from 'sequelize';
import { IUserGroupAttributes } from '../../interfaces/business_interfaces/user_group.interfaces';


export default function defineUserGroupModel(sequelize: Sequelize) {
  class UserGroupModel extends Model<IUserGroupAttributes> {


    static initModel(sequelize: Sequelize) {
      this.init(
        {
          ug_id: {
              type: DataTypes.INTEGER,
              autoIncrement: true,
              primaryKey: true
          },
          group_id: {
              type: DataTypes.INTEGER,
              allowNull: false
          },
          user_id: {
              type: DataTypes.INTEGER,
              allowNull: false
          }
      },
      {
          sequelize,
          tableName: "user_groups",
          timestamps: false
      }
      );
    }

    public static associate(models: any): void {
      UserGroupModel.belongsTo(models.UserModel, { foreignKey: 'user_id', as: 'user' });
      UserGroupModel.belongsTo(models.GroupModel, { foreignKey: 'group_id', as: 'group' });

    }
   
  }

  UserGroupModel.initModel(sequelize);

  return UserGroupModel;
}
