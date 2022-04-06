import {EntityRepository, Repository} from "typeorm"
import {Tag} from "../entities/Tags"


@EntityRepository(Tag)
class TagRepositories extends Repository<Tag>{

}

export {TagRepositories}