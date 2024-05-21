import { getAll, insertTask, getById, deleteById } from "../databases/tasks.db.js";


export const addTask = async (req, res) => {
    try {
        const { title, orders, description, userId, boardId } = req.body;

        if (!title || !orders || !description || !userId || !boardId) {
            return res.status(400).send({
                res: "Bad request"
            });
        };

        const queryRes = await insertTask(title, orders, description, userId, boardId);

        return res.status(200).send({
            res: "Task qo'shildi...",
            task: queryRes
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            res: err
        });
    };
};

export const getAllTasks = async (req, res) => {
    try {
        const queryRes = await getAll();
        return res.status(200).send({
            res: queryRes
        });

    } catch (err) {
        console.log(err);
        return res.status(500).send({
            res: err
        });
    };
};

export const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;

        const queryRes = await getById(id);
        return res.status(200).send({
            res: queryRes[0]
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            res: err
        });
    };
};

export const deleteTaskById = async (req, res) => {

    try {
        const { id } = req.params;
        const task = await getById(id);
        if (task.length == 0) {
            return res.status(200).send({
                res: "task mavjud emas"
            });
        };
        const queryRes = await deleteById(id);

        return res.status(200).send({
            task: queryRes,
            res: "Deleted"
        });
    }catch (err) {
        console.log(err);
        return res.status(500).send({
            res: err
        });
    };
};