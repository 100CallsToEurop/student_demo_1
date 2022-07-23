import {bloggersCollection, commentsCollection, postsCollection} from "./db";
import {BloggerInputModel, BloggerQuery, BloggerViewModel} from "../types/types";
import {PaginationBloggers} from "../types/pagination.types";


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
    async getBloggerById(id: string): Promise<BloggerViewModel | null> {
       const bloger = await bloggersCollection.findOne({id},{ projection: { _id: 0}})
       return bloger
    },
    async deleteBloggerById(id: string): Promise<boolean> {
        const result = await bloggersCollection.deleteOne({id:id})
        await postsCollection.deleteMany({bloggerId: id})
        await commentsCollection.deleteMany({userId: id})
        return result.deletedCount === 1
    },
    async updateBloggerById(id: string, updateParam: BloggerInputModel): Promise<boolean> {
        const result = await bloggersCollection.updateOne({id: id}, { $set: updateParam})
        return result.matchedCount === 1
    },
    async createBlogger(createParam: BloggerViewModel): Promise<BloggerViewModel>{
        const params = {...createParam}
        await bloggersCollection.insertOne(params)
        return createParam
    }
}