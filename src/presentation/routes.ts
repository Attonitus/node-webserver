import { Router } from "express";
import { TodoRoutes } from "./todos/todos-routes";


export class AppRoutes{

    static get routes(): Router{
        const router = Router();

        router.use('/api/todos', TodoRoutes.routes);
        // router.get('/api/users', UsersRoutes.routes)
        // router.get('/api/auth', authRoutes.routes)
        // router.get('/api/products', productsRoutes.routes)

        return router;
    }
}