var express=require('express');
var bodyParser=require('body-parser');

var {mongoose}=require('./db/mongoose.js');
var {user}=require('./models/user.js');
var {todo}=require('./models/todo.js');


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


// var todo1=new todo({
//   text:'    ',
//   completed:false,
//   completedAt:1555085969
// });

// todo1.save().then((doc)=>{
//   console.log('Saved to ',doc)
// }, (e)=>{
//   console.log('Unable to save todo ',e)
// })

// var user1=new user({
//   email:'  souvikroy3571@gmai.com  ',
//   password:'karizma',
// });
//
// user1.save().then((doc)=>{
//   console.log('Saved to ',doc)
// }, (e)=>{
//   console.log('Unable to save todo ',e)
// });

app.listen(3000,()=>{
  console.log('Started on port 3000');
});

module.exports={app};
