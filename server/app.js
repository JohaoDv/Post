import express from 'express'
import bodyParser from "body-parser";
import router from './routes/routes.js'
import fileupload from 'express-fileupload'
import {dirname,join} from 'path'
import {fileURLToPath} from 'url'
const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: "true" }));
app.use(fileupload({
  useTempFiles: true,
  tempFileDir: "./upload"
}))
app.use(router)
console.log(__dirname)
app.use(express.static(join(__dirname,'../client/dist')))
export default app