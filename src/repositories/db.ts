import {MongoClient} from "mongodb";
import {BloggerViewModel, PostViewModel} from "../types";
/*"mongodb+srv://user:sven171995@cluster0.tuuab.mongodb.net/?retryWrites=true&w=majority"*/
const mongoUri = "mongodb://0.0.0.0:27017"

export const client = new MongoClient(mongoUri)
const db = client.db("backend")
export const bloggersCollection = db.collection<BloggerViewModel>("bloggers")
export const postsCollection = db.collection<PostViewModel>("posts")

export async function runDb(){
    try{
        await client.connect()
        await client.db("backend").command({ping: 1})
        console.log("Connected successfully to mongo server")
    }catch(err){
        console.log("Can't connect to db")
        console.log(err)
        await client.close()
    }
}

export const bloggers = [
    {id: 1, name: 'About JS - 01', youtubeUrl: 'https://aaa@yandex.ru'},
    {id: 2, name: 'About JS - 02', youtubeUrl: 'https://aaa@yandex.ru'},
    {id: 3, name: 'About JS - 03', youtubeUrl: 'https://aaa@yandex.ru'},
    {id: 4, name: 'About JS - 04', youtubeUrl: 'https://aaa@yandex.ru'},
    {id: 5, name: 'About JS - 05', youtubeUrl: 'https://aaa@yandex.ru'}
]

export const posts = [
    {id: 1, title: 'About JS - 01', shortDescription: 'it-incubator.eu', content: 'it-incubator.eu', bloggerId: 1, bloggerName: 'it-incubator.eu'},
    {id: 2, title: 'About JS - 02', shortDescription: 'it-incubator.eu', content: 'it-incubator.eu', bloggerId: 2, bloggerName: 'it-incubator.eu'},
    {id: 3, title: 'About JS - 03', shortDescription: 'it-incubator.eu', content: 'it-incubator.eu', bloggerId: 3, bloggerName: 'it-incubator.eu'},
    {id: 4, title: 'About JS - 04', shortDescription: 'it-incubator.eu', content: 'it-incubator.eu', bloggerId: 4, bloggerName: 'it-incubator.eu'},
    {id: 5, title: 'About JS - 05', shortDescription: 'it-incubator.eu', content: 'it-incubator.eu', bloggerId: 5, bloggerName: 'it-incubator.eu'},
]