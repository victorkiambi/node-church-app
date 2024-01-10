const db = require("../models");
const Post = db.post;
const PostDTO = require("../dto/post-dto");

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
// Create and Save a new Post
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Title can not be empty!"
        });
        return;
    }

    // Create a Post
    const post = {
        title: req.body.title,
        content: req.body.content,
        userId: req.body.userId
    };

    // Save Post in the database
    Post.create(post)
        .then(data => {
            res.send(data);
            console.log(`Created post: ${JSON.stringify(data)}`);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Post."
            });
            console.log(`Failed to create post: ${err}`);
        });
};

// Retrieve all Posts from the database.
exports.findAll = (req, res) => {
    const { page, size} = req.query;
    const { limit, offset } = getPagination(page, size);

    Post.findAndCountAll({
        include: [
            {
                model: db.user,
                as: 'users'
            },
            {
                model: db.comment,
                as: 'comments'
            }
        ],
        where: {},
        limit: 10,
        offset: 0
    })
        .then(data => {
            const posts = data.rows.map(post => new PostDTO(post));
            // const response = getPagingData(posts, page, limit);
            const response = getPagingData({ ...data, rows: posts }, page, limit);
            return res.send(response);
        })
        .catch(err => {
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving posts."
            });
        });
};