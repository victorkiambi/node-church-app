module.exports = (sequelize, Sequelize) => {
    return sequelize.define("comment", {
        comments: {
            type: Sequelize.STRING
        },
        userId: {
            type: Sequelize.INTEGER
        },
        postId: {
            type: Sequelize.INTEGER
        },
        isDeleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    },
        {
            underscored: true,
            paranoid: true,
        }
    );
}