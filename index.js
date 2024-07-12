import express from 'express';
import { bootstrap } from './bootstrap.js';
import { connection } from './database/dbConnection.js';
import refreshPropertyRequests from './utils/refreshProperty.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 3000;
connection();


bootstrap(app, express);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

export default app;