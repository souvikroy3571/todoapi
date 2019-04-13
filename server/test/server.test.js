const expect=require('expect');
const request=require('supertest');
const {app}=require('./../server.js');
const {todo}=require('./../models/todo.js');
beforeEach((done)=>{
    todo.remove({}).then(()=>done());
});

describe('POST /todos',()=>{
  it('should create a new todo',(done)=>{
    var text='Test todo text';
    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res)=>{
        expect(res.body.text).toBe(text)
      })
      .end((err,res)=>{
        if(err){
          return done(err);
        };
        todo.find().then((todos)=>{
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();

        }).catch((e)=>done(e));

      });
  });

  it('should not create a new todo for bad data',(done)=>{
    var text='';
    request(app)
      .post('/todos')
      .send({text})
      .expect(400)
      .end((err,res)=>{
        if(err){
          return done(err);
        };
        todo.find().then((todos)=>{
          expect(todos.length).toBe(0);
          // expect(todos[0].text).toBe(text);
          done();

        }).catch((e)=>done(e));

      });
  });
});
