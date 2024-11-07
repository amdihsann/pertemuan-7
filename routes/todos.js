const express = require('express');
const router = express.Router();

var todos = [];

// Get All Todos
router.get('/', (req, res) => {
    res.json(todos);
});

// Get Single Todo
// Example Request Params
// GET => localhost:3000/api/todos/1
router.get('/:id', (req, res) =>{
    const item = todos.find(i => i.id === parseInt(req.params.id));
    if(!item){
        return res.status(404).send('Item not found');
    }

    return res.json(item);
});


// Add new Todo
// Example Request Body
// { 'title': 'Lari Pagi', 'description': 'Lari pagi ke GBK'}
router.post('/', (req,res) =>{
    const newTodo = {
        id: todos.length + 1,
        title: req.body.title,
        description: req.body.description,
        todoCheck: false
    }

    todos.push(newTodo);
    res.status(201).json(newTodo);
})
module.exports = router;