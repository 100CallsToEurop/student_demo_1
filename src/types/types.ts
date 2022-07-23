export type BloggerInputModel = {
    _id?: string
    name: string,
    youtubeUrl: string
}
export type BloggerViewModel = BloggerInputModel & {
    id: number,
}

export type PostInputModel  = {
    _id?: string
    title: string,
    shortDescription: string,
    content: string,
    bloggerId: number,
}

export type PostViewModel = PostInputModel & {
    id: number,
    bloggerName: string
}

export type BloggerPostInputModel = Omit<PostInputModel, 'bloggerId'>

export type PostQuery = {
    id?: string,
    PageNumber?: string,
    PageSize?: string
}

export type BloggerQuery = {
    SearchNameTerm?: string,
    PageNumber?: string,
    PageSize?: string
}

export type UserQuery = {
    PageNumber?: string,
    PageSize?: string
}

export type CommentInputModel = {
    content: string
}
export type CommentViewModel = CommentInputModel & {
    id:	string
    userId:	string
    userLogin: string
    addedAt: string
}

export type LoginInputModel = {
    login: string
    password: string
}
export type LoginSuccessViewModel = {
    token: string
}

export type UserInputModel = LoginInputModel
export type UserViewModel = Omit<UserInputModel, 'password'> & {
    _id?: string
    id:	string,
    passwordHash: string,
    passwordSalt: string,
    createAt: Date
}



