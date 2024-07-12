"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Projects", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      company_name: {
        type: Sequelize.STRING,
      },
      date: {
        type: Sequelize.DATE,
      },
      phone: {
        type: Sequelize.STRING,
      },
      contact_person_name: {
        type: Sequelize.STRING,
      },
      contact_person_phone: {
        type: Sequelize.STRING,
      },
      required_personnel_number: {
        type: Sequelize.INTEGER,
      },
      required_qualifications: {
        type: Sequelize.STRING,
      },
      unit_price_weekday_daytime: {
        type: Sequelize.FLOAT,
      },
      unit_price_holiday_daytime: {
        type: Sequelize.FLOAT,
      },
      unit_price_weekday_nighttime: {
        type: Sequelize.FLOAT,
      },
      unit_price_holiday_nighttime: {
        type: Sequelize.FLOAT,
      },
      remarks: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Projects");
  },
};
