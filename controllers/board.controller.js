import { getAll, getById, insertBoard, putById } from "../databases/boards.db.js";

export const addBoard = async (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).send({
            res: "Bad resquest"
        });
    };

    try {
        const queryRes = await insertBoard(title);

        return res.status(200).send({
            res: "Board qo'shildi..."
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            res: err
        });
    };
};

export const getAllBoard = async (req, res) => {

    try {
        const queryRes = await getAll();
        if (queryRes.length == 0) {
            return res.status(200).send({
                res: "Board mavjud emas"
            });
        };

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

export const getBoardById = async (req, res) => {
    try {
        const { boardId } = req.params;

        const queryRes = await getById(boardId);
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

export const putBoardById = async (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).send({
            res: "Bad request"
        });
    };

    try {
        const { boardId } = req.params;
        const board = await getById(boardId);

        if (board.length == 0) {
            return res.status(200).send({
                res: "Board mavjud emas"
            });
        };

        const queryRes = await putById(title, boardId);

        res.status(200).send({
            board: queryRes,
            res: "Updated"
        });

    } catch (err) {
        console.log(err);
        return res.status(500).send({
            res: err
        });
    };
};