const expect=require('expect');
const request=require('supertest');
const {app}=require('./../server.js');
const {todo}=require('./../models/todo.js');
const {ObjectID} =require('mongodb');
const todos=[{
  _id:new ObjectID(),
  text:'first task'
},{
  _id:new ObjectID(),
  text:'second task',
  completed:true,
  completedAt:123456
}];

beforeEach((done)=>{
    todo.remove({}).then(()=>{
    return todo.insertMany(todos);
  }).then(()=>{done()});
});

describe('POST /todos',()=>{
  it('should create a new todo',(done)=>{
    var text='first task';
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
          expect(todos.length).toBe(3);
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
          expect(todos.length).toBe(2);
          // expect(todos[0].text).toBe(text);
          done();

        }).catch((e)=>done(e));

      });
  });


});




describe('GET /todos',()=>{

it('should get todos data',(done)=>{
  var text='';
  request(app)
    .get('/todos')
    .expect(200)
    .expect((res)=>{
      expect(res.body.todos.length).toBe(2);
    })
    .end(done)
});

});

describe('GET /todos/id',()=>{
it('should get specific todos data',(done)=>{
  var text=todos[0]._id.toHexString();

  request(app)
    .get(`/todos/${text}`)
    .expect(200)
    .expect((res)=>{
      // console.log(res);
      expect(res.body.todos.text).toBe(todos[0].text);
    })
    .end(done);
});

it('should get no specific todos data for invalid id',(done)=>{
  var text=123;

  request(app)
    .get(`/todos/${text}`)
    .expect(400)
    .expect((res)=>{
      // console.log(res);
      expect(res.body.message).toBe('id invalid');
    })
    .end(done);
});

it('should get specific todos data',(done)=>{
  var text=new ObjectID();
  request(app)
    .get(`/todos/${text}`)
    .expect(400)
    .expect((res)=>{
      // console.log(res);
      expect(res.body.message).toBe('id not found');
    })
    .end(done);
});

});



describe('DELETE /todos',()=>{

it('should delete todos data',(done)=>{
  var text=todos[0]._id;
  request(app)
    .delete(`/todos/${text}`)
    .expect(200)
    .expect((res)=>{
      // console.log(res);
      expect(res.body.todo._id).toBe(todos[0]._id.toHexString());
      // expect(res.body.todo.count).toBe(1);
    })
    .end((err,res)=>{
      if(err){
        return done(err);
      };

      request(app)
        .delete(`/todos/${text}`)
        .expect(400)
        .expect((res)=>{
          // console.log(res);
          expect(res.body.message).toBe('id not found');
        })
        .end(done);
    });

});

it('should get no specific todos data for invalid id',(done)=>{
  var text=123;

  request(app)
    .delete(`/todos/${text}`)
    .expect(400)
    .expect((res)=>{
      // console.log(res);
      expect(res.body.message).toBe('id invalid');
    })
    .end(done)
});

it('should get specific todos data',(done)=>{
  var text=new ObjectID();
  request(app)
    .get(`/todos/${text}`)
    .expect(400)
    .expect((res)=>{
      // console.log(res);
      expect(res.body.message).toBe('id not found');
    })
    .end(done);
});

});












describe('PATCH /todos',()=>{

it('should update todos data',(done)=>{
  var text=todos[0]._id;
  request(app)
    .patch(`/todos/${text}`)
    .send({
      text:'First task updated',
      completed:true
    })
    .expect(200)
    .expect((res)=>{
      // console.log(res);
      expect(res.body.todo.text).toBe('First task updated');
      expect(res.body.todo.completed).toBe(true);
      expect(res.body.todo.completedAt).toBeGreaterThan(0);
      // expect(res.body.todo.count).toBe(1);
    })
    .end(done);

});

it('should toggle todos data',(done)=>{
  var text=todos[1]._id;
  request(app)
    .patch(`/todos/${text}`)
    .send({
      text:'First task re updated',
      completed:false
    })
    .expect(200)
    .expect((res)=>{
      // console.log(res);
      expect(res.body.todo.text).toBe('First task re updated');
      expect(res.body.todo.completed).toBe(false);
      expect(res.body.todo.completedAt).toBe(null);
      // expect(res.body.todo.count).toBe(1);
    })
    .end(done)

});

});
