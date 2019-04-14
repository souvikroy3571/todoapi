const {ObjectID} =require('mongodb');
const {mongoose}=require('./../server/db/mongoose.js');
const {todo}=require('./../server/models/todo.js');
const {user}=require('./../server/models/user.js');

// todo.remove({}).then((result)=>{
//   console.log(result);
// });
todo.findOneAndRemove({_id:'5cb2537969e5b613b1e68115'}).then((result)=>{
  console.log(result);
});
todo.findByIdAndRemove('5cb2537969e5b613b1e68115').then((todo)=>{
  console.log(todo);
});
