const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");

router.get("/project", mainController.showProject);
router.get("/project/:id", mainController.editProject);
router.post("/task/add/:id", mainController.addTask);
router.post("/project/create", mainController.createProject);
router.get("/tasks/:taskID/delete/:id", mainController.deleteTask);
router.get("/", mainController.index);

module.exports = router;
