const UserDTO = require('./user-dto');

class PostDTO {
  constructor(model) {
    this.id = model.id;
    this.title = model.title;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.userId = model.userId;
    this.user = model.users ? new UserDTO(model.users) : null;
    this.comments = model.comments ? model.comments : null;
  }
}

module.exports = PostDTO;
