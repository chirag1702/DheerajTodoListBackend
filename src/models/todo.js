const mongoose=require('mongoose')
const detaiSchema=new mongoose.Schema({
    userid:{
        type:String,
    },
    title:{
        type:String,
    },
    description:{
        type:String,

    }
    })
    
    const detai =new mongoose.model('Todoli',detaiSchema) 
    module.exports=detai