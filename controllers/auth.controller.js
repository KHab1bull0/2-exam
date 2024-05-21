import { register, login } from "../databases/user.db.js";
import { hashCompare } from "../utils/hashing.js";


export const registerUser = async (req, res) => {
    try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send({
            res: "Bad request"
        });
    };

        const queryRes = await register(name, email, password);

        if (queryRes) {
            return res.status(201).send({
                res: "Registered"
            });
        };

        return res.status(400).send({
            res: "Register funcda xatolik"
        });

    } catch (err) {
        console.log(err);
        return res.send({
            res: err
        });
    };
};

export const loginUser = async (req, res) => {
    try {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({
            res: "Bad resquest"
        });
    };

        const queryRes = await login(email);
        console.log(queryRes)
        if (queryRes.length) {
            console.log(password, " || ", queryRes.password);
            if (await hashCompare(password, queryRes[0].password)) {
                return res.status(200).send(queryRes);
            }
            return res.send({
                res: "Password is incorrect..."
            });
        };

        if (queryRes.length == 0) {
            return res.status(200).send({
                res: "Ro'yxatdan o'tilmagan"
            });
        }
        return res.status(500).send({
             res: "Login qilishda xatilik"
        });

    } catch (err) {
        console.log(err);
        return res.send(err);
    };
};