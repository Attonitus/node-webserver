import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";


export interface IGetByIdTodo{
    execute(id: number): Promise<TodoEntity>; 
}

export class GetByIdTodoUseCase implements IGetByIdTodo{

    constructor(
        private readonly repository : TodoRepository
    ){}

    execute(id: number): Promise<TodoEntity> {
        return this.repository.getById(id);
    }

}