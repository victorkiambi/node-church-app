class UserDto {
  constructor(model) {
    this.id = model.id;
    this.email = model.email;
    this.username = model.username;
  }
}

module.exports = UserDto;