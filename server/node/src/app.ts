import express from "express";
import https from 'https';
import fs from 'fs';

import { Endpoints } from "./endpoints.js";
import { Logging } from "./logging.js"
const log = new Logging();

log.info("Starting up...");

const NODE_VERSION = process.versions.node;
const NODE_MAJOR_VERSION: number = parseInt(NODE_VERSION.split('.')[0]);
if (NODE_MAJOR_VERSION < 12) 
{
  throw new Error(`Running Node version ${NODE_VERSION} Requires Node 12 (or higher)`);
}
else
{
  log.ok(`Running node ${NODE_VERSION}, OK to continue`);
}

let port: string = process.argv[2];
if (port === undefined)
{
  port = '3000';
  log.error('Port not supplied on args, using 3000');
}


const app = express();
var endpoints = new Endpoints(app);

//const ep = require('./endpoints').Endpoints;

var myArgs = process.argv;

log.info('--- STARTING SERVER ---');

let cwd = process.cwd();
log.info(`Current Working Directory: ${cwd}`);

const options = {
  key: fs.readFileSync(cwd + '/server/cert/privatekey.key'),
  cert: fs.readFileSync(cwd + '/server/cert/certificate.crt')
};

const server = https.createServer(options, app);

// start the server listening
log.info(`Starting Express server on port ${port}...`);
server.listen(port);