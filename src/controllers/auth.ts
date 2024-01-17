import { Response, Request } from "express";
import User from "../models/User";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";

type RequestBody = {
    first_name: string;
    last_name: string;
    email: string;
    password: string
}
export const registerUser = async (req: Request, res: Response) => {
    const { first_name,last_name, email, password }: RequestBody = req.body;

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // store the user in db
    const user = new User({
        first_name: first_name,
        last_name: last_name,
        full_name:first_name+" "+last_name,
        email: email,
        password: hashedPassword
    });
    try {
        await user.save();
        res.send({ user: user._id })
    } catch (err) {
        res.status(400).send(err)
    }
}

export const loginUser = async (req: Request, res: Response) => {
    // Create and assign a JWT
    const token = jwt.sign({ id: req.userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME
    });
    res.header('Authorization', `Bearer ${token}`).json({
      token
    });
}

