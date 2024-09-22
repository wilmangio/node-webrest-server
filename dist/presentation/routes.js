"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./todos/controller");
const routes_1 = require("./todos/routes");
class AppRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const todoController = new controller_1.TodosController();
        router.use('/api/todos', routes_1.TodosRoutes.routes);
        return router;
    }
}
exports.AppRoutes = AppRoutes;
