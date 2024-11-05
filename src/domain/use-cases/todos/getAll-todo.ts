import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";


export interface IGetAllTodo{
    execute(): Promise<TodoEntity[]>; 
}

export class GetAllTodoUseCase implements IGetAllTodo{

    constructor(
        private readonly repository : TodoRepository
    ){}

    execute(): Promise<TodoEntity[]> {
        return this.repository.getAll();
    }

}