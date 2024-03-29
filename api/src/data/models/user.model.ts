import { Sequelize, DataTypes, Model } from 'sequelize';

import {IUserAttributes} from '../../interfaces/business_interfaces/user.interfaces';

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
              type: DataTypes.STRING,
              allowNull: false
          },
          email: {
              type: DataTypes.STRING,
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
              type: DataTypes.STRING,
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
