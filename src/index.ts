import express, {Request, Response} from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

//Types
type FieldError = {
    "message": string,
    "field": string
}
type APIErrorResult = {
    errorsMessages: Array<FieldError>
}
type BloggerInputModel = Omit<BloggerViewModel, 'id'>
type BloggerViewModel = {
    id: number,
    name: string,
    youtubeUrl: string
}
type PostInputModel = Omit<PostViewModel, 'id' | 'bloggerName'>
type PostViewModel = {
    id: number
    title: string,
    shortDescription: string,
    content: string,
    bloggerId: number,
    bloggerName: string
}

//Constants
const parserMiddleware = bodyParser({})
const port = process.env.PORT || 5000
const bloggers: Array<BloggerViewModel> = [
    {id: 1, name: 'About JS - 01', youtubeUrl: 'https://yandex.ru'},
    {id: 2, name: 'About JS - 02', youtubeUrl: 'https://yandex.ru'},
    {id: 3, name: 'About JS - 03', youtubeUrl: 'https://yandex.ru'},
    {id: 4, name: 'About JS - 04', youtubeUrl: 'https://yandex.ru'},
    {id: 5, name: 'About JS - 05', youtubeUrl: 'https://yandex.ru'},
]

const posts: Array<PostViewModel> = [
    {id: 1, title: 'About JS - 01', shortDescription: 'it-incubator.eu', content: 'it-incubator.eu', bloggerId: 1, bloggerName: 'it-incubator.eu'},
    {id: 2, title: 'About JS - 02', shortDescription: 'it-incubator.eu', content: 'it-incubator.eu', bloggerId: 2, bloggerName: 'it-incubator.eu'},
    {id: 3, title: 'About JS - 03', shortDescription: 'it-incubator.eu', content: 'it-incubator.eu', bloggerId: 3, bloggerName: 'it-incubator.eu'},
    {id: 4, title: 'About JS - 04', shortDescription: 'it-incubator.eu', content: 'it-incubator.eu', bloggerId: 4, bloggerName: 'it-incubator.eu'},
    {id: 5, title: 'About JS - 05', shortDescription: 'it-incubator.eu', content: 'it-incubator.eu', bloggerId: 5, bloggerName: 'it-incubator.eu'},
]

function errorHandlerExist(value: string, valueFact: string, arrError: Array<FieldError>){
    if(!value) return arrError.push({
        message: `Field ${valueFact} error`,
        field: `${valueFact}`
    })
    return arrError
}

function errorHandlerLimit(value: string, limit: number, arrError: Array<FieldError>){
    if(value.length > limit) return arrError.push({
        message: `Field ${value} error`,
        field: `${value}`
    })
    return arrError
}

const app = express()

app.use(cors())
app.use(parserMiddleware)

//bloggers
app.get('/bloggers', (req: Request, res: Response)=>{
    res.status(200).send(bloggers)
})
app.get('/bloggers/:id', (req: Request, res: Response) => {
    const id: number = +req.params.id;
    const blogger: BloggerViewModel | undefined = bloggers.find(b => b.id === id)
    if(!blogger) res.status(404).send('Not found')
    res.status(200).send(blogger)
})
app.delete('/bloggers/:id',(req: Request, res: Response)=>{
    const id: number = +req.params.id;
    for(let i = 0; i < bloggers.length; i++){
        if(bloggers[i].id === id) {
            bloggers.splice(i, 1)
            res.status(204).send('No Content')
            return
        }
    }
    res.status(404).send('Not found')
})
app.post('/bloggers', (req: Request, res: Response) => {
    const {name, youtubeUrl }:BloggerInputModel  = req.body
    if(name && youtubeUrl) {
        const exp = /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/
        const error: Array<FieldError> = []
        errorHandlerLimit(name, 15, error)
        errorHandlerLimit(youtubeUrl, 100, error)
        if (error.length > 0 || !exp.test(youtubeUrl)) {
            const errorMessage: APIErrorResult = {
                errorsMessages: error
            }
            res.status(400).send(errorMessage)
        }
        const newBloger: BloggerViewModel = {
            id: +(new Date()),
            name,
            youtubeUrl
        }
        bloggers.push(newBloger)
        res.status(201).send(newBloger)
    }
    else{
        const errorExist: Array<FieldError> = []
        errorHandlerExist(name, 'name', errorExist)
        errorHandlerExist(youtubeUrl, 'youtubeUrl', errorExist)
        res.status(400).send(errorExist)
    }
})
app.put('/bloggers/:id',(req: Request, res: Response)=>{
    const {name, youtubeUrl }:BloggerInputModel  = req.body
    if(name && youtubeUrl) {
        const exp = /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/
        const error: Array<FieldError> = []
        errorHandlerLimit(name, 15, error)
        errorHandlerLimit(youtubeUrl, 100, error)
        if (error.length > 0 || !exp.test(youtubeUrl)) {
            const errorMessage: APIErrorResult = {
                errorsMessages: error
            }
            res.status(400).send(errorMessage)
        }
        const id: number = +req.params.id;
        const blogger: BloggerViewModel | undefined = bloggers.find(b => b.id === id)
        if (blogger) {
            blogger.name = name,
            blogger.youtubeUrl = youtubeUrl
            res.status(204).send(blogger)
        }
        res.status(404).send('NotFound')
    }
    else{
        const errorExist: Array<FieldError> = []
        errorHandlerExist(name, 'name', errorExist)
        errorHandlerExist(youtubeUrl, 'youtubeUrl', errorExist)
        res.status(400).send(errorExist)
    }

})

