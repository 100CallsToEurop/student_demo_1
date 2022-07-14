//posts
import {Request, Response, Router} from "express";
import {postsRepository} from "../repositories/posts-repository";
import {body} from "express-validator";
import {inputValidatorMiddleware} from "../middleware/input-validator-middleware";

const titleValidation = body('title')
    .exists()
    .notEmpty()
    .isLength({max: 30})
    .withMessage('Max 30 symbols')

const shortDescriptionValidation = body('shortDescription')
    .exists()
    .notEmpty()
    .isLength({max: 100})
    .withMessage('Max 100 symbols')

const contentValidation = body('content')
    .exists()
    .notEmpty()
    .isLength({max: 1000})
    .withMessage('Max 1000 symbols')


export const postsRouter = Router({})

postsRouter.get('/', (req: Request, res: Response)=>{
    const posts = postsRepository.getPosts()
    res.status(200).send(posts)
})
postsRouter.get('/:id', (req: Request, res: Response) => {
    const id: number = +req.params.id;
    const post = postsRepository.getPostById(id)
    if(!post) res.status(404).send('Not found')
    res.status(200).send(post)
})
postsRouter.delete('/:id',(req: Request, res: Response)=>{
    const id = +req.params.id
    if (postsRepository.deletePostById(id))
        res.status(204).send('No Content')
    res.status(404).send('Not found')
})
postsRouter.post('/',
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    inputValidatorMiddleware,
    (req: Request, res: Response) => {
    const newPosts = postsRepository.createPost(req.body)
    if(newPosts) {
        res.status(201).send(newPosts)
    }
    res.status(400).send('Bad request')

})

postsRouter.put('/:id',
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    inputValidatorMiddleware,
    (req: Request, res: Response)=>{
    const id = +req.params.id
    const isUpdate = postsRepository.updatePostById(id, req.body)
    if (isUpdate) {
        const blogger = postsRepository.getPostById(id)
        res.status(204).send(blogger)
    }
    res.status(404).send('NotFound')
})