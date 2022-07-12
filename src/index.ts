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


function errorHandler(value: string, valueFact: string, limit: number, arrError: Array<FieldError>){
    const exp = /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/
    if(valueFact === 'youtubeUrl' && !exp.test(value)){
        return arrError.push({
            message: `Field ${valueFact} error`,
            field: `${valueFact}`
        })
    }

    if(!value || value.length > limit || value === "" || value.trim() === "" || value === undefined) return arrError.push({
        message: `Field ${valueFact} error`,
        field: `${valueFact}`
    })
    return arrError
}

const app = express()

app.use(cors())
app.use(parserMiddleware)

//bloggers
app.get('/bloggers', (req: Request, res: Response)=>{
    if(bloggers) res.status(200).send(bloggers)
    res.status(404).send('Not found')
})
app.get('/bloggers/:id', (req: Request, res: Response) => {
    const id: number = +req.params.id;
    const blogger: BloggerViewModel | undefined = bloggers.find(b => b.id === id)
    if(!blogger) res.status(404).send('Not found')
    res.status(200).send(blogger)
})
app.delete('/bloggers/:id',(req: Request, res: Response)=>{
    const id: number = +req.params.id;
    console.log(req.params.id)
    if(id) {
        for (let i = 0; i < bloggers.length; i++) {
            if (bloggers[i].id === id) {
                bloggers.splice(i, 1)
                res.status(204).send('No Content')
                return
            }
        }
    }
    res.status(404).send('Not found')
})
app.post('/bloggers', (req: Request, res: Response) => {
    const {name, youtubeUrl}:BloggerInputModel  = req.body
    const error: Array<FieldError> = []
    errorHandler(name, 'name',15, error)
    errorHandler(youtubeUrl, 'youtubeUrl',100, error)
    if (error.length > 0) {
        const errorMessage: APIErrorResult = {
            errorsMessages: error
        }
        res.status(400).send(errorMessage)
    }
    if(name && youtubeUrl) {
        const newBloger: BloggerViewModel = {
            id: +(new Date()),
            name,
            youtubeUrl
        }
        bloggers.push(newBloger)
        res.status(201).send(newBloger)
    }
})
app.put('/bloggers/:id',(req: Request, res: Response)=>{
    const {name, youtubeUrl}:BloggerInputModel  = req.body
    const error: Array<FieldError> = []
    errorHandler(name, 'name',15, error)
    errorHandler(youtubeUrl, 'youtubeUrl',100, error)
    if (error.length > 0) {
        const errorMessage: APIErrorResult = {
            errorsMessages: error
        }
        res.status(400).send(errorMessage)
    }
    if(name && youtubeUrl) {
        const id: number = +req.params.id;
        const blogger: BloggerViewModel | undefined = bloggers.find(b => b.id === id)
        if (blogger) {
            blogger.name = name, blogger.youtubeUrl = youtubeUrl
            res.status(204).send(blogger)
        }
        res.status(404).send('NotFound')
    }
})

//posts
app.get('/posts', (req: Request, res: Response)=>{
    if(posts) res.status(200).send(posts)
    res.status(404).send('Not found')
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
    if(id) {
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].id === id) {
                posts.splice(i, 1)
                res.status(204).send('No Content')
                return
            }
        }
    }
    res.status(404).send('Not found')
})
app.post('/posts', (req: Request, res: Response) => {
    const {title, shortDescription, content, bloggerId }:PostInputModel  = req.body
    const error: Array<FieldError> = []
    errorHandler(title, 'title',30, error)
    errorHandler(shortDescription, 'shortDescription', 100, error)
    errorHandler(content, 'content',1000, error)
    if(error.length > 0){
        const errorMessage: APIErrorResult = {
            errorsMessages: error
        }
        res.status(400).send(errorMessage)
    }
    if(title && shortDescription && content && bloggerId) {
        const blogger: BloggerViewModel | undefined = bloggers.find(b => b.id === +bloggerId)
        let bloggerName = ''
        if (blogger) bloggerName = blogger.name
        else {
            const errorMessage: APIErrorResult = {
                errorsMessages: [{
                    message: "Field bloggerId not found",
                    field: "bloggerId"
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
})

app.put('/posts/:id',(req: Request, res: Response)=>{
    const {title, shortDescription, content, bloggerId }:PostInputModel  = req.body
    const error: Array<FieldError> = []
    errorHandler(title, 'title',30, error)
    errorHandler(shortDescription, 'shortDescription', 100, error)
    errorHandler(content, 'content',1000, error)
    if(error.length > 0){
        const errorMessage: APIErrorResult = {
            errorsMessages: error
        }
        res.status(400).send(errorMessage)
    }
    if(title && shortDescription && content && bloggerId) {
        const blogger: BloggerViewModel | undefined = bloggers.find(b => b.id === +bloggerId)
        let bloggerName = ''
        if (blogger) bloggerName = blogger.name
        else {
            const errorMessage: APIErrorResult = {
                errorsMessages: [{
                    message: "Field bloggerId not found",
                    field: "bloggerId"
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
})

app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`)
})