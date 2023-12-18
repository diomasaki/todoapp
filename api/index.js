const auth = require("./routes/auth.js")
const todo = require("./routes/todo.js")
const mongoose = require("mongoose")
const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const app = express()
dotenv.config()

mongoose.connect(process.env.DB).then(()=> console.log("DB Connected!")).catch((err) => console.log(err))

app.use(express.json())
app.use(cors())
app.use("/api/auth", auth)
app.use("/api/todo", todo)

app.listen(process.env.PORT || 8800, () => console.log("Backend Server Is Running!"))

