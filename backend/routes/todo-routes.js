const express = require('express');
const router = express.Router();
const Todo = require('../models/todo-model');

//GET all the todos

router.get('/', (req, res, next) => {
    Todo.find()
      .then(allTheTodos => {
        res.json(allTheTodos);
      })
      .catch(err => {
        res.json(err);
      });
  });

//GET a specific todo

  router.get('/:id', (req, res, next) => {
    let id = req.params.id;
    Todo.findById(id, function(err, todo) {
        res.json(todo);
    });
});

  // POST route => to create a new todo

  router.post('/add', (req, res, next) => {    
      console.log("req.body======>", req.body)
    let todo = new Todo(req.body);
    todo.save()
        .then(todo => {
            res.status(200).json({'todo': 'todo added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
});
// router.post('/add', (req, res, next) => {    
//     console.log("req.body =========================>", req.body)
  
//       Todo.create({
//         description: req.body.description,
//         responsible: req.body.responsible,
//         priority: req.body.priority,
//         completed: req.body.completed,
//       })
//         .then(newTodo => {
//           res.json(newTodo); 
//         })
//         .catch(err => {
//           res.json(err);
//         });
//     });


// POST route => update a todo

router.post('/update/:id', (req, res, next) => {    
    Todo.findById(req.params.id, function(err, todo) {
        if (!todo)
            res.status(404).send("data is not found");
        else
            todo.todo_description = req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;

            todo.save().then(todo => {
                res.json('Todo updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

module.exports = router;
