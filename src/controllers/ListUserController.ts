import { Response, Request } from 'express';
import { ListUserServices } from "../services/ListUserServices"


class ListUserController{
    async handle(request:Request, response:Response){
        const listUserServices = new ListUserServices();
        const users = await listUserServices.execute()
        return response.json(users)
        
    }
}

export {ListUserController}