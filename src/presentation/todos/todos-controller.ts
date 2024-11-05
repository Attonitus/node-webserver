import { Request, Response } from "express";
import { CreateTodoDto } from "../../domain/dtos/todos/create-todo.dto";
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todo.dto";
import { TodoRepository } from "../../domain/repositories/todo.repository";
import { CreateTodoUseCase, DeleteTodoUseCase, GetAllTodoUseCase, GetByIdTodoUseCase, UpdateTodoUseCase } from "../../domain";


export class TodoController{

    constructor(
        private readonly todoRepository: TodoRepository
    ){}

    public getTodos = (req : Request,res: Response) => {
        new GetAllTodoUseCase(this.todoRepository)
        .execute()
        .then( todos => res.json(todos))
        .catch( err => res.status(400).json(err));
    };

    public getTodoById = ( req: Request, res: Response) => {
        const id = +req.params.id;

        new GetByIdTodoUseCase(this.todoRepository)
        .execute(id)
        .then( todo => res.json(todo))
        .catch( err => res.status(400).json({err}));
    }

    public createTodo = async(req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);

        if(error){
            res.status(400).json({error});
            return;
        }
        
        new CreateTodoUseCase(this.todoRepository)
        .execute(createTodoDto!)
        .then( todo => res.json(todo))
        .catch( err => res.status(400).json({err}));
    }

    public updateTodo = async(req: Request, res: Response) => {
        const id = +req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.update({...req.body, id});

        if(error){
            res.status(400).json({error});
            return;
        }

        new UpdateTodoUseCase(this.todoRepository)
        .execute(updateTodoDto!)
        .then( todo => res.json(todo))
        .catch( err => res.status(400).json({err}));
    }

    public deleteTodo = async(req: Request, res: Response) => {
        const id = +req.params.id;

        new DeleteTodoUseCase(this.todoRepository)
        .execute(id!)
        .then( todos => res.json(todos))
        .catch( err => res.status(400).json({err}));
    }
}