const mongoose = require("mongoose");

const connectToMongoose = () =>{
    mongoose.connect("mongodb://localhost:27017/icloudnotebookDb",() => {
        console.log("Mongoose is connected with local mongodb")
    })
}

module.exports = connectToMongoose;