const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const Employee = sequelize.define("Employee", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    employee_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    birth_date: DataTypes.DATE,
    email: DataTypes.STRING,
    employment_type: DataTypes.STRING,
    employment_start_date: DataTypes.DATE,
    emergency_contact_relationship: DataTypes.STRING,
    emergency_contact_phone: DataTypes.STRING,
    qualifications: DataTypes.STRING,
    ng_list: DataTypes.BOOLEAN,
    banned_info: DataTypes.BOOLEAN,
    self_ban: DataTypes.BOOLEAN,
  });
  return Employee;
};
