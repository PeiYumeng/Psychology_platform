const users = [];

const addUser = ({ id, userId, status, isInRoom }) => {

  const existingUser = users.find((user) => user.userId === userId);

  const user = { id, userId, status, isInRoom };

  users.push(user);

  return { user };
}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if(index !== -1) return users.splice(index, 1)[0];
}

const getUser = (id) => users.find((user) => user.id === id);

// const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { users, addUser, removeUser, getUser };