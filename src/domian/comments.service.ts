import {CommentInputModel, CommentQuery, CommentViewModel, PostInputModel, PostViewModel} from "../types/types";
import {commentsRepository} from "../repositories/comments-repository-db";
import {PaginationComments} from "../types/pagination.types";
import {bloggersService} from "./bloggers.service";
import {postsRepository} from "../repositories/posts-repository-db";
import {postsService} from "./posts.services";
import {usersService} from "./users.service";


export const commentsService= {

    async createComment(userId: string, postId: string, createParam: CommentInputModel):Promise<CommentViewModel | null> {
        const user = await usersService.findUserById(userId)
        const posts = await postsService.getPostById(postId)
        if (!posts) return null
        const newComment: CommentViewModel = {
            id: (+(new Date())).toString(),
            content: createParam.content,
            userId: userId,
            userLogin: user!.login,
            addedAt: (new Date()).toString()
        }
        await commentsRepository.createComments(newComment)
        return newComment
    },

    async getComments(queryParams?: CommentQuery): Promise<PaginationComments | null>{
        if(queryParams?.postId !== undefined) {
            const posts = await postsService.getPostById(queryParams?.postId)
            if (!posts) return null
        }
        return await commentsRepository.getComments(queryParams)
    },

    async updateCommentById(id: string, updateComment: CommentInputModel): Promise<boolean>{
        return await commentsRepository.updateCommentById(id, updateComment)
    },
    async getCommentById(commentId: string): Promise<CommentViewModel | null> {
        const comment = await commentsRepository.getCommentById(commentId)
        return comment
    },
   async deleteCommentById(commentId: string){
       return await commentsRepository.deleteCommentById(commentId)
   }
}