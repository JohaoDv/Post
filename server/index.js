import app from './app.js'
import { connectionDB } from './db.js';
import {PORT} from './config.js'
connectionDB()
app.listen(PORT,()=>console.log(`running on port: ${PORT}`));
