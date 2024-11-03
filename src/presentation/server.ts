import express, { Router } from 'express'
import path from 'path';

interface OptionsServer{
    public_path?: string,
    port: number,
    routes: Router
}


export class Server{

    private readonly port: number;
    private readonly public_path: string;
    private readonly routes: Router;
     
    private app = express();

    constructor(options : OptionsServer){
        const {public_path  = 'public', port, routes} = options;

        this.port = port;
        this.public_path = public_path;
        this.routes = routes;
    }

    start(){
        // Middlewares
        this.app.use(express.json()); // raw
        this.app.use(express.urlencoded({extended: true})); // url encoded

        // Public folder
        this.app.use(express.static(this.public_path));


        // ROUTES
        this.app.use(this.routes);

        // SPA
        this.app.get('*', (req, res) => {
            const indexPath = path.join(__dirname + `../../../${this.public_path}/index.html`);
            res.sendFile(indexPath);
        });


        this.app.listen(this.port, () => {
            console.log(`Server listening on http://localhost:${this.port}`);
        });
    }
}