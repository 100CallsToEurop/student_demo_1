import {bloggers, posts} from "./db";
import {BloggerInputModel, BloggerViewModel} from "../types";

export const bloggersRepository = {
    async getBloggers(): Promise<BloggerViewModel[]> {
        return bloggers
    },
    async getBloggerById(id: number): Promise<BloggerViewModel | undefined> {
        return bloggers.find(b => b.id === id)
    },
    async deleteBloggerById(id: number): Promise<boolean> {
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
    async updateBloggerById(id: number, updateParam: BloggerInputModel): Promise<boolean> {
        const {name, youtubeUrl} = updateParam
        const blogger = await bloggers.find(b => b.id === id)
        if (blogger) {
            blogger.name = name, blogger.youtubeUrl = youtubeUrl
            return true
        }
        return false
    },
    async createBlogger(createParam: BloggerInputModel): Promise<BloggerViewModel>{
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