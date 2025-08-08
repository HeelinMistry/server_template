// services/usersService.js
const { db, init } = require('./db');

async function getAllUsers() {
    await init();
    return db.data.users;
}

async function createUser(name) {
    await init();
    const newUser = { id: Date.now(), name };
    db.data.users.push(newUser);
    await db.write();
    return newUser;
}

module.exports = {
    getAllUsers,
    createUser,
};
