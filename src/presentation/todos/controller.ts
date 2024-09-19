import { Request, Response } from "express";

const todos = [
    { id:1, text:'Buy milk', createdAt: new Date()},
    { id:2, text:'Buy bread', createdAt: null},
    { id:3, text:'Buy butter', createdAt: new Date()}
];

export class TodosController{

    //* DI
    constructor(){}

    public getTodos = (req:Request, res:Response) =>{
        return res.json( todos );
    };

    public getTodosById = (req:Request, res:Response) =>{
        const id = +req.params.id;
        if( isNaN( id) ) return res.status(400).json( {error: `ID argument is not number`} );
        const todo = todos.find(todos => todos.id === id);

        (todo)
        ? res.json( todo )
        : res.status(404).json( {error: `TODO with id ${ id } not found`} );
    };

    public createTodo = (req:Request, res:Response) =>{
        const {text } = req.body;
        if( !text ) return res.status(400).json({error:"Error no esta el texto"});
        const newTodo = {
            id: todos.length + 1,
            text: text,
            createdAt: null,
        };
        todos.push( newTodo );
        res.json( newTodo );
    } 

    public updateTodo = (req:Request, res:Response)=>{
        const id = +req.params.id;
        if( isNaN( id) ) return res.status(400).json( {error: `ID argument is not number`} );
        const todo = todos.find(todos => todos.id === id);
        if( !todo ) return res.status(404).json( {error: `No se encutra una referencia del objeto`} );
        const { text, createdAt } = req.body;
        //if( !text ) return res.status(400).json({error:"Error no esta el texto"});

        todo.text = text || todo.text;
        ( createdAt === 'null')
            ? todo.createdAt = null
            : todo.createdAt = new Date( createdAt || todo.createdAt );

        res.json( todo );

    }

    public deleteTodo = (req:Request, res:Response)=>{
        const id = +req.params.id;
        if( isNaN( id) ) return res.status(400).json( {error: `ID argument is not number`} );
        const todo = todos.find(todos => todos.id === id);
        if( !todo ) return res.status(404).json( {error: `No se encuentra una referencia del objeto`} );

        todos.splice( todos.indexOf(todo), 1);
        res.json( todo );
    }
    
}