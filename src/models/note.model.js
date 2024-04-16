import { DataTypes } from 'sequelize';

export default (sequelize) => {
  sequelize.define('Note', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    bookId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  },
    {
      timestamps: true,
      createdAt: true,
      updatedAt: true
    }
  )
};
