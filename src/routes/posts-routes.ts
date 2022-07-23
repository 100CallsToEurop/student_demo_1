//posts
import {Request, Response, Router} from "express";
import {inputValidatorMiddleware} from "../middleware/input-validator-middleware";
import {authMiddleware} from "../middleware/auth-middleware";
import {postsService} from "../domian/posts.services";
import {
    bloggerIdValidation,
    contentValidation,
    shortDescriptionValidation,
    titleValidationPosts
} from "../middleware/post-middleware";
import {PostQuery} from "../types/types";

export const postsRouter = Router({})

postsRouter.get('/', async (req: Request, res: Response) => {
    const {PageNumber, PageSize}: PostQuery = req.query
    const posts = await postsService.getPosts({PageNumber, PageSize})
    res.status(200).json(posts)
})
postsRouter.get('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    const post = await postsService.getPostById(id)
    if(post) {
        res.status(200).send(post)
        return
    }
    res.status(404).send('Not found')

})
postsRouter.delete('/:id', authMiddleware, async (req: Request, res: Response)=>{
    const id = req.params.id
    if (await postsService.deletePostById(id)) {
        res.status(204).send('No Content')
        return
    }
    res.status(404).send('Not found')
})
postsRouter.post('/',
    authMiddleware,
    titleValidationPosts,
    shortDescriptionValidation,
    contentValidation,
    bloggerIdValidation,
    inputValidatorMiddleware,
    async (req: Request, res: Response) => {
    const {title, shortDescription, content, bloggerId }  = req.body
    const newPosts = await postsService.createPost({title, shortDescription, content, bloggerId })
        if(newPosts === null) {
            res.status(400).send({errorsMessages: [{message: "Not found", field: "bloggerId"}]})
            return
        }
    if(newPosts) {
        res.status(201).send(newPosts)
        return
    }
    res.status(404).send('Not found')
})

postsRouter.put('/:id',
    authMiddleware,
    titleValidationPosts,
    shortDescriptionValidation,
    contentValidation,
    bloggerIdValidation,
    inputValidatorMiddleware,
    async (req: Request, res: Response)=>{
    const id = req.params.id
    const {title, shortDescription, content, bloggerId }  = req.body
    const isUpdate = await postsService.updatePostById(id, {title, shortDescription, content, bloggerId })
        if(isUpdate === null) {
            res.status(400).send({errorsMessages: [{message: "Not found", field: "bloggerId"}]})
            return
        }
    if (isUpdate) {
        const blogger = await postsService.getPostById(id)
        res.status(204).send(blogger)
        return
    }
    res.status(404).send('NotFound')
})