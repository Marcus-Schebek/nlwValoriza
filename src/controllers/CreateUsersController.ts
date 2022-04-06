import { Request, Response } from "express";
import { CreateUsersServices } from "../services/CreateUsersServices";


class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, password, admin } = request.body;

    const createUserService = new CreateUsersServices();

    const user = await createUserService.execute({ name, email, password, admin });

    return response.json(user);
  }
}

export { CreateUserController };