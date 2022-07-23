import {BloggerViewModel, UserInputModel, UserQuery, UserViewModel} from "../types/types";
import bcrypt from 'bcrypt'
import {usersRepository} from "../repositories/users-repository-db";
import {PaginationUsers} from "../types/pagination.types";
import {bloggersRepository} from "../repositories/bloggers-repository-db";


export const usersService= {
    async createUser(userParam: UserInputModel): Promise<UserViewModel>{
        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await this._generateHash(userParam.password, passwordSalt)
        const newUser: UserViewModel = {
            id: (+(new Date())).toString(),
            login: userParam.login,
            passwordHash,
            passwordSalt,
            createAt: new Date()
        }
        await usersRepository.createUser(newUser)
        delete newUser.passwordHash
        delete newUser.passwordSalt
        delete newUser.createAt
        return newUser
    },

    async getUsers(queryParams?: UserQuery): Promise<PaginationUsers>{
        return usersRepository.getUsers(queryParams)
    },

async findUserById(id: string): Promise<UserViewModel | null> {
    const user = await usersRepository.findUserById(id)
    return user
},

    async deleteUserById(id: string){
        return await usersRepository.deleteUserById(id)
    },

    async checkCredentials(userParam: UserInputModel): Promise<UserViewModel | null>{
       const user = await usersRepository.findByLogin(userParam.login)
        if(!user) {
            return null
        }
        else {
            const passwordHash = await this._generateHash(userParam.password, user.passwordSalt!)
            if (passwordHash !== user.passwordHash) return null
            return user
        }
    },

    async _generateHash(password: string, salt: string){
       const hash = await bcrypt.hash(password, salt)
        return hash
    }

}