import { Router } from "express";
import { TodoController } from "./todos-controller";
import { TodoDatasourceImp } from "../../infrastructure/todo.datasource";

import { TodoRepositoryImp } from "../../infrastructure/repositories/todo.repositories";


export class TodoRoutes{

    static get routes(): Router{

        const router = Router();

        const datasource = new TodoDatasourceImp();
        const todoRepository = new TodoRepositoryImp(datasource)
        const todoController = new TodoController(todoRepository);

        router.get('/', todoController.getTodos);
        router.get('/:id', todoController.getTodoById);
        
        router.post('/', todoController.createTodo);
        router.put('/:id', todoController.updateTodo);

        router.delete('/:id', todoController.deleteTodo);

        return router;
    }
}