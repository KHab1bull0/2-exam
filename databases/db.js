import pg from 'pg';
import dotenv from 'dotenv';
import { createUserTable } from './user.db.js';
import { createTaskTable } from './tasks.db.js';
import { createBoardTable } from './boards.db.js';


dotenv.config();
const { Pool } = pg;
const { DB_USER, DB_HOST, DB_PORT, DB_NAME, DB_PASSWORD } = process.env


export const pool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    port: DB_PORT,
    password: DB_PASSWORD,
    database: DB_NAME
});



export const createTables = async (req, res) => {
    let table1 = 0;
    let table2 = 0;
    let table3 = 0;

    if (await createUserTable()) {
        table1 = 1;
    };
    if (await createBoardTable()) {
        table3 = 1;
    };
    if (await createTaskTable()) {
        table2 = 1;
    };
    if (table1 && table2 && table3) {
        console.log("Tablelar yaratildi...");
        return res.status(200).send("Table yaratildi...");
    } 
    res.status(500).send('Table yaratishda muammo...');
};



