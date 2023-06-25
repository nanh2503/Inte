import mongoose from "mongoose";
const { Schema, model } = mongoose;

const blogSchema = new Schema({
    id: Number,
    email: String,
    fullName: String,
    password: String,
    gender: String,
    dateOfBirth: String,
    major: String,
    address: String,
    phoneNum: Number,
    image: String,
    createAt: Date,
    updateAt: Date
})

const Blog = model('Blog', blogSchema);

module.exports = Blog;