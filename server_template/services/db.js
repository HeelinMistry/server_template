const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');
const path = require('path');

const file = path.join(__dirname, 'db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter, {});

let initialized = false;

async function init() {
    if (initialized) return;

    await db.read();

    // Initialize default data structure if missing
    if (!db.data) {
        db.data = {};
    }

    if (!Array.isArray(db.data.users)) {
        db.data.users = [];
    }

    await db.write();

    initialized = true;
}

module.exports = { db, init };
