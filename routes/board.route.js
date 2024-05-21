import { Router } from "express";
import { addBoard, getAllBoard, getBoardById, putBoardById } from "../controllers/board.controller.js";

export const boardRoute = Router();

boardRoute.post('/boards', addBoard);
boardRoute.get('/boards', getAllBoard);
boardRoute.get('/boards/:boardId', getBoardById);
boardRoute.put('/boards/:boardId', putBoardById);