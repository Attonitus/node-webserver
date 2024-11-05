import { UpdateTodoDto } from "../../dtos/todos/update-todo.dto";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";


export interface IUpdateTodo{
    execute(todo: UpdateTodoDto): Promise<TodoEntity>; 
}

export class UpdateTodoUseCase implements IUpdateTodo{

    constructor(
        private readonly repository : TodoRepository
    ){}

    execute(todo: UpdateTodoDto): Promise<TodoEntity> {
        return this.repository.updateById(todo);
    }

}