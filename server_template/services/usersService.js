// services/usersService.js
import { db, init } from './db.js';


export async function getAllUsers() {
    await init();
    return db.data.users;
}

export async function createUser(name) {
    await init();
    const newUser = {id: Date.now(), name};
    db.data.users.push(newUser);
    await db.write();
    return newUser;
}
