const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const Project = sequelize.define("Project", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    company_name: DataTypes.STRING,
    date: DataTypes.DATE,
    phone: DataTypes.STRING,
    contact_person_name: DataTypes.STRING,
    contact_person_phone: DataTypes.STRING,
    required_personnel_number: DataTypes.INTEGER,
    required_qualifications: DataTypes.STRING,
    unit_price_weekday_daytime: DataTypes.FLOAT,
    unit_price_holiday_daytime: DataTypes.FLOAT,
    unit_price_weekday_nighttime: DataTypes.FLOAT,
    unit_price_holiday_nighttime: DataTypes.FLOAT,
    remarks: DataTypes.STRING,
  });
  return Project;
};
