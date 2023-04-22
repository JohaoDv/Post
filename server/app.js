import express from 'express'
import bodyParser from "body-parser";
import router from './routes/routes.js'
import fileupload from 'express-fileupload'
import {dirname,join} from 'path'
import {fileURLToPath} from 'url'
const app = express()
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'https://johao-crud.netlify.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
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
app.get("*",(req,res)=>{
  res.sendFile(join(__dirname,'../client/dist/index.html'))
})
export default app