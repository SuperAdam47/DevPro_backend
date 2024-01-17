import { Schema, model, Document } from "mongoose"

interface IUser extends Document {
    first_name: string;
    last_name:string;
    full_name:string;
    email: string;
    password: string;
    date: Date;
}

const UserSchema: Schema = new Schema({
    first_name: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    last_name: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    full_name: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    email: {
        type: String,
        required: true,
        max: 255
    },
    password: {
        type: String,
        required: true,
        max: 1024, //store hashes
        min: 6
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const User = model<IUser>('User', UserSchema)
export default User;