import { deleteById, getAll, getById, putById } from "../databases/user.db.js"
import { hashpassword } from "../utils/hashing.js";


export const getAllUsers = async (req, res) => {
    try {
        const queryRes = await getAll();
        return res.status(200).send({
            res: queryRes
        });

    } catch (err) {
        console.log(err);
        return res.status(500).send({
            res: err
        })
    };
};

export const getUserById = async (req, res) => {

    try {
    const { userId } = req.params;
        const queryRes = await getById(userId);

        if (queryRes.length == 0) {
            return res.status(200).send({
                res: "User mavjud emas"
            });
        };
        return res.status(200).send(queryRes[0]);

    } catch (err) {
        console.log(err);
        return res.status(500).send({
            res: err
        });
    };
};

export const putUserById = async (req, res) => {
    try {

    const { userId } = req.params;
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send({
            res: "Bad request"
        });
    };

        const user = await getById(userId);

        let newUser = {
            name: name || user.name,
            email: email || user.email,
            password: hashpassword(password) || user.password
        };

        const queryRes = await putById({...newUser, userId});

        console.log(queryRes);
        if(queryRes.length == 1){
            return res.status(200).send({
                res: "Updated"
            });
        };


    } catch (err) {
        console.log(err);
        return res.status(500).send({
            res: err
        });
    };
};

export const deleteUserById = async (req, res) => {
    try{

    const {userId} = req.params;

        const user = await getById(userId);

        if(user.length == 0){
            return res.status(400).send({
                res: "User mavjud emas"
            });
        };

        const queryRes = await deleteById(userId);

        return res.status(200).send({
            res: "Deleted"
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            res: err
        });
    };
};