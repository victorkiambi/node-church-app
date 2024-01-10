const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

const UserDTO = require("../dto/user-dto");

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalElements, rows: content } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalElements / limit);

    return { totalElements, content, totalPages, currentPage };
};


// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if (!req.body.username) {
        res.status(400).send({
            message: "Username can not be empty!"
        });
        return;
    }

    // Create a User
    const user = {
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    };

    // Save User in the database
    User.create(user)
        .then(data => {
            res.send(data);
            console.log(`Created user: ${JSON.stringify(data)}`);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
            console.log(`Failed to create user: ${err}`);
        });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    // const username = req.query.username;
    // const condition = username ? {username: {[Op.like]: `%${username}%`}} : null;

    // const id = req.query.id;
    // const condition = id ? { id } : null;

    const { page, size} = req.query;
    const { limit, offset } = getPagination(page, size);
    User.findAndCountAll({
        where: {},
        limit: 10,
        offset: 0
    })
        .then(data => {
            const users = data.rows.map(user => new UserDTO(user));
            const response = getPagingData({...data, rows: users}, page, limit);
            return res.send(response);
        })
        .catch(err => {
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};

// Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findByPk(id)
        .then(data => {
            res.send(data);
            console.log(`Found user: ${JSON.stringify(data)}`);
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving User with id=${id}`
            });
            console.log(`Failed to find user: ${err}`);
        });
};

// Update a User by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    User.update(req.body, {
        where: {id: id}
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "User was updated successfully."
                });
                console.log(`Updated user: ${JSON.stringify(req.body)}`);
            } else {
                res.send({
                    message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
                });
                console.log(`Failed to update user with id=${id}`);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error updating User with id=${id}`
            });
            console.log(`Failed to update user: ${err}`);
        });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: {id: id}
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "User was deleted successfully!"
                });
                console.log(`Deleted user with id=${id}`);
            } else {
                res.send({
                    message: `Cannot delete User with id=${id}. Maybe User was not found!`
                });
                console.log(`Failed to delete user with id=${id}`);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Could not delete User with id=${id}`
            });
            console.log(`Failed to delete user: ${err}`);
        });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
    User.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({message: `${nums} Users were deleted successfully!`});
            console.log(`Deleted ${nums} users`);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all users."
            });
            console.log(`Failed to delete users: ${err}`);
        });
};

