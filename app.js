const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const cors = require("cors");


const db = require("./app/models");
db.sequelize.sync().then(r => {
    console.log("syncED db.");
    // initial();
}).catch(err => {
    console.log(`Failed to sync db: ${err}`);
});

app.use(cors());
// const corsOptions = {
//     origin: "http://localhost:8081"
// };
//
// app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);

module.exports = app;
