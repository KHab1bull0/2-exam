import { Router } from "express";
import { addTask, getAllTasks, getTaskById } from "../controllers/task.controller.js";

export const taskRoute = Router();


taskRoute.post('/boards/:boardId/tasks', addTask);
taskRoute.get('/boards/:boardId/tasks', getAllTasks);
taskRoute.get('/boards/:boardId/tasks/:id', getTaskById);