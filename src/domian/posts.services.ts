import {postsRepository} from "../repositories/posts-repository-db";
import {PostInputModel, PostQuery, PostViewModel} from "../types/types";
import {bloggersService} from "./bloggers.service";
import {PaginationPosts} from "../types/pagination.types";

export const postsService = {
    async getPosts(queryParams?: PostQuery): Promise<PaginationPosts | null> {
        if(queryParams?.id !== undefined) {
            const bloggers = await bloggersService.getBloggerById(queryParams?.id)
            if (!bloggers) return null
        }
        return await postsRepository.getPosts(queryParams)
    },

    async getPostById(id: string) {
        return await postsRepository.getPostById(id)
    },
    async deletePostById(id: string): Promise<boolean> {
        return await postsRepository.deletePostById(id)
    },
    async updatePostById(id: string, updatePost: PostInputModel): Promise<boolean | null> {
        const blogger = await bloggersService.getBloggerById(updatePost.bloggerId)
        if (blogger) return await postsRepository.updatePostById(id, updatePost)
        return null

    },
    async createPost(createParam: PostInputModel):Promise<PostViewModel | null>  {
        const blogger = await bloggersService.getBloggerById(createParam.bloggerId)
        if(!blogger) return null
        const newPost: PostViewModel = {
            ...createParam,
            id: (+(new Date())).toString(),
            bloggerName: blogger.name
        }
        await postsRepository.createPost(newPost)
        return newPost
    }
}