import {bloggersCollection, postsCollection} from "./db";
import {BloggerInputModel, BloggerQuery, BloggerViewModel, PaginationBloggers} from "../types";


export const bloggersRepository = {
    async getBloggers(queryParams?: BloggerQuery): Promise<PaginationBloggers/*BloggerViewModel[]*/> {

        let pageNumber = Number(queryParams?.PageNumber) || 1
        let pageSize = Number(queryParams?.PageSize) || 10
        const skip: number = (pageNumber-1) * pageSize
        let count = await bloggersCollection.countDocuments()

        let filter: any = {}
        if(queryParams?.SearchNameTerm){
            filter['name'] = {$regex: queryParams.SearchNameTerm}
            count = (await bloggersCollection.find(filter).toArray()).length
        }



        const result: PaginationBloggers = {
            pagesCount: Math.ceil(count/pageSize),
            page: pageNumber,
            pageSize: pageSize,
            totalCount: count,
            items: await bloggersCollection.find(filter, {projection:{ _id: 0 }}).skip(skip).limit(pageSize).toArray()
        }

        return result
    },
    async getBloggerById(id: number): Promise<BloggerViewModel | null> {
       const bloger = await bloggersCollection.findOne({id},{ projection: { _id: 0}})
       return bloger
    },
    async deleteBloggerById(id: number): Promise<boolean> {
        const result = await bloggersCollection.deleteOne({id:id})
        await postsCollection.deleteMany({bloggerId: id})
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