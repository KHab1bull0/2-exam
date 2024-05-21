import { Router } from "express";
import { addTask, getAllTasks, getTaskById, deleteTaskById } from "../controllers/task.controller.js";

export const taskRoute = Router();


taskRoute.post('/boards/:boardId/tasks', addTask);
taskRoute.get('/boards/:boardId/tasks', getAllTasks);
taskRoute.get('/boards/:boardId/tasks/:id', getTaskById);
taskRoute.delete('/boards/:boardId/tasks/:id', deleteTaskById);