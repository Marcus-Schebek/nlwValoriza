import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../repositories/UsersRepositories";
import {hash} from "bcryptjs"

interface IUserRequest  {
    name: string
    email: string
    password: string
    admin?: boolean

}

class CreateUsersServices {
    async execute({name, email, admin = false, password}: IUserRequest){
         const usersRepository = getCustomRepository(UserRepositories);

         if(!email){
             throw new Error("Email Incorreto")
         }
         
         const userAlreadyExists = await usersRepository.findOne({
             email,
         })

         if(userAlreadyExists){
             throw new Error("Email alredy exists")
         }

         const passwordHash = await hash(password, 8)

         const user = usersRepository.create({
             name,
             email,
             password: passwordHash,
             admin,
         })

         await usersRepository.save(user)

         return user
    }
}

export {CreateUsersServices};