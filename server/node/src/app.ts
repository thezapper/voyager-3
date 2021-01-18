import { Logging } from "./logging"
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

const port: string = process.argv[2];
if (port === undefined)
  throw new Error('Port not supplied on args');

import express from "express";
import bodyParser from "body-parser";
var https = require('https');
var fs = require('fs');
const app = express();

app.use(express.static('../../client/public'));
app.use(express.static('../../client/public/images'));
app.use(express.static('../../client/node_modules'));
app.use(express.static('../../assets'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

import { Endpoints } from "./endpoints";
//const ep = require('./endpoints').Endpoints;

var myArgs = process.argv;
var endpoints = new Endpoints(app);

log.info('--- STARTING SERVER ---');

let cwd = process.cwd();
log.info(`Current Working Directory: ${cwd}`);

const options = {
  key: fs.readFileSync(cwd + '\\src\\cert\\privatekey.key'),
  cert: fs.readFileSync(cwd + '\\src\\cert\\certificate.crt')
};

const server = https.createServer(options, app);

// start the server listening
log.info("Starting Express server on port %s...", port);
server.listen(port);