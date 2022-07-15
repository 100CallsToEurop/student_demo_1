import {bloggersCollection} from "./db";
import {BloggerInputModel, BloggerQuery, BloggerViewModel, PaginationBloggers} from "../types";


export const bloggersRepository = {
    async getBloggers(queryParams?: BloggerQuery): Promise<PaginationBloggers/*BloggerViewModel[]*/> {

        const pageNumber = Number(queryParams?.page)
        const pageSize = Number(queryParams?.pageSize)
        const skip: number = (pageNumber-1) * pageSize

        let filter: any = {}
        if(queryParams?.name){
            filter['name'] = {$regex: queryParams.name}
        }

        const result: PaginationBloggers = {
            pagesCount: await bloggersCollection.find(filter).count(),
            page: pageNumber,
            pageSize: pageSize,
            totalCount: await bloggersCollection.find().count(),
            items: await bloggersCollection.find(filter).skip(skip).limit(pageSize).toArray()
        }

        return result
    },
    async getBloggerById(id: number): Promise<BloggerViewModel | null> {
       let bloger = await bloggersCollection.findOne({id})
       return bloger
    },
    async deleteBloggerById(id: number): Promise<boolean> {
        const result = await bloggersCollection.deleteOne({id:id})
        return result.deletedCount === 1
    },
    async updateBloggerById(id: number, updateParam: BloggerInputModel): Promise<boolean> {
        const result = await bloggersCollection.updateOne({id: id}, { $set: updateParam})
        return result.matchedCount === 1
    },
    async createBlogger(createParam: BloggerViewModel): Promise<BloggerViewModel>{
        await bloggersCollection.insertOne(createParam)
        return createParam
    }
}