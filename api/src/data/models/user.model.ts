import { Sequelize, DataTypes, Model } from 'sequelize';

import {IUserAttributes} from '../../interfaces/user.interfaces';

export default function defineUserModel(sequelize: Sequelize) {
  class UserModel extends Model<IUserAttributes> {


    static initModel(sequelize: Sequelize) {
      this.init(
        {
          user_id: {
              type: DataTypes.INTEGER,
              autoIncrement: true,
              primaryKey: true
          },
          user_name: {
              type: DataTypes.STRING(128),
              allowNull: false
          },
          email: {
              type: DataTypes.STRING(128),
              allowNull: false,
              unique: true,
              validate: {
                  isEmail: true
              }
          },
          password: {
              type: DataTypes.STRING(128),
              allowNull: false
          }
      },
      {
          sequelize,
          tableName: "users",
          timestamps: false 
      }
      );
    }

    public static associate(models: any): void {
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
