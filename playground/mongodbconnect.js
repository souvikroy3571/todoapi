// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');
var obj=new ObjectID();
console.log(obj);
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
    return console.log('Unable to connect to MongoDB server');
  };
  console.log('Connected to MongoDB server');
  // db.collection('Todos').insertOne({
  //   text:'Complete node js tutorials',
  //   completed:'false'
  // },(err,result)=>{
  //   if(err){
  //     return console.log('Unable to insert todo ',err);
  //   };
  //   console.log(JSON.stringify(result.ops,undefined,2));
  //
  // });

  // db.collection('Users').insertOne({
  //   name:'Souvik Roy',
  //   category:'Stud',
  //   age:28,
  //   place:'nagpur'
  //
  // },(err,result)=>{
  //   if(err){
  //     return console.log('Unable to insert todo ',err);
  //   };
  //   console.log(JSON.stringify(result.ops,undefined,2));
  //
  // });

  db.close();
});
