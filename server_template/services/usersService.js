// Simulated user data store
const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
];

// Service functions for users
const getAllUsers = () => {
    return users;
};

const createUser = (name) => {
    const newUser = {
        id: Date.now(),
        name,
    };
    users.push(newUser);
    return newUser;
};

module.exports = {
    getAllUsers,
    createUser,
};
