import { CreateTodoDto } from "../dtos/todos/create-todo.dto";
import { UpdateTodoDto } from "../dtos/todos/update-todo.dto";
import { TodoEntity } from "../entities/todo.entity";


export abstract class TodoDatasource{

    abstract create(todoDto : CreateTodoDto) : Promise<TodoEntity>;
    abstract getAll(): Promise<TodoEntity[]>;

    abstract getById(id: number): Promise<TodoEntity>;
    abstract updateById(todoDto: UpdateTodoDto) : Promise<TodoEntity>;
    abstract deleteById(id: number) : Promise<TodoEntity[]>;
}