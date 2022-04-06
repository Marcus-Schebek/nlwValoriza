import { getCustomRepository } from "typeorm";
import { TagRepositories} from "../repositories/TagsRepositories";
import {classToPlain} from "class-transformer"

class ListTagsServices{
    async execute(){
        const tagsRepositories = getCustomRepository(TagRepositories)
        const tags = await tagsRepositories.find()
        return classToPlain(tags)
    }
}

export{ListTagsServices}