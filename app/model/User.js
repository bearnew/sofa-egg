'use strict';

module.exports = app => {
    const {
        INTEGER,
        DATE,
        STRING,
        ENUM
    } = app.Sequelize;

    const User = app.model.define('user', {
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

    return User;
};