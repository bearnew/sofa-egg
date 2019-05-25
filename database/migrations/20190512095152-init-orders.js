'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    const {
      INTEGER,
      DATE,
      STRING
    } = Sequelize;

    await queryInterface.createTable('orders', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      userId: {
        type: INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      likes_count: {
        type: INTEGER,
        comment: '点赞数量'
      },
      likes_user_ids: {
        type: STRING,
        comment: '点赞用户id列表'
      },
      created_at: DATE,
      updated_at: DATE
    });
  },

  down: async queryInterface => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    await queryInterface.dropTable('orders');
  }
};
