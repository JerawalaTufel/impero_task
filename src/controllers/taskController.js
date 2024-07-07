const { Task ,Sequelize } = require('../models');
const { errorResponseWithoutData } = require('../services/Response');
const {taskValidation, updateTaskValidation, changeStatus} = require('../validation/taskValidation');

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { userId: req.userId } });
    return res.status(200).json({
      status : 200,
      message: 'List of  All the Task' ,
      data : tasks
   }); 
  } catch (error) {
      errorResponseWithoutData(res , error.message)
  }
};

exports.addTask = async (req, res) => {
  try {

    const reqParam = req.body;   
    taskValidation(reqParam , res , async (valid) => {
      if(valid){
        const { title, description, priority, dueDate} = reqParam;
        const dueDateConverted = new Date(dueDate);
        const task = await Task.create({ userId: req.userId, title, description, priority, dueDate : dueDateConverted, status: 'in-progress' });
        return res.status(201).json({
           status : 200,
           message: 'Task Created!' ,
           data : task
        });
      }
    })

  } catch (error) {
    errorResponseWithoutData(res , error.message)
  }
};

exports.updateTask = async (req, res) => {
  try {
    const reqParam = req.body;   
    updateTaskValidation(reqParam , res , async (valid) => {
      if (valid) {
        const { id } = req.params;
        const { title, description, priority, dueDate, status } = reqParam;
        const task = await Task.findOne({ where: { id, userId: req.userId } });
        if (!task) return res.status(404).json({ status : 400 , message: 'Task not found' });
        console.log(task.dueDate);
        task.title = title || task.title;
        task.description = description || task.description;
        task.priority = priority || task.priority;
        task.dueDate = dueDate ? new Date(dueDate) :  task.dueDate;
        task.status = status || task.status;
        await task.save();
      
        return res.status(201).json({
          status : 200,
          message: 'Task Updated' ,
          data : task
       });
      }
    })
  } catch (error) {
    errorResponseWithoutData(res , error.message)
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ where: { id, userId: req.userId } });
    if (!task) return res.status(404).json({ status : 400 , message: 'Task not found' });
    await task.destroy();
    res.json({ status : 200, message: 'Task deleted successfully' });

  } catch (error) {

    errorResponseWithoutData(res , error.message)
  }
};

exports.searchTasks = async (req, res) => {
    try {
      const {title , description , dueDate} = req.query;
      const whereClause = {
        userId: req.userId,
        [Sequelize.Op.or]: [
          { title: { [Sequelize.Op.like]: `%${title}%` } },
          { description: { [Sequelize.Op.like]: `%${description}%` } },
        ]
      };
    
      // Add dueDate conditionally
      if (dueDate) {
        whereClause[Sequelize.Op.or].push({
          dueDate: { [Sequelize.Op.like]: `%${dueDate}%` }
        });
      }
    
      // Fetch tasks using the constructed where clause
      const tasks = await Task.findAll({
        where: whereClause
      });
      res.json(tasks);
    } catch (error) {
      errorResponseWithoutData(res , error.message)
    }
  };
  
  exports.changeTaskStatus = async (req, res) => {
    try {
      const reqParam = req.body;   
      changeStatus(reqParam , res , async (valid) => {
        const { status, id } = reqParam;
  
      const task = await Task.findOne({ where: { id, userId: req.userId } });
      if (!task) {
        return res.status(404).json({status : 400, message: 'Task not found' });
      }
  
      task.status = status;
  
      await task.save();
  
      res.status(200).json({ message: 'Task status updated successfully', task });
      })
    
    } catch (error) {
      console.error('Error updating task status:', error);
      errorResponseWithoutData(res , error.message)
    }

  };