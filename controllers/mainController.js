const path = require("path");
const fs = require("fs");

const filePath = path.resolve(__dirname, "../db");
const templates = JSON.parse(fs.readFileSync(`${filePath}/templates.json`));
const allTasks = JSON.parse(fs.readFileSync(`${filePath}/tasks.json`));

controller = {
  index: (req, res) => {
    const projects = JSON.parse(fs.readFileSync(`${filePath}/projects.json`));
    res.render("index", { templates, projects });
  },
  editProject: (req, res) => {
    const projects = JSON.parse(fs.readFileSync(`${filePath}/projects.json`));
    const project = projects.find((project) => project.id == req.params.id);
    const projectTempate = templates.find(
      (template) => template.id == project.template
    );
    const projectTasksList = [...project.tasks, ...projectTempate.tasks];
    const projectTasks = projectTasksList.map((projectTask) => {
      return allTasks.find((task) => task.id == projectTask);
    });
    res.render("editProjects", { projectTasks, project, allTasks });
  },
  showProject: (req, res) => {
    const projects = JSON.parse(fs.readFileSync(`${filePath}/projects.json`));
    const project = projects.find((project) => project.id == req.query.project);
    const projectTempate = templates.find(
      (template) => template.id == project.template
    );
    const projectTasksList = [...project.tasks, ...projectTempate.tasks];
    const projectTasks = projectTasksList.map((projectTask) => {
      return allTasks.find((task) => task.id == projectTask);
    });
    res.render("editProjects", { projectTasks, project, allTasks });
  },
  createProject: (req, res) => {
    const projects = JSON.parse(fs.readFileSync(`${filePath}/projects.json`));
    console.log(projects);
    const lastOfProjects = projects.pop();
    const newProject = {
      id: lastOfProjects.id + 1,
      name: req.body.name,
      template: req.body.template,
      tasks: [],
    };
    console.log(projects);
    projects.push(lastOfProjects);
    projects.push(newProject);
    console.log(projects);
    fs.writeFileSync(
      `${filePath}/projects.json`,
      JSON.stringify(projects, null, 2)
    );
    res.redirect("/");
  },
  addTask: (req, res) => {
    const projects = JSON.parse(fs.readFileSync(`${filePath}/projects.json`));
    const project = projects.find((project) => project.id == req.params.id);
    project.tasks.push(req.body.taskToAdd);
    fs.writeFileSync(
      `${filePath}/projects.json`,
      JSON.stringify(projects, null, 2)
    );
    res.redirect("/project/" + project.id);
  },
  deleteTask: (req, res) => {
    const projects = JSON.parse(fs.readFileSync(`${filePath}/projects.json`));
    const project = projects.find((project) => project.id == req.params.id);
    const taskToDelete = project.tasks.indexOf(req.params.taskID);
    project.tasks.splice(taskToDelete, 1);
    fs.writeFileSync(
      `${filePath}/projects.json`,
      JSON.stringify(projects, null, 2)
    );
    res.redirect("/project/" + project.id);
  },
};
module.exports = controller;
