// services/usersService.js
import { deleteAllUserAccounts } from './accountsService.js';
import { db, init } from './usersDb.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Compares users in the db with the user and returns the match.
 * @async
 * @param {string} name - The name provided by the user.
 * @returns {Promise<object>} An object containing user data
 */
export function findUserByName(name) {
    return db.data.users.find(u => u.name === name);
}

/**
 * Get all users stored in the db.
 * @async
 * @returns {Promise<object>} An object containing success status and user data, or an error message.
 * @throws {Error} Throws if token signing or database connection fails.
 */
export async function getAllUsers() {
    await init();
    return db.data.users;
}

const saltRounds = 10;

/**
 * Hash a plain text secret.
 * @async
 * @param {string} name - The password provided by the user.
 * @param {string} storedHash - The hashed password retrieved from the database.
 * @returns {Promise<string>} Hashed Value.
 */
async function hashSecret(name) {
    return await bcrypt.hash(name, saltRounds);
}

/**
 * Compares a plain text secret against a stored hash.
 * @async
 * @param {string} plainSecret - The password provided by the user.
 * @param {string} storedHash - The hashed password retrieved from the database.
 * @returns {Promise<boolean>} True if the secrets match, false otherwise.
 */
async function compareSecret(plainSecret, hashedSecret) {
    return await bcrypt.compare(plainSecret, hashedSecret);
}

/**
 * Create a new user, if there is no matching user.
 * @async
 * @param {string} name - The user's name (used as the primary identifier for login).
 * @returns {Promise<object>} An object containing success status, and user data, or an error message.
 * @throws {Error} Throws if token signing or database connection fails.
 */
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

/**
 * Deletes a specific user by ID, verifying secret before removal.
 *
 * @async
 * @param {number} ownerId - The unique ID of the account to delete.
 * @param {string} name - The user's name (used as the primary identifier for login).
 * @returns {Promise<object>} An object indicating success or failure.
 */
export async function deleteUser(ownerId, name) {
    await init();
    await db.read();
    const user = findUserByName(name);
    if (!user) {
        return { success: false };
    }
    const isValid = await compareSecret(name, user.secret);
    if (isValid) {
        const updatedUsers = db.data.users.filter(user =>
            !(user.id == ownerId)
        );
        db.data.users = updatedUsers;
        const accountCleanupResult = await deleteAllUserAccounts(ownerId);
    } else {
        return { success: false, message: "Authorization failed" };
    }
    await db.write();
    return { success: true, message: `${name} successfully deleted.` };
}

/**
 * Finds a user by name, compares the secret, and generates a JWT upon successful authentication.
 * @async
 * @param {string} name - The user's name (used as the primary identifier for login).
 * @returns {Promise<object>} An object containing success status, token, and user data, or an error message.
 * @throws {Error} Throws if token signing or database connection fails.
 */
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
