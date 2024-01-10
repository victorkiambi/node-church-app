const dbConfig = require('../../config/db.config.js');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require('../models/users.js')(sequelize, Sequelize);
db.post = require('../models/posts.js')(sequelize, Sequelize);
db.comment = require('../models/comments.js')(sequelize, Sequelize);

db.user.hasMany(db.post, { as: "posts", foreignKey: "userId" });
db.user.hasMany(db.comment, { as: "comments", foreignKey: "userId" });
db.post.belongsTo(db.user, {
    foreignKey: "userId",
    as: "users",
});
db.post.hasMany(db.comment, { as: "comments", foreignKey: "postId" });
db.comment.belongsTo(db.post, {
    foreignKey: "postId",
    as: "posts",
});


module.exports = db;