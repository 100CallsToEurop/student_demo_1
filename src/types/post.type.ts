import {Query} from "./query.type";
import {Pagination} from "./pagination.types";
import {ObjectId} from "mongodb";

export type PostInputModel  = {
    title: string,
    shortDescription: string,
    content: string,
    bloggerId: ObjectId,
}

export type PostViewModel = PostInputModel & {
    id: string,
    bloggerName: string
}

export type PostModel = {
    _id: ObjectId
    title: string,
    shortDescription: string,
    content: string,
    bloggerId: ObjectId,
    bloggerName: string
}

export type PostQuery = Query & {
    id?: string,
}

export type PaginationPosts = Pagination & {
    items?: Array<PostViewModel>
}

