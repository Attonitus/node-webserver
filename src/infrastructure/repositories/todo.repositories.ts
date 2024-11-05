import { TodoDatasource } from "../../domain/datasources/todo.datasource";
import { CreateTodoDto } from "../../domain/dtos/todos/create-todo.dto";
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todo.dto";
import { TodoEntity } from "../../domain/entities/todo.entity";
import { TodoRepository } from "../../domain/repositories/todo.repository";


export class TodoRepositoryImp implements TodoRepository{

    constructor(
        private readonly datasource: TodoDatasource
    ){}

    create(todoDto: CreateTodoDto): Promise<TodoEntity> {
        return this.datasource.create(todoDto);
    }

    getAll(): Promise<TodoEntity[]> {
        return this.datasource.getAll();
    }

    getById(id: number): Promise<TodoEntity> {
        return this.datasource.getById(id);
    }

    updateById(todoDto: UpdateTodoDto): Promise<TodoEntity> {
        return this.datasource.updateById(todoDto);
    }

    deleteById(id: number): Promise<TodoEntity[]> {
        return this.datasource.deleteById(id);
    }

}