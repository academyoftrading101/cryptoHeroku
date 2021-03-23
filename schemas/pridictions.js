const mongoose = require('mongoose')

const pridiction = new mongoose.Schema({
    coin:{
        type:String
    },
    review:{
        reviewTitle:{
            type:String
        },
        reviewText:{
            type:String
        }
    },
    pridictions:[{
        title:{
            type:String
        },
        data:{
            type:Array
        }
    }]
});



module.exports = Pridictions = mongoose.model('pridiction', pridiction, 'pridictions');