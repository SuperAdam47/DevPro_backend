import { Schema, model, Document } from "mongoose";

interface IUser extends Document {
    first_name: string;
    last_name: string;
    full_name: string;
    email: string;
    password: string;
    title: string;
    about: string;
    website_url: string;
    location: string;
    skills: string[];
    languages: string[];
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
        max: 1024, // store hashes
        min: 6
    },
    title: {
        type: String,
        max: 120,
        min: 3
    },
    about: {
        type: String,
        max: 1200,
        min: 100
    },
    website_url: {
        type: String,
        max: 1024,
        min: 3
    },
    location: {
        type: String,
        max: 1024,
        min: 3
    },
    skills: [{ type: String }],
    languages: [{ type: String }],
    date: {
        type: Date,
        default: Date.now()
    }
});

const User = model<IUser>('User', UserSchema);
export default User;
