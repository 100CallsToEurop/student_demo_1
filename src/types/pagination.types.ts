import {BloggerViewModel, CommentViewModel, PostViewModel, UserViewModel} from "./types";

export type Pagination = {
    pagesCount?: number,
    page?: number,
    pageSize?: number,
    totalCount?: number,
}

export type PaginationBloggers = Pagination & {
    items?: Array<BloggerViewModel>
}

export type PaginationPosts = Pagination & {
    items?: Array<PostViewModel>
}

export type PaginationUsers = Pagination & {
    items?: Array<UserViewModel>
}

export type PaginationComments = Pagination & {
    items?: Array<CommentViewModel>
}