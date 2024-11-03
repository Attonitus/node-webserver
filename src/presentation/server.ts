import express from 'express'
import path from 'path';

interface OptionsServer{
    public_path?: string,
    port: number
}


export class Server{

    private readonly port: number;
    private readonly public_path: string;
    private app = express();

    constructor(options : OptionsServer){
        const {public_path  = 'public', port} = options;

        this.port = port;
        this.public_path = public_path;
    }

    start(){
        this.app.use(express.static(this.public_path));

        this.app.get('*', (req, res) => {
            const indexPath = path.join(__dirname + `../../../${this.public_path}/index.html`);
            res.sendFile(indexPath);
        });

        this.app.listen(this.port, () => {
            console.log(`Server listening on http://localhost:${this.port}`);
        });
    }
}