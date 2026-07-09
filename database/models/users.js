import { DataTypes } from "sequelize";
import sequelize from "../connection.js";

const User = sequelize.define ("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "usuario",
    },
  },{
    timestamps: true,
    tableName: "users",
});

export default User;