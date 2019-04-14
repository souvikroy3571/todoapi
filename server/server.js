
require('./config/config.js');
// console.log("env*******",env);
const _=require('lodash');
var express=require('express');
var bodyParser=require('body-parser');
const {ObjectID} =require('mongodb');

var {mongoose}=require('./db/mongoose.js');
var {user}=require('./models/user.js');
var {todo}=require('./models/todo.js');

const port=process.env.PORT||3000;
var app=express();
app.use(bodyParser.json());
app.post('/todos',(req,res)=>{
  var todo1=new todo({
    text:req.body.text
  });
  todo1.save().then((doc)=>{
    res.send(doc);
  }, (e)=>{
    res.status(400).send(e);
  })
});

app.get('/todos',(req,res)=>{
  todo.find().then((todos)=>{
    res.send({
      todos,
    });
  },(e)=>{
    res.status(400).send(e);
  });
});

app.get('/todos/:id',(req,res)=>{
  var id =  req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(400).send({
      message:'id invalid'
    });
    };
  todo.findById(id).then((todos)=>{
    if(!todos){
      return res.status(400).send({
        message:'id not found'
      });
    };


    res.status(200).send({
      todos,
    });
  },(e)=>{
    res.status(400).send(e);
});
});

app.delete('/todos/:id',(req,res)=>{
  var id =  req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(400).send({
      message:'id invalid'
    });
    };
  todo.findByIdAndRemove(id).then((todo)=>{
    if(!todo){
      return res.status(400).send({
        message:'id not found'
      });
    };


    res.status(200).send({
      todo,
    });
  },(e)=>{
    res.status(400).send(e);
});
});


app.patch('/todos/:id',(req,res)=>{
  var id =  req.params.id;
  var body=_.pick(req.body,['text','completed']);
  if(!ObjectID.isValid(id)){
    return res.status(400).send({
      message:'id invalid'
    });
  };

  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt=new Date().getTime();
  } else{
    body.completed=false;
    body.completedAt=null
  };
  todo.findByIdAndUpdate(id,{
    $set:body
    },{
      new:true
    }
  ).then((todo)=>{
    if(!todo){
      return res.status(400).send({
        message:'id not found'
      });
    };
      res.status(200).send({todo});

  }).catch((e)=>{
    res.status(400).send();
  });


});

app.listen(port,()=>{
  console.log(`Started on port ${port}`);
});

module.exports={app};
