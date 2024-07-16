const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const Password = sequelize.define("Password", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    employee_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Password;
};
