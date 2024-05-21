import bcrypt from 'bcrypt';

export const hashpassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
};

export const hashCompare = async (newpass, oldpass) => {
    return await bcrypt.compare(newpass, oldpass);
};