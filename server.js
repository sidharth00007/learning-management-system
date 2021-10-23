const express = require('express')
const path = require('path')
const app = express()
const port =process.env.PORT ||  5000;
const pathname=path.join(__dirname + "/public")
const mongoose= require('mongoose')
MongoDbURL="mongodb+srv://sid:02062002@cluster0.lvafj.mongodb.net/lms-stige?retryWrites=true&w=majority";
mongoose.connect(MongoDbURL);
var db=mongoose.connection;
let loged=false;
db.on('error',console.error.bind(console,"Connection error : "))
db.once('open' , function (){
    console.log(" ")
});
const kittySchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    img:String
  });
const kittySchema1 = new mongoose.Schema({
    task:String,
    completed:Boolean,
    duedate:String
  });
  
  app.use(express.static(pathname))
  app.use(express.json())
  app.use(express.urlencoded({extended:false}))
  // app.use('/api/use', require( "./api"))
  
  app.get('/', (req, res) => {
    res.sendFile(path.join(pathname + "/index.html"))
    res.status(500);
})
app.get('/login', (req, res) => {
  res.sendFile(path.join(pathname + "/login.html"))
  res.status(500);
})
app.post('/signup', (req, res) => {
  res.sendFile(path.join(pathname + "/tasks.html"))
  console.log(req.body.name)
  console.log(req.body.email)
  console.log(req.body.password)
  console.log(req.body.pic)
  
  const Kitten = mongoose.model('dd', kittySchema);
  const fluffy = new Kitten({ name : req.body.name , email : req.body.email , password : req.body.password , img : req.body.pic});
  fluffy.save();
  console.log(fluffy)
  res.status(500);
})
app.get('/task', (req, res) => {
  res.send("Entry Restricted Please login")
  res.status(500);
})
app.get('/logout', (req, res) => {
  res.sendFile(path.join(pathname + "/login.html"))
  res.status(500);
})

app.get('/task/profile',(req,res)=>{

})

app.post('/log', (req,res)=>{
  const na=req.body.email;
  const Kitten = mongoose.model('dd', kittySchema);
  Kitten.find({email:na},(err,reso)=>{
    if (reso[0].password===req.body.password){
      res.sendFile(path.join(pathname + "/tasks.html"))
      console.log(reso);
      loged=true;
      
    }
    else {
      res.sendFile(path.join(pathname + "/login.html"))
    }
    
  })
})

app.get('/api/get' ,async (req,res)=>{
  const Kitten = mongoose.model('data', kittySchema1);
  const a= await Kitten.find();
  res.send(a);

})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
