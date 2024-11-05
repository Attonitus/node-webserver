import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto } from "../../domain/dtos/todos/create-todo.dto";
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todo.dto";
import { TodoRepository } from "../../domain/repositories/todo.repository";


export class TodoController{

    constructor(
        private readonly todoRepository: TodoRepository
    ){}

    public getTodos = async(req : Request,res: Response) => {
        const todos = await this.todoRepository.getAll();
        res.json(todos);
    };

    public getTodoById = async( req: Request, res: Response) => {
        const id = +req.params.id;
        const todo = await this.todoRepository.getById(id);
        res.json(todo);
    }

    public createTodo = async(req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        
        const createdTodo = await this.todoRepository.create(createTodoDto!);
        res.status(201).json(createdTodo);
    }

    public updateTodo = async(req: Request, res: Response) => {
        const id = +req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.update({...req.body, id});
        
        const updatedTodo = await this.todoRepository.updateById(updateTodoDto!);

        res.status(200).json(updatedTodo);
    }

    public deleteTodo = async(req: Request, res: Response) => {
        const id = +req.params.id;

        const todos = await this.todoRepository.deleteById(id);

        res.status(200).json(todos);
    }
}