import expres from "express";
import {createServer} from "http";

const app = expres();

const server = createServer(app);

server.listen({port: 8000}, () => {
    console.log(`Server is running on 8000.`);
});

