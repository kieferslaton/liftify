const express = require('express');
const cors = require('cors')
const path = require('path');
const mongoose = require('mongoose')
require('dotenv').config()


const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, 'client/build')));

const connection = process.env.MONGODB_SRV
mongoose.connect(connection, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}).then(() => console.log("Db Connected")).catch(err => console.log(err))

const userRouter = require('./routes/user-route');
const planRouter = require('./routes/plan-route')

app.use('/users', userRouter);
app.use('/plans', planRouter)


const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Express app listening on ${port}`);