import { DataTypes } from 'sequelize';

export default (sequelize) => {
  sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false,
      validate: {
        len: [8, 64],
        notEmpty: true
      } 
    },
  },
    {
      timestamps: true,
      createdAt: true,
      updatedAt: true
    }
  )
};