import mongoose from "mongoose";
import Blog from "../model/Blog";

const databaseConnect = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Mongodb Database Connected')
    }).catch(error => {
        console.log(error)
    })
}

/**Create a new blog post object */



module.exports = databaseConnect;