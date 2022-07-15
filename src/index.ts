import express  from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

//Routers
import {bloggersRouter} from "./routes/bloggers-routes";
import {postsRouter} from "./routes/posts-routes";

//Database
import {runDb} from "./repositories/db";

//Constant
const jsonMiddleware = bodyParser.json()
const port = process.env.PORT || 5000
const app = express()

app.use(cors())
app.use(jsonMiddleware)


app.use('/bloggers', bloggersRouter)
app.use('/posts', postsRouter)

const startApp = async() =>{
    await runDb()
    app.listen(port, ()=>{
        console.log(`Example app listening on port ${port}`)
    })
}

startApp()

