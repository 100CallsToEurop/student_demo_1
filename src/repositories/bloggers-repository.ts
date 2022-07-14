import {bloggers, posts} from "./db";

type BloggerInputModel = Omit<BloggerViewModel, 'id'>
type BloggerViewModel = {
    id: number,
    name: string,
    youtubeUrl: string
}

export const bloggersRepository = {
    getBloggers() {
        return bloggers
    },
    getBloggerById(id: number) {
        return bloggers.find(b => b.id === id)
    },
    deleteBloggerById(id: number) {
        for(let i = 0; i < bloggers.length; i++){
            if(bloggers[i].id === id) {
                for (let j =0; j < posts.length; j++){
                    if(posts[j].bloggerId === id){
                        posts.splice(i, 1)
                    }
                }
                bloggers.splice(i, 1)
                return true
            }
        }
        return false
    },
    updateBloggerById(id: number, updateParam: BloggerInputModel) {
        const {name, youtubeUrl} = updateParam
        const blogger = bloggers.find(b => b.id === id)
        if (blogger) {
            blogger.name = name, blogger.youtubeUrl = youtubeUrl
            return true
        }
        return false
    },
    createBlogger(createParam: BloggerInputModel){
        const {name, youtubeUrl} = createParam
        const newBlogger: BloggerViewModel = {
            id: +(new Date()),
            name,
            youtubeUrl
        }
        bloggers.push(newBlogger)
        return newBlogger
    }
}