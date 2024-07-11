"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Employees", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      employee_number: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      birth_date: {
        type: Sequelize.DATE,
      },
      email: {
        type: Sequelize.STRING,
      },
      employment_type: {
        type: Sequelize.STRING,
      },
      employment_start_date: {
        type: Sequelize.DATE,
      },
      emergency_contact_relationship: {
        type: Sequelize.STRING,
      },
      emergency_contact_phone: {
        type: Sequelize.STRING,
      },
      qualifications: {
        type: Sequelize.STRING,
      },
      ng_list: {
        type: Sequelize.BOOLEAN,
      },
      banned_info: {
        type: Sequelize.BOOLEAN,
      },
      self_ban: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable("Employees");
  },
};
