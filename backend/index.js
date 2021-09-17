const express = require("express")
const connectToMongoose = require("./db")
var cors = require('cors')
const app = express();
 
app.use(cors())
connectToMongoose();

app.use(express.json()) //to use req.body we used this #middleware

//Using Router from Routes/auth No Login required
app.use("/api/auth",require("./routes/auth"))
app.use("/api/notes",require("./routes/note"))

app.listen(5000,()=>{
    console.log("localhost is at port 5000")
})