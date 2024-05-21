import { Router } from "express";
import { createTables } from "../databases/db.js";

export const tableRoute = Router();


tableRoute.get('/setUp', createTables);