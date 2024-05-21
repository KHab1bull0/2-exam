import { pool } from "./db.js"
import { hashpassword } from '../utils/hashing.js'



export const createUserTable = async () => {

    const query = `
        CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(32) NOT NULL,
            email VARCHAR(32) UNIQUE NOT NULL,
            password VARCHAR(128) NOT NULL
        );
    `;

    const res = await pool.query(query);
    return true;
};


export const register = async (name, email, password) => {

    const query = `
        INSERT INTO users(name, email, password) values
        ($1, $2, $3) RETURNING *;
    `;

    const res = await pool.query(query, [name, email, hashpassword(password)]);
    return res.rows;
};

export const login = async (email) => {
    const query = `
        SELECT * FROM users WHERE email = $1;
    `;

    const res = await pool.query(query, [email]);
    return res.rows;
};

export const getAll = async () => {
    const query = `
        SELECT * FROM users;
    `;
    const res = await pool.query(query);
    return res.rows;
};

export const getById = async (id) =>{
    const query = `
        SELECT * FROM users WHERE ID = $1;
    `;
    const res = await pool.query(query, [id]);
    return res.rows;
};

export const putById = async (params) => {
    console.log(params);
    const {name, email, password, userId} = params;

    const query = `
        UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *;
    `
    const res = await pool.query(query, [name, email, password, userId]);
    return res.rows;
};

export const deleteById = async (id) => {
    const query = `
        DELETE FROM users WHERE id = $1 RETURNING *;
    `

    const res = await pool.query(query, [id]);
    return res.rows;
};

