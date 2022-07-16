export type BloggerInputModel = Omit<BloggerViewModel, 'id'>
export type BloggerViewModel = {
    _id?: string
    id: number,
    name: string,
    youtubeUrl: string
}

export type PostInputModel = Omit<PostViewModel, 'id' | 'bloggerName'>
export type PostViewModel  = {
    _id?: string
    id: number,
    title: string,
    shortDescription: string,
    content: string,
    bloggerId: number,
    bloggerName: string
}

export type BloggerPostInputModel = Omit<PostInputModel, 'bloggerId'>

export type PostQuery = {
    id?: string,
    page?: string,
    pageSize?: string
}

export type BloggerQuery = {
    name?: string,
    PageNumber?: string,
    PageSize?: string
}


export type Pagination = {
    pagesCount?: number,
    page?: number,
    pageSize?: number,
    totalCount?: number,
}

export interface PaginationBloggers extends Pagination {
    items?: Array<BloggerViewModel>
}

export interface PaginationPosts extends Pagination {
    items?: Array<PostViewModel>
}


