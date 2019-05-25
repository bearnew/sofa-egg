'use strict';

module.exports = app => {
    const {
        INTEGER,
        DATE,
        STRING
    } = app.Sequelize;

    const Order = app.model.define('order', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        userId: INTEGER,
        likes_count: INTEGER,
        likes_user_ids: STRING,
        created_at: DATE,
        updated_at: DATE
    });

    return Order;
};