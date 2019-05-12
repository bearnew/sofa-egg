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
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      openid: {
        type: STRING(256), // VARCHAR(255)
        unique: true
      },
      avatarUrl: STRING(1234), // VARCHAR(255)
      city: STRING(32),
      country: STRING(32),
      gender: {
        type: ENUM('male', 'female'),
        comment: 'male-男， female-女',
      },
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