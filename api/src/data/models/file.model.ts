import { Sequelize, DataTypes, Model } from "sequelize";
import { IFileAttributes } from "../../interfaces/business_interfaces/file.interfaces.js";

export default function defineFileModel(sequelize: Sequelize) {
  class FileModel extends Model<IFileAttributes> {
    static initModel(sequelize: Sequelize) {
      this.init(
        {
          file_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          file_name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          path: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          checked: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
          },
          owner_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          date: {
            type: DataTypes.DATE,
            allowNull: false,
          },
        },
        {
          sequelize,
          tableName: "files",
          timestamps: false,
          indexes: [
            {
              unique: false,
              fields: ["file_name"],
            },
          ],
        }
      );
    }

    public static associate(models: any): void {
      FileModel.hasMany(models.BookingModel, {
        foreignKey: "file_id",
        as: "bookings",
        onDelete: "cascade",
      });
      FileModel.hasMany(models.ArchiveModel, {
        foreignKey: "file_id",
        as: "archives",
        onDelete: "cascade",
      });
      FileModel.hasOne(models.FileGroupModel, {
        foreignKey: "file_id",
        as: "file_groups",
        onDelete: "cascade",
      });
      FileModel.belongsTo(models.UserModel, {
        foreignKey: "owner_id",
        as: "owner",
      });
    }
  }

  FileModel.initModel(sequelize);

  return FileModel;
}
