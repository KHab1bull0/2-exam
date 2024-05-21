import express from 'express';
import dotenv from 'dotenv';
import { tableRoute } from './routes/tables.route.js';
import { userRoute } from './routes/user.route.js';
import { boardRoute } from './routes/board.route.js';
import { taskRoute } from './routes/task.route.js';
dotenv.config();

const app = express();
app.use(express.json());



app.use('/', tableRoute);
app.use('/', userRoute);
app.use('/', boardRoute);
app.use('/', taskRoute);

const PORT = process.env.PORT || 4001;
app.listen(PORT, (err) => {
    if (err) {
        console.log("Server ishga tushishda xatolik: ", err);
    };
    console.log(`Server ${PORT} portda ishga tushdi...`)
});



