const express = require("express");
const router = express.Router();

const path = require("path");
// const logger = require('./middlewares/logger');
const fs = require("fs/promises");

const TodoModel = require("./TodoModel");

const todo = require("../todo.json");
const { db } = require("./TodoModel");

// router.get("/", async (req, res) => {
//   const todos = await TodoModel.find();
//   res.json(todos);
// });

// get by id
router.get("/:id", async (req, res, next) => {
  const {id} = req.params

  try {
    const todo = await TodoModel.findById(id);
    console.log(req.params);
    res.json(todo);
    
  } catch (error) {
    error.code = "Database_Error";
    next(error);
  }
});

// Filter with status

router.get("/", async (req, res) => {
  const { status } = req.query;

  if (status) {
    
    const todos = await TodoModel.find({status});
    res.json(todos);
  } else {
    const todos = await TodoModel.find();
    res.json(todos);
  }
});

router.post("/", async (req, res, next) => {
  const { title, status } = req.body;

  try {
    const addTodo = await TodoModel.create({ title, status });
    res.json(addTodo);
  } catch (error) {
    error.code = "SERVER+ERROR";
    next(error);
  }
});

//   router.get('/:id', async (req, res) => {
//     const { id } = req.params;
//     const todoFound = todo.find((ele) => {
//       return ele.id == id
//     });
//     console.log(todo);
//     console.log(todoFound);

//     res.json(JSON.stringify(todoFound));
//     //  console.log(todoFound)
//     //  res.json('success');
//   })

//   router.get('/', (req, res) => {
//     const { status } = req.query;

//     if (status) {
//       const todosFiltered = todo.filter((ele) => {
//         return ele.status == status;
//       });
//       console.log(todosFiltered);
//       res.json(JSON.stringify(todosFiltered));
//       console.log("hello");
//     } else {
//       res.json(JSON.stringify(todo));
//     }
//   })

router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { title, status } = req.body;

  try {
    // console.log(id, item);
    await TodoModel.findByIdAndUpdate(id, { title, status });
    res.statusCode = 200;
    res.json({ success: true });
  } catch (error) {
    error.code = "SERVER_ERROR";
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    // console.log(id, item);
    await TodoModel.findByIdAndDelete(id);
    res.statusCode = 200;
    res.json({ success: true });
  } catch (error) {
    error.code = "SERVER_ERROR";
    next(error);
  }
});

//   router.delete('/:id', async (req, res) => {
//     const { id } = req.params
//     let filterdArray = todo.filter((ele) => {
//       return ele.id !== +id;
//     });
//     try {
//       console.log(filterdArray);
//       await fs.writeFile('./todo.json', JSON.stringify(filterdArray, null, 2));
//       res.json({ success: true });
//     } catch (error) {
//       res.send('something went wrong!');
//     }
//   });

module.exports = router;
