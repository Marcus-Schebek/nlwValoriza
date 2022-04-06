
import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplementsRepositories";
import { UserRepositories } from "../repositories/UsersRepositories";


interface IComplementsRequest{
    tag_id: string,
    user_sender: string,
    user_receiver: string,
    message: string
}
class CreateComplimentService {
    async execute({
      tag_id,
      user_sender,
      user_receiver,
      message,
    }: IComplementsRequest) {
      const complimentsRepositories = getCustomRepository(
        ComplimentsRepositories
      );
      const usersRepositories = getCustomRepository(UserRepositories);
  
      if (user_sender === user_receiver) {
        throw new Error("Incorrect User Receiver");
      }
  
      const userReceiverExists = await usersRepositories.findOne(user_receiver);
  
      if (!userReceiverExists) {
        throw new Error("User Receiver does not exists!");
      }
  
      const compliment = complimentsRepositories.create({
        tag_id,
        user_receiver,
        user_sender,
        message,
      });
  
      await complimentsRepositories.save(compliment);
  
      return compliment;
    }
  }
  
  export { CreateComplimentService };