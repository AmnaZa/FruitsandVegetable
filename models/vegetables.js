const mongoose = require('mongoose');

const  vegetablechema = new mongoose.Schema ({
    name : String ,
    color : String,
    readyToEat : Boolean
})


// make the model 

const Vegetable = mongoose.model('Vegetable'  , vegetablechema);


// export Vegetable 

module.exports = Vegetable ;