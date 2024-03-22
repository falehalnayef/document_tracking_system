import { Sequelize, DataTypes, Model } from 'sequelize';
import { IArchiveAttributes } from '../../interfaces/archive.interfaces';


export default function defineArchiveModell(sequelize: Sequelize) {
  class ArchiveModel extends Model<IArchiveAttributes> {

   
    static initModel(sequelize: Sequelize) {
      this.init(
        {
          archive_id: {
              type: DataTypes.INTEGER,
              autoIncrement: true,
              primaryKey: true
          },
          file_id: {
              type: DataTypes.INTEGER,
              allowNull: false
          },
          user_id: {
              type: DataTypes.INTEGER,
              allowNull: false
          },
          path: {
              type: DataTypes.STRING,
              allowNull: false
          },
          date: {
              type: DataTypes.DATE,
              allowNull: false
          }
      },
      {
          sequelize,
          tableName: "archives",
          timestamps: false
      }
      );
    }

    public static associate(models: any): void {
        ArchiveModel.belongsTo(models.UserModel, { foreignKey: 'user_id', as: 'user' });
        ArchiveModel.belongsTo(models.FileModel, { foreignKey: 'file_id', as: 'file' });

      }
  }

  ArchiveModel.initModel(sequelize);

  return ArchiveModel;
}
