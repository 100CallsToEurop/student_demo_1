import {CommentInputModel, CommentViewModel, PostInputModel} from "../types/types";
import {commentsCollection, postsCollection} from "./db";

export const commentsRepository = {
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