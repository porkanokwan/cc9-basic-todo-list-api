const { v4: uuidv4 } = require('uuid');
const { readFile, writeFile } = require('fs/promises');

const findTodos = async () => {
  const result = await readFile('dbs/todo.json');
  return JSON.parse(result);
};

const saveTodos = async todos => {
  await writeFile('dbs/todo.json', JSON.stringify(todos));
};

exports.getTodos = async (req, res, next) => {
  try {
    const todos = await findTodos();
    res.status(200).json({ todos });
  } catch (err) {
    next(err);
  }
};

exports.getTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todos = await findTodos();
    const todo = todos.find(todo => todo.id === id);
    if (!todo)
      return res.status(400).json({ message: 'todo with this id not found' });
    res.status(200).json({ todo });
  } catch (err) {
    next(err);
  }
};

exports.createTodo = async (req, res, next) => {
  try {
    const { title, completed } = req.body;

    if (!title || !title.trim())
      return res.status(400).json({ message: 'title is required' });
    if (typeof completed !== 'boolean')
      return res
        .status(400)
        .json({ message: 'completed is required and must be a boolean' });

    const todos = await findTodos();
    const todo = { id: uuidv4(), title, completed: !!completed };
    todos.unshift(todo);
    await saveTodos(todos);
    res.status(201).json({ todo });
  } catch (err) {
    next(err);
  }
};

exports.updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    if (!title || !title.trim())
      return res.status(400).json({ message: 'title is required' });
    if (typeof completed !== 'boolean')
      return res
        .status(400)
        .json({ message: 'completed is required and must be a boolean' });

    const todos = await findTodos();
    const foundIdx = todos.findIndex(todo => todo.id === id);
    if (foundIdx === -1)
      return res.status(400).json({ message: 'todo with this id not found' });
    const todo = { ...todos[foundIdx], title, completed };
    todos[foundIdx] = todo;
    await saveTodos(todos);
    res.status(200).json({ todo });
  } catch (err) {
    next(err);
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todos = await findTodos();
    const foundIdx = todos.findIndex(todo => todo.id === id);
    if (foundIdx === -1)
      return res.status(400).json({ message: 'todo with this id not found' });
    todos.splice(foundIdx, 1);
    await saveTodos(todos);
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
