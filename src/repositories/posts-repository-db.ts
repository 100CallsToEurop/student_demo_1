import {postsCollection} from "./db";
import { PostInputModel, PostQuery, PostViewModel} from "../types/types";
import {PaginationPosts} from "../types/pagination.types";

export const postsRepository = {
    async getPosts(queryParams?: PostQuery): Promise<PaginationPosts> {
        const pageNumber = Number(queryParams?.PageNumber) || 1
        const pageSize = Number(queryParams?.PageSize) || 10
        const skip: number = (pageNumber-1) * pageSize
        let count = 0

        let filter: any = {}
        if(queryParams?.id !== undefined){
            console.log(queryParams.id)
            filter['bloggerId'] = +queryParams.id
            count = (await postsCollection.find(filter).toArray()).length

        }
        else{
            count = await postsCollection.countDocuments()
        }

        const result: PaginationPosts= {
            pagesCount: Math.ceil(count/pageSize),
            page: pageNumber,
            pageSize: pageSize,
            totalCount: count,
            items: await postsCollection.find(filter, {projection:{ _id: 0 }}).skip(skip).limit(pageSize).toArray()
        }

        return result
    },
    async getPostById(id: string) {
        let post = await postsCollection.findOne({id}, {projection: { _id: 0}})
        if(post) return post
        return null
    },
    async deletePostById(id: string): Promise<boolean> {
        const result = await postsCollection.deleteOne({id:id})
        return result.deletedCount === 1
    },
    async updatePostById(id: string, updatePost: PostInputModel): Promise<boolean> {
        const result = await postsCollection.updateOne({id: id}, {$set: updatePost})
        return result.matchedCount === 1
    },
    async createPost(createParam: PostViewModel): Promise<PostViewModel> {
        const params = {...createParam}
        await postsCollection.insertOne(params)
        return createParam
    }
}