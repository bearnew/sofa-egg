'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 users 表
  up: async (queryInterface, Sequelize) => {
    const {
      INTEGER,
      DATE,
      STRING,
      ENUM
    } = Sequelize;
    await queryInterface.createTable('users', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      openid: STRING(256), // VARCHAR(255)
      avatarUrl: STRING(1234), // VARCHAR(255)
      city: STRING(32),
      country: STRING(32),
      gender: ENUM('male', 'female'),
      nickName: STRING(32),
      province: STRING(32),
      created_at: DATE,
      updated_at: DATE
    });
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async queryInterface => {
    await queryInterface.dropTable('users');
  },
};