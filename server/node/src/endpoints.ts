const chalk = require('chalk');
import express from "express";

const error = (txt) => console.log(chalk.bgRed.whiteBright(txt));
const warning = (txt) => console.log(chalk.hex('#FF8000')(txt));
const ok = (txt) => console.log(chalk.green(txt));
const info = (txt) => console.log(chalk.blueBright(txt));

export class Endpoints
{
  constructor(exp: express.Express)
  {
    // ----------------------------------------------------------
    // Request home page
    // ----------------------------------------------------------
    exp.get('/', (req, res) =>
    {
      res.sendFile('index.html')
    });

    // ----------------------------------------------------------
    // Create new project
    // ----------------------------------------------------------
    exp.put('/example-put', (req, res) =>
    {
      let data = req.body;

      res.send(200);
    });

    // ----------------------------------------------------------
    // Update project
    // ----------------------------------------------------------
    exp.post('/example-post', (req, res) =>
    {
      let data = req.body;
      res.send(200);
    });

    // ----------------------------------------------------------
    // Delete project (future request?)
    // ----------------------------------------------------------
    exp.delete('/example-delete', (req, res) =>
    {
      res.send('/example-delete')
    });
  }
}