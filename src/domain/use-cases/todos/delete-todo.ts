import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";


export interface IDeleteTodo{
    execute(id: number): Promise<TodoEntity[]>; 
}

export class DeleteTodoUseCase implements IDeleteTodo{

    constructor(
        private readonly repository : TodoRepository
    ){}

    execute(id: number): Promise<TodoEntity[]> {
        return this.repository.deleteById(id);
    }

}