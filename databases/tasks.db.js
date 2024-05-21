import { describe } from "node:test";
import { pool } from "./db.js";


export const createTaskTable = async () => {

    const query = `
    CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        orders INT NOT NULL,
        description VARCHAR(255) NOT NULL,
        user_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id),
        board_id INT NOT NULL,
        FOREIGN KEY (board_id) REFERENCES boards(id) 
      );
    `;

    const res = await pool.query(query);
    return true;
};

export const insertTask = async (title, order, description, userId, boardId) => {
  const query = `
    INSERT INTO tasks (title, orders, description, user_id, board_id) values
    ($1, $2, $3, $4, $5) RETURNING *;
  `;

  const res = await pool.query(query, [title, order, description, userId, boardId]);
  return res.rows;
};

export const getAll = async() => {
  const query = `
    SELECT * FROM tasks;
  `;
  const res = await pool.query(query);
  return res.rows;
};

export const getById = async (id) => {
  const query = `
    SELECT * FROM tasks WHERE id = $1;
  `;
  const res = await pool.query(query, [id]);
  return res.rows;
};