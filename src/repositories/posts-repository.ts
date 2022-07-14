import {bloggers, posts} from "./db";

type PostInputModel = Omit<PostViewModel, 'id' | 'bloggerName'>
type PostViewModel  = {
    id: number,
    title: string,
    shortDescription: string,
    content: string,
    bloggerId: number,
    bloggerName: string
}

export const postsRepository = {
    getPosts() {
       return posts
    },
    getPostById(id: number) {
        return posts.find(p => p.id === id)
    },
    deletePostById(id: number) {
        for(let i = 0; i < posts.length; i++){
            if(posts[i].id === id) {
                posts.splice(i, 1)
                return true
            }
        }
        return false
    },
    updatePostById(id: number, updatePost: PostInputModel) {
        const {title, shortDescription, content, bloggerId }  = updatePost
        const blogger = bloggers.find(b => b.id === +bloggerId)
        if(!blogger) return null
        const post = posts.find(p => p.id === id)
        if (post) {
            post.title = title
            post.shortDescription = shortDescription
            post.content = content
            post.bloggerId = +bloggerId
            return true
        }
        return false
    },
    createPost(createParam: PostInputModel) {
        const {title, shortDescription, content, bloggerId }  = createParam
        let bloggerName = ''
        const blogger = bloggers.find(b => b.id === +bloggerId)
        if(blogger) bloggerName = blogger.name
        else return null
        const newPost: PostViewModel = {
            id: +(new Date()),
            title,
            shortDescription,
            content,
            bloggerId: +bloggerId,
            bloggerName: bloggerName
        }
        posts.push(newPost)
        return newPost
    }
}