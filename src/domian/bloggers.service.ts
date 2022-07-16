
import {BloggerInputModel, BloggerQuery, BloggerViewModel, Pagination, PaginationBloggers} from "../types";
import {bloggersRepository} from "../repositories/bloggers-repository-db";

export const bloggersService= {
    async getBloggers(queryParams?: BloggerQuery): Promise<PaginationBloggers> {
        return bloggersRepository.getBloggers(queryParams)


    },
    async getBloggerById(id: number): Promise<BloggerViewModel | null> {
        const blogger = await bloggersRepository.getBloggerById(id)
        return blogger
    },
    async deleteBloggerById(id: number): Promise<boolean> {
        return await bloggersRepository.deleteBloggerById(id)
    },
    async updateBloggerById(id: number, updateParam: BloggerInputModel): Promise<boolean> {
        const {name, youtubeUrl} = updateParam
        return await bloggersRepository.updateBloggerById(id, { name, youtubeUrl})

    },
    async createBlogger(createParam: BloggerInputModel): Promise<BloggerViewModel>{
        const {name, youtubeUrl} = createParam
        const newBlogger: BloggerViewModel = {
            id: +(new Date()),
            name,
            youtubeUrl
        }
        await bloggersRepository.createBlogger(newBlogger)
        delete newBlogger._id
        return newBlogger
    }
}