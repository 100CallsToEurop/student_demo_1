import {Request, Response, Router} from "express";
import {bloggersRepository} from "../repositories/bloggers-repository";
import {body} from "express-validator";
import {inputValidatorMiddleware} from "../middleware/input-validator-middleware";

export const bloggersRouter = Router({})

const nameValidation = body('name')
    .trim()
    .exists()
    .notEmpty()
    .isLength({max: 15})
    .withMessage('Max 15 symbols')

const titleValidation = body('youtubeUrl')
    .exists()
    .isLength({max: 100})
    .withMessage('Max 100 symbols')
    .matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/)

bloggersRouter.get('/', (req: Request, res: Response)=>{
    const bloggers = bloggersRepository.getBloggers()
    res.status(200).json(bloggers)
})
bloggersRouter.get('/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const blogger = bloggersRepository.getBloggerById(id)
    if(blogger) res.status(200).json(blogger)
    res.status(404).send('Not found')
})
bloggersRouter.delete('/:id',(req: Request, res: Response)=>{
    const id = +req.params.id
    if (bloggersRepository.deleteBloggerById(id))
        res.status(204).send('No Content')
    res.status(404).send('Not found')
})
bloggersRouter.post('/',
    nameValidation,
    titleValidation,
    inputValidatorMiddleware,
    (req: Request, res: Response) => {
    const newBloger = bloggersRepository.createBlogger(req.body)
    if(newBloger) {
        res.status(201).json(newBloger)
    }
    res.status(400).send('Bad request')
})
bloggersRouter.put('/:id',
    nameValidation,
    titleValidation,
    inputValidatorMiddleware,
    (req: Request, res: Response)=>{
    const id = +req.params.id
    const isUpdate = bloggersRepository.updateBloggerById(id, req.body)
    if (isUpdate) {
        const blogger = bloggersRepository.getBloggerById(id)
        res.status(204).json(blogger)
    }
    res.status(404).send('NotFound')
})