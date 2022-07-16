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
import {PostQuery} from "../types";

export const postsRouter = Router({})

postsRouter.get('/', async (req: Request, res: Response) => {
    const {page, pageSize}: PostQuery = req.query
    const posts = await postsService.getPosts({page, pageSize})
    res.status(200).send(posts)
})
postsRouter.get('/:id', async (req: Request, res: Response) => {
    const id: number = +req.params.id;
    const post = await postsService.getPostById(id)
    if(post) {
        res.status(200).send(post)
        return
    }
    res.status(404).send('Not found')

})
postsRouter.delete('/:id', authMiddleware, async (req: Request, res: Response)=>{
    const id = +req.params.id
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
    const newPosts = await postsService.createPost(req.body)
        if(newPosts === null) {
            res.status(400).send({errorsMessages: [{message: "Not found", field: "bloggerId"}]})
            return
        }
    if(newPosts) {
        res.status(201).send(newPosts)
        return
    }
    res.status(400).send('Bad request')
})

postsRouter.put('/:id',
    authMiddleware,
    titleValidationPosts,
    shortDescriptionValidation,
    contentValidation,
    bloggerIdValidation,
    inputValidatorMiddleware,
    async (req: Request, res: Response)=>{
    const id = +req.params.id
    const isUpdate = await postsService.updatePostById(id, req.body)
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