require('dotenv').config();
const express = require('express')
const cors = require('cors')
require('./config/db')
// const redis = require("redis")

const app = express();
// const client = redis.createClient();
// client.connect();
const userRouter = require('./src/routes/user')
const taskRouter = require('./src/routes/task')

app.use(express.json())
app.use(cors())

app.use("/api/auth",userRouter);
app.use("/api",taskRouter);

const PORT = process.env.PORT || 7000;
app.listen(PORT,()=>{
    console.log(`Server running at http://localhost:${PORT}`);
});
