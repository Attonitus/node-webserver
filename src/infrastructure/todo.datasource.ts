import { prisma } from "../data/postgres";
import { TodoDatasource } from "../domain/datasources/todo.datasource";
import { CreateTodoDto } from "../domain/dtos/todos/create-todo.dto";
import { UpdateTodoDto } from "../domain/dtos/todos/update-todo.dto";
import { TodoEntity } from "../domain/entities/todo.entity";


export class TodoDatasourceImp implements TodoDatasource {

    async create(todoDto: CreateTodoDto): Promise<TodoEntity> {
        const todo = await prisma.todo.create({
            data: todoDto
        });

        return TodoEntity.fromObject(todo);
    }

    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany();
        return todos.map( TodoEntity.fromObject );
    }

    async getById(id: number): Promise<TodoEntity> {
        const todo = await prisma.todo.findUnique({
            where: {id}
        });

        if(!todo){
            throw `Todo with ${id} not exist`;
        }

        return TodoEntity.fromObject(todo);
    }
    
    async updateById(todoDto: UpdateTodoDto): Promise<TodoEntity> {
        await this.getById(todoDto.id);

        const updatedTodo = await prisma.todo.update({
            where: { id: todoDto.id },
            data: todoDto.values,
        });

        return TodoEntity.fromObject(updatedTodo);
    }

    async deleteById(id: number): Promise<TodoEntity[]> {
        await this.getById(id);

        await prisma.todo.delete({
            where: {id}
        });

        return await this.getAll();
    }


}