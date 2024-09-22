"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosController = void 0;
const postgres_1 = require("../../data/postgres");
const dtos_1 = require("../../domain/dtos");
class TodosController {
    //* DI
    constructor() {
        this.getTodos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const todos = yield postgres_1.prisma.todo.findMany();
            return res.json(todos);
        });
        this.getTodosById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = +req.params.id;
            if (isNaN(id))
                return res.status(400).json({ error: `ID argument is not number` });
            const todo = yield postgres_1.prisma.todo.findFirst({
                where: { id }
            });
            (todo)
                ? res.json(todo)
                : res.status(404).json({ error: `TODO with id ${id} not found` });
        });
        this.createTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const [error, createTodoDto] = dtos_1.CreateTodoDto.create(req.body);
            if (error)
                return res.status(400).json({ error });
            const todoAdd = yield postgres_1.prisma.todo.create({
                data: createTodoDto
            });
            res.json(todoAdd);
        });
        this.updateTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = +req.params.id;
            const [error, updateTodoDto] = dtos_1.UpdateTodoDto.create(Object.assign(Object.assign({}, req.body), { id }));
            if (error)
                return res.status(400).json({ error });
            const todo = yield postgres_1.prisma.todo.findFirst({
                where: { id }
            });
            if (!todo)
                return res.status(404).json({ error: `No se encutra una referencia del objeto` });
            //PRISMA consultar el archivo de barril, la clase y la funcion
            const updateTodo = yield postgres_1.prisma.todo.update({
                where: { id },
                data: updateTodoDto.values
            });
            res.json(updateTodo);
        });
        this.deleteTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = +req.params.id;
            const todo = yield postgres_1.prisma.todo.findFirst({
                where: { id }
            });
            if (!todo)
                return res.status(404).json({ error: `No se encuentra una referencia del objeto` });
            const deleteTodo = yield postgres_1.prisma.todo.delete({
                where: { id }
            });
            (deleteTodo)
                ? res.json(deleteTodo)
                : res.status(400).json({ error: `Todo no encontrado` });
            res.json({ todo, deleteTodo });
        });
    }
}
exports.TodosController = TodosController;
