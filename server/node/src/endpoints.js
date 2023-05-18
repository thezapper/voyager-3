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
        // EXAMPLE PUT
        // ----------------------------------------------------------
        exp.put('/example-put', (req, res) => {
            let data = req.body;
            res.send(200);
        });
        // ----------------------------------------------------------
        // EXAMPLE POST
        // ----------------------------------------------------------
        exp.post('/example-post', (req, res) => {
            let data = req.body;
            res.send(200);
        });
        // ----------------------------------------------------------
        // EXAMPLE DELETE
        // ----------------------------------------------------------
        exp.delete('/example-delete', (req, res) => {
            res.send('/example-delete');
        });
    }
}
//# sourceMappingURL=endpoints.js.map