import express, {Request, Response} from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import {authMiddleware} from "./middleware/auth-middleware";
import {bloggersRouter} from "./routes/bloggers-routes";
import {postsRouter} from "./routes/posts-routes";

//Constants
const parserMiddleware = bodyParser({})
const port = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(parserMiddleware)
app.use(authMiddleware)

app.use('/bloggers', bloggersRouter)
app.use('/posts', postsRouter)


app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`)
})