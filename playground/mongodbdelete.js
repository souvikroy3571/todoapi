// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');
// var obj=new ObjectID();
// console.log(obj);
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
    return console.log('Unable to connect to MongoDB server');
  };
  console.log('Connected to MongoDB server');
//deletemany
// db.collection('Todos').deleteMany({text:'eat dinner'}).then((result)=>{
//   console.log(result);
//
// },(err)=>{
//   console.log('Unable to delete todos ',err);
// });

//deleteone

// db.collection('Todos').deleteOne({text:'eat dinner'}).then((result)=>{
//   console.log(result);
//
// },(err)=>{
//   console.log('Unable to delete todos ',err);
// });

//findoneanddelete

db.collection('Todos').findOneAndDelete({completed:false}).then((result)=>{
  console.log(result);

},(err)=>{
  console.log('Unable to delete todos ',err);
});

  

  db.close();
});
