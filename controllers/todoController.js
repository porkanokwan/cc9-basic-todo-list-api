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
    if (!todo) return res.status(400).json({ message: 'todo with this id not found' });
    res.status(200).json({ todo });
  } catch (err) {
    next(err);
  }
};

exports.createTodo = async (req, res, next) => {
  try {
    const { name, status } = req.body;

    if (!name || !name.trim()) return res.status(400).json({ message: 'name is required' });
    if (typeof status !== 'boolean')
      return res.status(400).json({ message: 'status is required and must be a boolean' });

    const todos = await findTodos();
    const todo = { id: uuidv4(), name, status: !!status };
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
    const { name, status } = req.body;

    if (!name || !name.trim()) return res.status(400).json({ message: 'name is required' });
    if (typeof status !== 'boolean')
      return res.status(400).json({ message: 'status is required and must be a boolean' });

    const todos = await findTodos();
    const foundIdx = todos.findIndex(todo => todo.id === id);
    if (foundIdx === -1) return res.status(400).json({ message: 'todo with this id not found' });
    const todo = { ...todos[foundIdx], name, status };
    todos[foundIdx] = todo;
    await saveTodos(todos);
    res.status(200).json();
  } catch (err) {
    next(err);
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todos = await findTodos();
    const foundIdx = todos.findIndex(todo => todo.id === id);
    if (foundIdx === -1) return res.status(400).json({ message: 'todo with this id not found' });
    todos.splice(foundIdx, 1);
    await saveTodos(todos);
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
