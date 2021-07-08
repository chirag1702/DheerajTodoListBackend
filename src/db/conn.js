const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://UserTemp:password123456@cluster0.1sopj.mongodb.net/mysite?retryWrites=true&w=majority',{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false
}).then(()=>{
    console.log('connection is successfull')

}).catch((e)=>{
    console.log('no connection')
})
