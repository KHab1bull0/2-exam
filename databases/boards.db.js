import { pool } from "./db.js";

export const createBoardTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS boards(
            id SERIAL PRIMARY KEY,
            title VARCHAR(32)
        );
    `;
    const res = await pool.query(query);
    return true;
};

export const insertBoard = async (title) => {
    const query = `
        INSERT INTO boards(title) values 
        ($1) RETURNING *;
    `;
    const res = pool.query(query, [title]);
    return res.rows;
};

export const getAll = async () => {
    const query = `
        SELECT * FROM boards;
    `;
    const res = await pool.query(query);
    return res.rows
};

export const getById = async (id) => {
    const query = `
        SELECT * FROM boards WHERE id = $1;
    `;
    const res = await pool.query(query, [id]);
    return res.rows;
};

export const putById = async (title, id) => {
    const query = `
        UPDATE boards SET title = $1 WHERE id = $2 RETURNING *;
    `;
    const res = await pool.query(query, [title, id]);
    return res.rows;
};