"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
class TodosRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const todoController = new controller_1.TodosController();
        router.get('/', todoController.getTodos);
        router.get('/:id', todoController.getTodosById);
        router.post('/', todoController.createTodo);
        router.put('/:id', todoController.updateTodo);
        router.delete('/:id', todoController.deleteTodo);
        return router;
    }
}
exports.TodosRoutes = TodosRoutes;
