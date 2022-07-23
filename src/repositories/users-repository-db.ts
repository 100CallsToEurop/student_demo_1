import {UserQuery, UserViewModel} from "../types/types";
import {usersCollection} from "./db";
import {PaginationUsers} from "../types/pagination.types";


export const usersRepository = {

    async getUsers(queryParams?: UserQuery): Promise<PaginationUsers> {

        let pageNumber = Number(queryParams?.PageNumber) || 1
        let pageSize = Number(queryParams?.PageSize) || 10
        const skip: number = (pageNumber-1) * pageSize
        let count = await usersCollection.countDocuments()
        const filter = {}

        const result: PaginationUsers = {
            pagesCount: Math.ceil(count/pageSize),
            page: pageNumber,
            pageSize: pageSize,
            totalCount: count,
            items: await usersCollection.find(filter, {projection:{ _id: 0 }}).skip(skip).limit(pageSize).toArray()
        }

        return result
    },

    async createUser(createParam: UserViewModel): Promise<UserViewModel>{
        const params = {...createParam}
        await usersCollection.insertOne(params)
        return createParam
    },

    async findUserById(id: string): Promise<UserViewModel | null>{
        const user = await usersCollection.findOne({id}, {projection:{ _id: 0 }})
        if(user) return user
        return null
    },

    async findByLogin(login: string): Promise<UserViewModel | null>{
        const user = await usersCollection.findOne({login}, {projection:{ _id: 0 }})
        if(user) return user
        return null
    },

    async deleteUserById(id: string): Promise<boolean> {
        const result = await usersCollection.deleteOne({id:id})
        return result.deletedCount === 1
    },
}