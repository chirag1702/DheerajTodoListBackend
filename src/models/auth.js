const mongoose=require('mongoose')
const authSchema=new mongoose.Schema({
    user_id:{
        type:String,
        require:true,
        minlength:1,
    },
    token:{
        type:String,
        require:true,
        minlength:1,
        unique:true
    },

    })
    
    const auth =new mongoose.model('Auth',authSchema) 
    module.exports=auth