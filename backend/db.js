const mongoose = require("mongoose");
// mongodb://localhost:27017/icloudnotebookDb

const connectToMongoose = () =>{
    mongoose.connect("mongodb+srv://Aishwary-Rajput:"+process.env.DB_KEY+"@cluster0.kqtwz.mongodb.net/icloudnotebookDb?retryWrites=true&w=majority",() => {
        console.log("Mongoose is connected with local mongodb")
        // console.log(process.env);
    })
}

module.exports = connectToMongoose;