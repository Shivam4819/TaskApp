const express= require('express')
const app= express()
const morgan=require('morgan')

require('dotenv/config')

const api= process.env.API_URL
const mongoose = require('mongoose');
const cors = require('cors');
const todoRouter= require('./routers/todos') 


app.use(cors());
app.options('*', cors())


// middileware
app.use(express.json());
app.use(morgan('tiny'));

// routes
app.use(`${api}/todo`, todoRouter)

app.listen(3000,()=>{
    console.log('server running on http://localhost:3000');
    console.log(api)
})

// to connect to mongo atlas
mongoose.connect(process.env.DB_CONNECTION_STRING)
.then(()=>{
    console.log('Db connection is ready....')
})
.catch((err)=>{
    console.log(err)
})

