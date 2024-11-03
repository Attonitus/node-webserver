import { Request, Response } from "express";

interface ITodo{
    id: number,
    text: string,
    completedAt: Date | null
}


let todos: Array<ITodo> = [
    {id: 1, text: 'Buy Milk', completedAt: new Date()},
    {id: 2, text: 'Buy Bread', completedAt: null },
    {id: 3, text: 'Buy Butter', completedAt: new Date()},
];

export class TodoController{

    constructor(){}

    public getTodos = (req : Request,res: Response) => {
        res.json(todos);
    };

    public getTodoById = ( req: Request, res: Response) => {
        const id = +req.params.id;
        if(isNaN(id)){
            res.status(404).json({error: `${id} is not a valid ID`});
            return;
        } 

        const todo = todos.find(todo => todo.id === id);

        todo ?
            res.status(200).json(todo)
            : res.status(404).json({error: `Todo with id ${id} not found`})
    }

    public createTodo = (req: Request, res: Response) => {
        const {text} = req.body;
        if (!text) {
            res.status(400).json({ error: "text is required" });
            return;
        };

        const newTodo = {
            id: todos.length + 1,
            text: text,
            completedAt: null
        };

        todos.push(newTodo);
        res.status(202).json(newTodo);
    }

    public updateTodo = (req: Request, res: Response) => {
        const id = +req.params.id;

        if(isNaN(id)){
            res.status(404).json({error: `${id} is not a valid ID`});
            return;
        }

        const todo = todos.find(todo => todo.id === id);

        if(!todo){
            res.status(404).json({error: `Todo not exist`});
            return;
        }

        const {text, completedAt} = req.body;

        todo.text = text || todo.text; 
        (completedAt === "null")
            ? todo.completedAt = null
            : todo.completedAt = new Date(completedAt || todo.completedAt);


        res.status(202).json(todo);
    }

    public deleteTodo = (req: Request, res: Response) => {
        const id = +req.params.id;

        if(isNaN(id)){
            res.status(404).json({error: `${id} is not a valid ID`});
            return;
        }

        const todo = todos.find(todo => todo.id === id);

        if(!todo){
            res.status(404).json({error: `Todo with id ${id} not found`});
            return;
        }

        const newArray = todos.filter(todo => todo.id != id);

        todos = [...newArray];

        res.status(200).json(todos);
    }
}