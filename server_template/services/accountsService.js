// services/accountsService.js
import { db, init } from './accountsDb.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Compares accounts in the db with the ownerId and returns the matching account.
 * @async
 * @param {string} ownerId - The id of the user.
 * @returns {Promise<object>} An object containing user data
 */
export function findAccountById(ownerId) {
    return db.data.accounts.find(u => u.ownerId === ownerId);
}

/**
 * Get all accounts stored in the db.
 * @async
 * @returns {Promise<object>} An object containing success status and user data, or an error message.
 * @throws {Error} Throws if token signing or database connection fails.
 */
export async function getAllAccounts() {
    await init();
    await db.read();
    return db.data.accounts;
}

/**
 * Create a new account, for an associated user.
 * @async
 * @param {string} name - The user's name (used as the primary identifier for login).
 * @param {string} type - The account type.
 * @returns {Promise<object>} An object containing success status, and user data, or an error message.
 * @throws {Error} Throws if token signing or database connection fails.
 */
export async function createAccount(ownerId, accountName, accountType) {
    await init();
    await db.read();
    const normalizedName = accountName.trim().toUpperCase();
    const existingAccount = db.data.accounts.find(account =>
        // Filter by ownerId AND check if the names match (using normalized strings)
        account.ownerId == ownerId && account.name.trim().toUpperCase() === normalizedName
    );
    if (existingAccount) {
        // Return a failure object if a duplicate is found
        return {
            success: false,
            message: `Account name ${accountName} already exists for this user.`
        };
    }
    const newAccount = {
        id: Date.now(),
        ownerId: ownerId,
        name: accountName,
        type: accountType,
        monthlyHistory: []
    };
    db.data.accounts.push(newAccount);
    await db.write();
    return { success: true, message: `Account name ${accountName} added for this user.`, account: { id: newAccount.id } };
}


/**
 * Updates an existing monthly history record or creates a new one for an account.
 * Dynamically selects SAVING or LOAN account to update.
 *
 * @async
 * @param {number} accountId - The unique ID of the account to modify.
 * @param {string} monthKey - The month identifier (YYYY-MM).
 * @param {number} openingBalance - The total contribution for the month.
 * @param {number} contribution - The total contribution for the month.
 * @param {number} interestRate - The interestRate for the month.
 * @param {number} termsLeft - The termsLeft in months.
 * @param {number} closingBalance - The total contribution for the month.
 * @returns {Promise<object>} An object indicating success and the updated monthly record.
 */
export async function updateMonthlyHistory(accountId, monthKey, openingBalance, contribution, interestRate, termsLeft, closingBalance) {
    await init();
    await db.read();
    const account = db.data.accounts.find(a => a.id === accountId);
    if (!account) {
        return { success: false, message: `Account with ID ${accountId} not found.` };
    }

    if (account.type === 'SAVING') {
        const monthIndex = account.monthlyHistory.findIndex(m => m.monthKey === monthKey);
        if (monthIndex !== -1) {
            // --- UPDATE Existing Record (Scenario 1) ---
            const record = account.monthlyHistory[monthIndex];
            record.openingBalance = openingBalance;
            record.contribution = contribution;
            record.closingBalance = closingBalance;
            var updatedRecord = record;
        } else {
            // --- CREATE New Record (Scenario 2) ---
            const newRecord = {
                monthKey,
                openingBalance,
                contribution,
                closingBalance,
            };
            account.monthlyHistory.push(newRecord);
            var updatedRecord = newRecord;
        }
        account.monthlyHistory.sort((a, b) => {
                return a.monthKey.localeCompare(b.monthKey);
            });

        await db.write();
        return { success: true, record: updatedRecord };
    }
    if (account.type === 'LOAN') {
        const monthIndex = account.monthlyHistory.findIndex(m => m.monthKey === monthKey);
        if (monthIndex !== -1) {
            // --- UPDATE Existing Record (Scenario 1) ---
            const record = account.monthlyHistory[monthIndex];
            record.openingBalance = openingBalance;
            record.contribution = contribution;
            record.interestRate = interestRate;
            record.termsLeft = termsLeft;
            record.closingBalance = closingBalance;
            var updatedRecord = record;
        } else {
            // --- CREATE New Record (Scenario 2) ---
            const newRecord = {
                monthKey,
                openingBalance,
                contribution,
                interestRate,
                termsLeft,
                closingBalance,
            };
            account.monthlyHistory.push(newRecord);
            var updatedRecord = newRecord;
        }
        account.monthlyHistory.sort((a, b) => {
                return a.monthKey.localeCompare(b.monthKey);
            });
        await db.write();
        return { success: true, record: updatedRecord };
    }
}

/**
 * Retrieves all financial accounts associated with a given user ID.
 *
 * @async
 * @param {number} ownerId - The ID of the user whose accounts are being fetched.
 * @returns {Promise<object>} An object containing success status and an array of accounts,
 * or a message if the user has no accounts.
 */
export async function getUserAccounts(ownerId) {
    await init();
    await db.read();
    const userAccounts = db.data.accounts.filter(
        a => a.ownerId == ownerId
    );

    if (userAccounts.length === 0) {
        return {
            success: true,
            message: `No accounts found for owner ID ${ownerId}.`,
            accounts: []
        };
    }
    return {
        success: true,
        accounts: userAccounts,
    };
}