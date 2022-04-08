const userController = require('../server/controllers/user.controller');
const projectController=require('../server/controllers/project.controller');
const taskController = require('../server/controllers/task.controller');

module.exports = function(app){
    // app.get('/api', AuthorController.index);
    app.post('/user/signup', userController.signup);
    app.post('/user/login', userController.login);
    app.post('/user/isUserAuth', userController.verifyJWT ,userController.isUserAuth);
    app.post('/user/logout', userController.verifyJWT, userController.logoff);
    //  app.post('/task/createTask', userController.verifyJWT, taskController.createTask);
    //  app.get('/task/viewTasks', userController.verifyJWT, taskController.viewTasks);
    //app.post('/task/addTeamateToTask', userController.verifyJWT, taskController.addTeamate);

    app.get("/api/projects",userController.verifyJWT, projectController.allProjects)
    app.get("/api/projects/:id",userController.verifyJWT, projectController.oneProject)
    app.post("/api/projects",userController.verifyJWT, projectController.createProject)
    app.put("/api/projects/:id",userController.verifyJWT, projectController.editProject)
    app.delete("/api/projects/:id",userController.verifyJWT, projectController.deleteProject)

    // all routes for comments
    app.get("/api/projects/:projectId/tasks", userController.verifyJWT, projectController.getAllTasks)
    app.get("/api/tasks/:projectId", userController.verifyJWT, taskController.tasksOfOneProject)
    app.post("/api/tasks/:projectId", userController.verifyJWT, taskController.addTask2)
    app.get("/api/tasks", userController.verifyJWT, taskController.allTasks)
    app.put("/api/task/update/:id", userController.verifyJWT, taskController.editTask)
    app.get("/api/task/:id", userController.verifyJWT, taskController.oneTask);
    app.delete("/api/task/:id", userController.verifyJWT, taskController.deleteTask);
}
