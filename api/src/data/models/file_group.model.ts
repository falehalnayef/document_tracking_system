import { Sequelize, DataTypes, Model } from 'sequelize';
import { IFileGroupAttributes } from '../../interfaces/business_interfaces/group.interfaces';


export default function defineFileGroupModel(sequelize: Sequelize) {
  class FileGroupModel extends Model<IFileGroupAttributes> {


    static initModel(sequelize: Sequelize) {
      this.init(
        {
          fg_id: {
              type: DataTypes.INTEGER,
              autoIncrement: true,
              primaryKey: true
          },
          group_id: {
              type: DataTypes.INTEGER,
              allowNull: false
          },
          file_id: {
              type: DataTypes.INTEGER,
              allowNull: false
          }
      },
      {
          sequelize,
          tableName: "file_groups",
          timestamps: false
      }
      );
    }


    public static associate(models: any): void {
      FileGroupModel.belongsTo(models.FileModel, { foreignKey: 'file_id', as: 'file', onDelete: "cascade" });
      FileGroupModel.belongsTo(models.GroupModel, { foreignKey: 'group_id', as: 'group', onDelete: "cascade" });

    }
  }



  FileGroupModel.initModel(sequelize);

  return FileGroupModel;
}
