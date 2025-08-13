import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";

class Site extends Model {}

Site.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    siteUrl: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "site_url",
      validate: {
        isUrl: {
          msg: "Must be a valid URL",
        },
      },
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Title cannot be empty",
        },
        len: {
          args: [1, 255],
          msg: "Title must be between 1 and 255 characters",
        },
      },
    },
    coverImage: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "cover_image",
      validate: {
        isValidUrl(value) {
          if (!value) return;

          try {
            new URL(value);
          } catch (error) {
            throw new Error("Cover image must be a valid URL");
          }
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Description cannot be empty",
        },
      },
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Category cannot be empty",
        },
        len: {
          args: [1, 100],
          msg: "Category must be between 1 and 100 characters",
        },
      },
    },
  },
  {
    sequelize,
    modelName: "Site",
    tableName: "sites",
    timestamps: true,
    underscored: false,
    indexes: [
      {
        fields: ["category"],
      },
      {
        fields: ["title"],
      },
    ],
  }
);

export default Site;
