module.exports = (sequelize, Sequelize) => {
    return sequelize.define("post", {
        title: {
            type: Sequelize.STRING
        },
        content: {
            type: Sequelize.STRING
        },
        userId: {
            type: Sequelize.INTEGER
        }
    },
        {
            underscored: true,
            paranoid: true,
        }
    );
}