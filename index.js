const express=require('express')
const app=express()
const jwt=require("jsonwebtoken")
const bc=require('bcryptjs')
require('./src/db/conn')
const reg=require('./src/models/register')
const detail=require('./src/models/todo')
const auth=require('./src/models/auth')
const cors = require('cors');


const port=process.env.PORT || 8000 
app.use(express.json())
app.use(cors())
const saltRounds = 10;

app.get("/", (req, res) => {
    res.send('Todo List App backend by Dheeraj')
});

app.post("/register", async(req, res) => {
    console.log(req.body);
    try{
    console.log(req.body);
        const mel=req.body.email
        const exist=await reg.findOne({email:mel})
        if(exist){
        res.send({status:0, message:'Email already exist...please add different Email'})
       }
       else{
    if (req.body.pass==req.body.cmpass){
      const hashpass = await bc.hash(req.body.pass, saltRounds);
      const data = await reg.create({
        fname:req.body.fname,
        lname:req.body.lname,
        email:req.body.email,
        gender:req.body.gender,
        // phone:req.body.phone,
        pass:hashpass ,
        
      });
   
       res.send({status:1, message:'registerd successfully'});
    // }
      }
    else{
        res.send({status:0, message:'password does not match'})
    }
       }}
       catch(error){
        res.send({status:0,message:"please fullfill the detail criteria"}) 
       }
    } )
   

app.post('/login',async(req,res)=>{
    try{
    console.log(req.body);
    const email=req.body.email 
    const mal=await reg.findOne({email:email})
    if(mal){
    const cmp = await bc.compare(req.body.pass, mal.pass);
    if (cmp) {
        const token =createToken(mal.id);
            res.send({status: 1, message: 'login successfull', token: token, user_details: mal});
            const tData = await auth.create({
                user_id:mal.id,
                token:token
            
            })
             console.log(tdata)
            
            res.send(tData)
        }else{
            res.send({status:0,message:'invalid password'})
        }
    }
    else{
        res.send({status:0, message:"user is not valid"})
    }}
    catch(error){
        // res.send({status:0,message:"details are not correct"})
    }
    }
)
app.delete('/logout',async(req,res)=>{
    try{
    const id = req.body.user_id;
    const did=await auth.deleteOne({user_id: id}); 
    res.send({status: 1, message: "user logout successfully!!"});
    }
    catch(error){
         res.send({status:0,message:"details are not correct"})
    }
})
app.patch('/changepass',async(req,res)=>{
    try{
    const email=req.body.email
    const mal=await reg.findOne({email:email})
    if (mal){
        const cmp = await bc.compare(req.body.pass, mal.pass);
       if (cmp) {
           const hashpass = await bc.hash(req.body.changepass, saltRounds);
            const cngpass=await reg.updateOne({'pass':mal.pass},{'pass':hashpass})
            
            res.send({status:1, message:"password changed successfully"})
         } 
       else
         {
        res.send({status:0, message:'password does not match'})

         }
        }
     else{
         res.send({status:0, message:'user is not valid'})

     }
    }
    catch(error)
{
    res.send({status:0,message:"details are not correct"})
}
       


})
maxAge=3*24*60*60
const createToken=(id)=>{
    return jwt.sign({id},'this is the token generation thing',{
        expiresIn:maxAge
    })
}


app.post('/todoadd',async(req,res)=>{
    try{
    console.log(req.body)
    const tddata = await detail.create({
        userid:req.body.userid,
        title:req.body.title,
        description:req.body.description
    })
    res.send({status: 1, message: "todo added successfully!!"});
    }
    catch(error){
        console.log(error);
        res.send({status:0, message:'something went wrong'});
    }
})
app.post('/todoshow',async(req,res)=>{
    try{
    const userid = req.body.userid;
    console.log(req.body);
    const uid=await detail.find({userid:userid});
    res.send(uid)}
    catch(error){
        console.log(error);
            res.send({status:0, message:'something went wrong'})
    }
})
app.delete('/deletetodo',async(req,res)=>{
    try{
    const id = req.body.todoid;
    const did=await detail.findByIdAndRemove(id); 
    res.send({status: 1, message: "todo deleted successfully!!"});
    }
    catch(error){
         res.send({status:0,message:"something went wrong...!!! please try again"})
    }
})
    
app.listen(port,()=>{
    console.log(`respose at port ${port}`)
    
})
