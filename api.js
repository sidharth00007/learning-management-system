const express = require('express')
const router =express.Router()
const mongoose= require('mongoose')
mongoose.connect('mongodb://localhost:27017/spark');
var db=mongoose.connection;

db.on('error',console.error.bind(console,"Connection error : "))
db.once('open' , function (){
    console.log(" ")
});
const kittySchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
  });

  router.post('/', (req, res) => {
    console.log(req.body.name)
    const Kitten = mongoose.model('user', kittySchema);
    const fluffy = new Kitten({ name : req.body.name , email : req.body.email , password : req.body.password});
    fluffy.save();
    // console.log(fluffy)
  res.send('World!')
  // res.redirect('/')
})



module.exports=router;