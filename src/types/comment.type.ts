import {Query} from "./query.type";
import {Pagination} from "./pagination.types";
import {ObjectId} from "mongodb";

export type CommentInputModel = {
    content: string
}
export type CommentViewModel = CommentInputModel & {
    id: string,
    userId: ObjectId
    userLogin: string
    addedAt: string
}

export type CommentModel = {
    _id: ObjectId
    userId: ObjectId
    content: string
    userLogin: string
    addedAt: string
    postId: ObjectId
}

export type CommentQuery = Query & {
    postId?: ObjectId,
}

export type PaginationComments = Pagination & {
    items?: Array<CommentViewModel>
}