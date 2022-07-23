
import {BloggerInputModel, BloggerQuery, BloggerViewModel} from "../types/types";
import {bloggersRepository} from "../repositories/bloggers-repository-db";
import {PaginationBloggers} from "../types/pagination.types";

export const bloggersService= {
    async getBloggers(queryParams?: BloggerQuery): Promise<PaginationBloggers> {
        return bloggersRepository.getBloggers(queryParams)
    },
    async getBloggerById(id: string): Promise<BloggerViewModel | null> {
        const blogger = await bloggersRepository.getBloggerById(id)
        return blogger
    },
    async deleteBloggerById(id: string): Promise<boolean> {
        return await bloggersRepository.deleteBloggerById(id)
    },
    async updateBloggerById(id: string, updateParam: BloggerInputModel): Promise<boolean> {
        return await bloggersRepository.updateBloggerById(id, updateParam)

    },
    async createBlogger(createParam: BloggerInputModel): Promise<BloggerViewModel>{
        const newBlogger: BloggerViewModel = {
            ...createParam,
            id: (+(new Date())).toString(),
        }
        await bloggersRepository.createBlogger(newBlogger)
        return newBlogger
    }
}