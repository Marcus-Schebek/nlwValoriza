import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { UserRepositories } from "../repositories/UsersRepositories";

interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {
    async execute({ email, password }: IAuthenticateRequest) {
        const usersRepositories = getCustomRepository(UserRepositories);

        // Verificar se email existe
        const user = await usersRepositories.findOne({
            email,
        });

        if (!user) {
            throw new Error("Email/Password incorrect");
        }

        const passwordMatch = await compare(password, user.password)
        
        if(!passwordMatch){
            throw new Error("Email/Password incorrect");
        }

        const token = sign({
            email: user.email
        }, "bc80b9249047191f780453d1e89ee4ac",{
            subject: user.id,
            expiresIn: "1d"
        })

        return token
    }
}

export { AuthenticateUserService }