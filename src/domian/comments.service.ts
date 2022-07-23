import {CommentInputModel, CommentViewModel} from "../types/types";
import {commentsRepository} from "../repositories/comments-repository-db";
import {postsRepository} from "../repositories/posts-repository-db";


export const commentsService= {
    async updateCommentById(commentId: string, updateComment: CommentInputModel): Promise<boolean>{
        return await commentsRepository.updateCommentById(commentId, updateComment)
    },
    async getCommentById(commentId: string): Promise<CommentViewModel | null> {
        const comment = await commentsRepository.getCommentById(commentId)
        return comment
    },
   async deleteCommentById(commentId: string){
       return await commentsRepository.deleteCommentById(commentId)
   }
}