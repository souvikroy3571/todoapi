// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');
// var obj=new ObjectID();
// console.log(obj);
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
    return console.log('Unable to connect to MongoDB server');
  };
  console.log('Connected to MongoDB server');

//ObjectId("5caf4b9f9bce761a9423daf1")

db.collection('Users').findOneAndUpdate({
  _id: new ObjectID('5caf4b9f9bce761a9423daf1')
},{
  $set:{
    name:'Abhik Roy'
  },$inc:{
    age:-7
  }
},{
  returnOriginal:false
}).then((result)=>{
  console.log(result);

},(err)=>{
  console.log('Unable to delete todos ',err);
});



  db.close();
});
