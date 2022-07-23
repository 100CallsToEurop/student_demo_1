import {CommentInputModel, CommentQuery, CommentViewModel, PostInputModel, PostViewModel} from "../types/types";
import {commentsCollection, postsCollection} from "./db";
import {PaginationComments} from "../types/pagination.types";
import {usersService} from "../domian/users.service";
import {postsService} from "../domian/posts.services";

export const commentsRepository = {

    async getComments(queryParams?: CommentQuery): Promise<PaginationComments>{
        const pageNumber = Number(queryParams?.PageNumber) || 1
        const pageSize = Number(queryParams?.PageSize) || 10
        const skip: number = (pageNumber-1) * pageSize
        let count = await commentsCollection.countDocuments()

        let filter: any = {}
        if(queryParams?.postId !== undefined){


            filter['postsId'] = queryParams.postId
            count = (await commentsCollection.find(filter).toArray()).length

        }
        else{
            count = await commentsCollection.countDocuments()
        }

        const result: PaginationComments= {
            pagesCount: Math.ceil(count/pageSize),
            page: pageNumber,
            pageSize: pageSize,
            totalCount: count,
            items: await commentsCollection.find(filter, {projection:{ _id: 0, postId: 0}}).skip(skip).limit(pageSize).toArray()
        }

        return result
    },

    async createComments(createParam: CommentViewModel){
        const params = {...createParam}
        await commentsCollection.insertOne(params)
        return createParam
    },

    async updateCommentById(id: string, updateComment: CommentInputModel): Promise<boolean>{
        const result = await commentsCollection.updateOne({id: id}, {$set: updateComment})
        return result.matchedCount === 1
    },

    async getCommentById(id: string): Promise<CommentViewModel | null>{
        const comment = await commentsCollection.findOne({id}, {projection:{ _id: 0 }})
        if(comment) return comment
        return null
    },

    async deleteCommentById(id: string): Promise<boolean> {
        const result = await commentsCollection.deleteOne({id:id})
        return result.deletedCount === 1
    },
}