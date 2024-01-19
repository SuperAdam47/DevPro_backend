import { Schema, model, Document } from "mongoose";

interface IUser extends Document {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    title: string;
    city: string;
    country: string;
    phone_number: string;
    role: string;
    organization: string;
    department: string;
    zipcode: string;
    address: string;
    timezone: string;
    about: string;
    website_url: string;
    fb_url: string;
    twitter_url: string;
    linkdin_url: string;
    github_url: string;
    profile_photo: string;
    location: string;
    skills: string[];
    languages: string[];
    user_images:  string[];
    user_videos:  string[];
    birthday: Date;
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
    city: {
        type: String,
        max: 120,
        min: 3
    },
    country: {
        type: String,
        max: 120,
        min: 3
    },
    address: {
        type: String,
        max: 120,
        min: 3
    },
    
    phone_number: {
        type: String,
        max: 20,
        min: 3
    },
    
    role: {
        type: String,
        max: 120,
        min: 3
    },
    organization: {
        type: String,
        max: 200,
        min: 3
    },
    
    birthday: {
        type: Date,
    },
    
    department: {
        type: String,
        max: 200,
        min: 3
    },
    
    zipcode: {
        type: String,
        max: 200,
        min: 3
    },
    
    timezone: {
        type: String,
        max: 200,
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
    fb_url: {
        type: String,
        max: 1024,
        min: 3
    },
    twitter_url: {
        type: String,
        max: 1024,
        min: 3
    },
    linkdin_url: {
        type: String,
        max: 1024,
        min: 3
    },
    github_url: {
        type: String,
        max: 1024,
        min: 3
    },
    profile_photo: {
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
    user_images: [{ type: String }],
    user_videos: [{ type: String }],
    date: {
        type: Date,
        default: Date.now()
    }
});

const User = model<IUser>('User', UserSchema);
export default User;
