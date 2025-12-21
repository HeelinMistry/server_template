// services/usersService.js
import { db, init } from './db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export function findUserByName(name) {
    return db.data.users.find(u => u.name === name);
}

// Get all users
export async function getAllUsers() {
    await init();
    return db.data.users;
}

// Create new user
const saltRounds = 10;

async function hashSecret(name) {
    return await bcrypt.hash(name, saltRounds);
}

async function compareSecret(plainSecret, hashedSecret) {
    return await bcrypt.compare(plainSecret, hashedSecret);
}

export async function createUser(name) {
    await init();
    const secret = await hashSecret(name);
    const user = findUserByName(name);
    if(user) {
        return { success: false };
    }
    else {
        const newUser = {
            id: Date.now(),
            name: name,
            secret: secret,
        };
        db.data.users.push(newUser);
        await db.write();
        return { success: true, user: { id: newUser.id } };
    }
}

// Login user
export async function loginUser(name) {
    await init();
    const user = findUserByName(name);
    if (!user) {
        return { success: false };
    }

    const isValid = await compareSecret(name, user.secret);
    if (isValid) {
        // Successful login: Create a JWT
        // We include only safe, non-sensitive data (id, username) in the token payload
        const token = jwt.sign(
            { id: user.id },
            JWT_SECRET,
            { expiresIn: '1h' } // Token expires in 1 hour
        );
        return { success: true, token, user: { id: user.id } };
    } else {
        // Secret does not match
        return { success: false };
    }
}
