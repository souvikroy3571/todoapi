const {ObjectID} =require('mongodb');
const {mongoose}=require('./../server/db/mongoose.js');
const {todo}=require('./../server/models/todo.js');
const {user}=require('./../server/models/user.js');
var id='5cb1d31953c838d327770d58';
var userid='5cb1923b66ee53f70d9d1f6a';
if(!ObjectID.isValid(id)){
  console.log('Not valid todo ID');
  };
if(!ObjectID.isValid(userid)){
    console.log('Not valid user ID');
  };

// todo.find({
//   _id:id
// }).then((todos)=>{
//   if(!todos.length){
//     return console.log('id not found');
//   };
//   console.log('Todos ',todos);
// });
//
// todo.findOne({
//   _id:id
// }).then((todo)=>{
//   if(!todo){
//     return console.log('id not found');
//   };
//   console.log('Todo ',todo);
// });

// todo.findById(id).then((todo)=>{
//   if(!todo){
//     return console.log('id not found');
//   };
//   console.log('Todo by id ',todo);
// }).catch((e)=>{
//   console.log(e);
// });



user.find({
  _id:userid
}).then((users)=>{
  if(!users.length){
    return console.log('user id not found');
  };
  console.log('Users ',users);
});

user.findOne({
  _id:userid
}).then((user)=>{
  if(!user){
    return console.log('user id not found');
  };
  console.log('User ',user);
});

user.findById(userid).then((user)=>{
  if(!user){
    return console.log('user id not found');
  };
  console.log('User by id ',user);
}).catch((e)=>{
  console.log(e);
});
