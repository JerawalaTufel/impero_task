const routes = require('express').Router();
const {register , login , authenticate} = require('../controllers/authController');
const {getAllTasks , addTask , updateTask , deleteTask ,searchTasks, changeTaskStatus} = require('../controllers/taskController');

 
routes.post('/register',  register);
routes.post('/login',  login);


routes.use(authenticate);

routes.get('/tasks', getAllTasks);
routes.post('/tasks', addTask);
routes.put('/tasks/:id', updateTask);
routes.delete('/tasks/:id', deleteTask);
routes.get('/search', searchTasks);
routes.post('/changeStatus' , changeTaskStatus)


module.exports = routes;