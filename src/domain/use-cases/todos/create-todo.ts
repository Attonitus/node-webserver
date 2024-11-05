import { CreateTodoDto } from "../../dtos/todos/create-todo.dto";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";


export interface ICreateTodo{
    execute(todo: CreateTodoDto): Promise<TodoEntity>; 
}

export class CreateTodoUseCase implements ICreateTodo{

    constructor(
        private readonly repository : TodoRepository
    ){}

    execute(todo: CreateTodoDto): Promise<TodoEntity> {
        return this.repository.create(todo);
    }

}