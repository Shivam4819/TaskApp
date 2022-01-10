const express= require('express')
const router= express.Router();
const {Todo}= require('../models/todo');
const mongoose= require('mongoose');
const req = require('express/lib/request');


// get all todo from db

router.get(`/`,async (req,res)=>{

    const todo=await Todo.find({$or:[{status:"Started"},{status:"In Progress"}]})
    res.send(todo)
})


// save todo to db
router.post('/',async (req,res)=>{

    let todo=new Todo({
        taskName:req.body.taskName,
        description:req.body.description,
        dayRequired:req.body.dayRequired
    })

    todo= await todo.save();
    
    if(!todo)
    return res.status(404).send({message:' todo not created'})

    res.status(200).send({message:' todo created'})

})


// update task
router.put('/', async(req, res)=>{
    
    if(!mongoose.isValidObjectId(req.body.id)){
        res.status(400).send('invalid id type')
    }
    const todo= await Todo.findByIdAndUpdate(
        req.body.id,{
            status:req.body.status,
        },
        {new:true}
    )
    if(!todo)
    return res.status(404).json({status:false,message:'invalid id'})

    res.status(200).send({message:' todo updated'})
})


module.exports= router