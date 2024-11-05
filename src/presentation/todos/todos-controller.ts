import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto } from "../../domain/dtos/todos/create-todo.dto";
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todo.dto";


export class TodoController{

    constructor(){}

    public getTodos = async(req : Request,res: Response) => {
        const todos = await prisma.todo.findMany();
        res.json(todos);
    };

    public getTodoById = async( req: Request, res: Response) => {
        const id = +req.params.id;
        if(isNaN(id)){
            res.status(404).json({error: `${id} is not a valid ID`});
            return;
        } 

        const todo = await prisma.todo.findUnique({
            where: {id}
        });


        todo ?
            res.status(200).json(todo)
            : res.status(404).json({error: `Todo with id ${id} not found`})
    }

    public createTodo = async(req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        
        if(error){
            res.status(401).json(error);
            return;
        } 

        const todo = await prisma.todo.create({
            data: createTodoDto!
        });

        res.status(202).json(todo);
    }

    public updateTodo = async(req: Request, res: Response) => {
        const id = +req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.update({...req.body, id});
        if(error){
            res.status(400).json(error);
            return;
        }

        const todo = await prisma.todo.findFirst({
            where: { id }
        });

        if(!todo){
            res.status(404).json({error: `Todo not exist`});
            return;
        }

        const updatedTodo = await prisma.todo.update({
            where:{ id },
            data: updateTodoDto!.values,
        });

        res.status(200).json(updatedTodo);
    }

    public deleteTodo = (req: Request, res: Response) => {
        const id = +req.params.id;

        if(isNaN(id)){
            res.status(404).json({error: `${id} is not a valid ID`});
            return;
        }

        const todo = prisma.todo.delete({
            where: {id}
        });

        if(!todo){
            res.status(404).json({error: `Todo with id ${id} not found`});
            return;
        }

        const todos = prisma.todo.findMany();

        res.status(200).json(todos);
    }
}