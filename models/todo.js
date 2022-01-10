const mongoose = require('mongoose');

const TodoSchema=mongoose.Schema({

    
    taskName:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    dayRequired:{
        type: Number,
        required:true
    },
    status:{
        type:String,
        default:'Started'

    },
})
TodoSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

TodoSchema.set('toJSON', {
    virtuals: true,
});

exports.Todo= mongoose.model('Todo',TodoSchema)