const mongoose = require('mongoose')

const prediction = new mongoose.Schema({
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
    predictions:[{
        title:{
            type:String
        },
        data:{
            type:Array
        }
    }]
});



module.exports = Predictions = mongoose.model('prediction', prediction, 'predictions');