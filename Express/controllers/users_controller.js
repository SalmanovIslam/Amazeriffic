var User = require("../models/user.js"), 
    ToDo = require("../models/todo.js"),
	UsersController = {},
	mongoose = require("mongoose");
 
UsersController.index = function(req, res) {
};

// Отобразить пользователя 
UsersController.show = function(req, res) {

};

// Создать нового пользователя 
UsersController.create = function(req, res) {

};

// Обновить существующего пользователя 
UsersController.update = function (req, res) { 
	console.log("Вызвано действие: обновить пользователя");
};

// Удалить существующего пользователя 
UsersController.destroy = function (req, res) { 
	console.log("Вызвано действие: удалить пользователя");
}

module.exports = UsersController;