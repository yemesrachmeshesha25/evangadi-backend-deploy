require("dotenv").config();

const express = require('express');
const app = express();
const port = 5500

const cors = require('cors')
app.use(cors())
//db connection
const dbConnection = require("./db/dbConfig")


//user routes middleware file
const userRoutes= require("./routes/userRoute")
//authentication middleware file
const authMiddleware = require('./middleware/authMiddleware')
//question routes middleware file
const questionsRoutes = require("./routes/questionRoute")
//answer routes
const answerRoutes = require("./routes/answerRoutes")
//json middleware to extract json data
app.use(express.json());

//user routes middleware
app.use("/api/users", userRoutes);


//questions routes middleware ??
app.use("/api/questions", authMiddleware, questionsRoutes);

//answer routes middleware ??
app.use("/api/answers",authMiddleware,answerRoutes);

async function start(){
    try {
        const result = await dbConnection.execute("select 'test' ")
        await app.listen(port);
        console.log(`listening on ${port}`);
     } catch (error) {
         console.log(error.message);
     }
}

start();