//posts
app.get('/posts', (req: Request, res: Response)=>{
    res.status(200).send(posts)
})

//400 Bad Request - Доделать
app.get('/posts/:id', (req: Request, res: Response) => {
    const id: number = +req.params.id;
    const post: PostViewModel | undefined = posts.find(p => p.id === id)
    if(!post) res.status(404).send('Not found')
    res.status(200).send(post)
})
app.delete('/posts/:id',(req: Request, res: Response)=>{
    const id: number = +req.params.id;
    for(let i = 0; i < posts.length; i++){
        if(posts[i].id === id) {
            posts.splice(i, 1)
            res.status(204).send('No Content')
            return
        }
    }
    res.status(404).send('Not found')
})
app.post('/posts', (req: Request, res: Response) => {
    const {title, shortDescription, content, bloggerId }:PostInputModel  = req.body
    if(title && shortDescription && content && bloggerId) {
        const error: Array<FieldError> = []
        errorHandlerLimit(title, 30, error)
        errorHandlerLimit(shortDescription, 100, error)
        errorHandlerLimit(content, 1000, error)
        if(error.length > 0){
            const errorMessage: APIErrorResult = {
                errorsMessages: error
            }
            res.status(400).send(errorMessage)
        }
        const blogger: BloggerViewModel | undefined = bloggers.find(b => b.id === +bloggerId)
        let bloggerName = ''
        if(blogger) bloggerName = blogger.name
        else{
            const errorMessage: APIErrorResult = {
                errorsMessages: [{
                    message: "Field title not found",
                    field: "title"
                }]
            }
            res.status(400).send(errorMessage)
        }
        const newPost: PostViewModel = {
            id: +(new Date()),
            title,
            shortDescription,
            content,
            bloggerId: +bloggerId,
            bloggerName: bloggerName
        }
        posts.push(newPost)
        res.status(201).send(newPost)
    }
    else{
        const errorExist: Array<FieldError> = []
        errorHandlerExist(title, 'title', errorExist)
        errorHandlerExist(shortDescription, 'shortDescription', errorExist)
        errorHandlerExist(content, 'content', errorExist)
        errorHandlerExist(`${bloggerId}`, 'bloggerId', errorExist)
        res.status(400).send(errorExist)
    }
})

app.put('/posts/:id',(req: Request, res: Response)=>{
    const {title, shortDescription, content, bloggerId }:PostInputModel  = req.body
    if(title && shortDescription && content && bloggerId) {
        const error: Array<FieldError> = []
        if(title && shortDescription && content && bloggerId) {
            errorHandlerLimit(title, 30, error)
            errorHandlerLimit(shortDescription, 100, error)
            errorHandlerLimit(content,1000, error)
            if (error.length > 0) {
                const errorMessage: APIErrorResult = {
                    errorsMessages: error
                }
                res.status(400).send(errorMessage)
            }
        }
        const blogger: BloggerViewModel | undefined = bloggers.find(b => b.id === +bloggerId)
        let bloggerName = ''
        if(blogger) bloggerName = blogger.name
        else{
            const errorMessage: APIErrorResult = {
                errorsMessages: [{
                    message: "Field title not found",
                    field: "title"
                }]
            }
            res.status(400).send(errorMessage)
        }
        const id: number = +req.params.id;
        const post: PostViewModel | undefined = posts.find(p => p.id === id)
        if (post) {
            post.title = title;
            post.shortDescription = shortDescription;
            post.content = content;
            post.bloggerId = bloggerId;
            post.bloggerName = bloggerName;
            res.status(204).send(post)
        }
        res.status(404).send('NotFound')
    }
    else{
        const errorExist: Array<FieldError> = []
        errorHandlerExist(title, 'title', errorExist)
        errorHandlerExist(shortDescription, 'shortDescription', errorExist)
        errorHandlerExist(content, 'content', errorExist)
        errorHandlerExist(`${bloggerId}`, 'bloggerId', errorExist)
        res.status(400).send(errorExist)
    }

})

app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`)
})