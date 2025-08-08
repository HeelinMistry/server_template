import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import path from 'path';
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const file = path.join(__dirname, 'db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter, {});

let initialized = false;

export async function init() {
    if (initialized) return;

    await db.read();

    if (!db.data) db.data = {};
    if (!Array.isArray(db.data.users)) db.data.users = [];

    await db.write();
    initialized = true;
}

export { db };
