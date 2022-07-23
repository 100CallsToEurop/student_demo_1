import {Request, Response, Router} from "express";
import {commentsService} from "../domian/comments.service";
import {authMiddleware} from "../middleware/auth-middleware";
import {CommentInputModel} from "../types/types";
import {commentValidation} from "../middleware/comment-middleware";
import {inputValidatorMiddleware} from "../middleware/input-validator-middleware";
import {authMiddlewareJWT} from "../middleware/auth-middleware-jwt";

export const commentsRouter = Router({})

commentsRouter.get('/', async (req: Request, res: Response) =>{
    const id = req.params.id
    const comment = await commentsService.getCommentById(id)
    if (comment) {
        res.status(200).json(comment)
        return
    }
    res.status(404).send('Not found')
})

commentsRouter.put('/',
    authMiddlewareJWT,
    commentValidation,
    inputValidatorMiddleware,
    async (req: Request, res: Response) =>{
    const id = req.params.commentId
    const {content}: CommentInputModel = req.body
    const isUpdate = await commentsService.updateCommentById(id,{content})
    if (isUpdate) {
        res.status(204).send('No Content')
        return
    }
    res.status(404).send('NotFound')
})

commentsRouter.delete('/', authMiddlewareJWT, async (req: Request, res: Response) =>{
    const commentId = req.user!.id
    if (await commentsService.deleteCommentById(commentId)) {
        res.status(204).send('No Content')
        return
    }
    res.status(404).send('Not found')
})

