import express from "express";
export class Endpoints {
    constructor(exp) {
        exp.use(express.static('./client/public'));
        exp.use(express.static('./node_modules'));
        // ----------------------------------------------------------
        // Request home page
        // ----------------------------------------------------------
        exp.get('/', (req, res) => {
            res.sendFile('index.html');
        });
        // ----------------------------------------------------------
        // Create new project
        // ----------------------------------------------------------
        exp.put('/example-put', (req, res) => {
            let data = req.body;
            res.send(200);
        });
        // ----------------------------------------------------------
        // Update project
        // ----------------------------------------------------------
        exp.post('/example-post', (req, res) => {
            let data = req.body;
            res.send(200);
        });
        // ----------------------------------------------------------
        // Delete project (future request?)
        // ----------------------------------------------------------
        exp.delete('/example-delete', (req, res) => {
            res.send('/example-delete');
        });
    }
}
//# sourceMappingURL=endpoints.js.map