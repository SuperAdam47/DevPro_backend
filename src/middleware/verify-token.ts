import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

export const verify = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.header('Authorization');

    if (!auth)
        return res.status(401).send('Access denied!!!')
    let token = auth.split(' ')[1];
    // console.log(token, process.env.JWT_SECRET);
    if (!token)
        return res.status(401).send('Access denied!!!')
    try {
    // console.log(token, "sadad");

        const verify = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(verify)
        req.user = verify;
        next()
    } catch (err) {
        return res.status(400).json({
          error: "Invalid token",
          err: {err}
        })
    }
}
