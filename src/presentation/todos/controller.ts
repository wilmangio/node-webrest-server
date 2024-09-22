import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";

export class TodosController{

    //* DI
    constructor(){}

    public getTodos = async (req:Request, res:Response) =>{
        const todos = await prisma.todo.findMany();
        return res.json( todos );
    };

    public getTodosById = async (req:Request, res:Response) =>{
        const id = +req.params.id;
        if( isNaN( id) ) return res.status(400).json( {error: `ID argument is not number`} );

        const todo = await prisma.todo.findFirst({
            where: { id }
        });

        (todo)
        ? res.json( todo )
        : res.status(404).json( {error: `TODO with id ${ id } not found`} );
    };

    public createTodo = async (req:Request, res:Response) =>{
        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if(error) return res.status(400).json({ error });

        const todoAdd = await prisma.todo.create({
            data: createTodoDto!
        });

        res.json( todoAdd );
    } 

    public updateTodo = async (req:Request, res:Response)=>{
        const id = +req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id});
        if(error) return res.status(400).json({ error });

        const todo = await prisma.todo.findFirst({
            where: { id }
        });
        
    
        if( !todo ) return res.status(404).json( {error: `No se encutra una referencia del objeto`} );

        //PRISMA consultar el archivo de barril, la clase y la funcion
        const updateTodo = await prisma.todo.update({
            where:{ id },
            data: updateTodoDto!.values
        });
        
        res.json( updateTodo );

    }

    public deleteTodo = async (req:Request, res:Response)=>{
        const id = +req.params.id;
        const todo = await prisma.todo.findFirst({
            where: { id }
        });

        if( !todo ) return res.status(404).json( {error: `No se encuentra una referencia del objeto`} );
        const deleteTodo = await prisma.todo.delete({
            where: { id }
        });

        ( deleteTodo )
            ? res.json( deleteTodo )
            :  res.status(400).json({error: `Todo no encontrado`})
        res.json( {todo, deleteTodo} );
    }
    
}