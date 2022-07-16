import {postsRepository} from "../repositories/posts-repository-db";
import {PaginationPosts, PostInputModel, PostQuery, PostViewModel} from "../types";
import {bloggersService} from "./bloggers.service";

export const postsService = {
    async getPosts(queryParams?: PostQuery): Promise<PaginationPosts> {
        return await postsRepository.getPosts(queryParams)
    },
    async getPostById(id: number) {
        return await postsRepository.getPostById(id)
    },
    async deletePostById(id: number): Promise<boolean> {
        return await postsRepository.deletePostById(id)
    },
    async updatePostById(id: number, updatePost: PostInputModel): Promise<boolean> {
        const {title, shortDescription, content, bloggerId }  = updatePost
        return await postsRepository.updatePostById(id, {title, shortDescription, content, bloggerId })
    },
    async createPost(createParam: PostInputModel) {
        const {title, shortDescription, content, bloggerId }  = createParam
        const blogger = await bloggersService.getBloggerById(+bloggerId)
        if(!blogger) return null
        const newPost: PostViewModel = {
            id: +(new Date()),
            title,
            shortDescription,
            content,
            bloggerId: +bloggerId,
            bloggerName: blogger.name
        }
        await postsRepository.createPost(newPost)
        delete newPost._id
        return newPost
    }
}