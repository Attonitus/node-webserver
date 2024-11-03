import http from 'node:http'
import fs from 'node:fs'

const server = http.createServer( (req, res) => {
    
    if(req.url == '/'){
        const file = fs.readFileSync('./public/index.html', 'utf-8');
        res.writeHead(200, {'content-type' : 'text/html'});
        res.end(file);
    }else if(req.url == '/css/styles.css'){
        const file = fs.readFileSync('./public/css/styles.css', 'utf-8');
        res.writeHead(200, {'content-type' : 'text/css'});
        res.end(file);
    }else if(req.url == '/js/app.js'){
        const file = fs.readFileSync('./public/js/app.js', 'utf-8');
        res.writeHead(200, {'content-type' : 'application/javascript'});
        res.end(file);
    }
    else if(req.url == '/json'){
        res.writeHead(200, {'content-type': 'application/json'});
        const json = {
            name : 'Sami',
            alias: [
                'Samitita',
                'Esposita',
                'Amorcito'
            ]
        };

        res.end(JSON.stringify(json));
    } else {
        res.writeHead(404, {'content-type': 'text/html'});
        res.end();
    }

});


server.listen(3000, () => {
    console.log("Server listening...");
});