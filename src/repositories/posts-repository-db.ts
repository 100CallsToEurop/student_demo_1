import {bloggersCollection, postsCollection} from "./db";
import {PaginationBloggers, PaginationPosts, PostInputModel, PostQuery, PostViewModel} from "../types";
import {bloggersRepository} from "./bloggers-repository-db";

export const postsRepository = {
    async getPosts(queryParams?: PostQuery): Promise<PaginationPosts> {
        const pageNumber = Number(queryParams?.page)
        const pageSize = Number(queryParams?.pageSize)
        const skip: number = (pageNumber-1) * pageSize
        let filter: any = {}
        if(queryParams?.id){
            filter['bloggerId'] = {$regex: queryParams.id}
        }

        const result: PaginationPosts= {
            pagesCount: await postsCollection.find(filter).count(),
            page: pageNumber,
            pageSize: pageSize,
            totalCount: await postsCollection.find().count(),
            items: await postsCollection.find(filter).skip(skip).limit(pageSize).toArray()
        }

        return result
    },
    async getPostById(id: number) {
        let post = await postsCollection.findOne({id})
        if(post) return post
        return null
    },
    async deletePostById(id: number): Promise<boolean> {
        const result = await postsCollection.deleteOne({id:id})
        return result.deletedCount === 1
    },
    async updatePostById(id: number, updatePost: PostInputModel): Promise<boolean> {
        const result = await postsCollection.updateOne({id: id}, {$set: updatePost})
        return result.matchedCount === 1
    },
    async createPost(createParam: PostViewModel) {
        await postsCollection.insertOne(createParam)
        return createParam
    }
}