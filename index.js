//console.log("hello")
//import area
const express =require('express');
const app=express();
const multer  = require('multer')
const mongoose = require('mongoose');

require('dotenv').config()
async function main(resolve,reject)
{
    return await mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@anjaliserver.1968b.mongodb.net/?retryWrites=true&w=majority`)
}
let po =main(); //CALLING
po.then((d)=>{
   console.log('connected')
   const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
    //  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, Math.floor(Math.random()*100000)+file.originalname)
     // cb(null, Math.floor(Math.random()*100000000)+file.originalname)
    }
  })
const upload = multer({ storage  })
   app.post('/', upload.array('myfile',12),function(req,res){
    //console.log(req.file)
    console.log(req.body.name)
    console.log(req.body.surname)
    console.log(req.body.contact)
    res.status(200).json({
        "msg":"good work",
        "name":req.body.name,
        "surname":req.body.surname,
        "contact":req.body.contact
    })


   const mydata = mongoose.model('mydata',{name:String ,surname:String});
   let d1=new mydata({name:(req.body.name)})
   let po =d1.save()
   let d2=new mydata({surname:(req.body.surname)})
   let po2=d2.save()
   po.then((d)=>{
    console.log('saved')
   }).catch((e)=>{
    console.log('nat save')
   })
}
)}).catch((e)=>{
   console.log('not connected')
})


port=process.env.PORT;
app.listen(port,()=>{
   console.log('app is running on port '+port)
})