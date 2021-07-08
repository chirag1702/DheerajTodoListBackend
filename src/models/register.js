const mongoose=require('mongoose')

const validator=require('validator')
const loginSchema=new mongoose.Schema({
    fname:{
        type:String,
        require:true,
        minlength:2
    },
    lname:{
        type:String,
        require:true,
        minlength:2
    },
    email:{
        type:String,
        required:true,
        unique:[true,'email is already present'],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('invalid mail')
            }
        }
        },
    gender:{
        type:String
    
    },
    pass:{
        type:String,
        required:true
    }
    
    })
    
    const reg=new mongoose.model('Registration',loginSchema) 
    module.exports=reg

    