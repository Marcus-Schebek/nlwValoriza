import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUsersController";
import { CreateTagController } from "./controllers/CreateTagsController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { AuthenticateUserController } from "./controllers/AuthenticateUsersController";
import { CreateComplimentsController } from "./controllers/CreateComplementsController"
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { ListUserSendComplimentsController } from "./controllers/ListUserSendComplimentsController";
import { ListUserReceiveComplimentsController } from "./controllers/ListUserReceiveComplimentsController";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListUserController } from "./controllers/ListUserController";


const router = Router();

const createUserController = new CreateUserController()
const createTagController = new CreateTagController()
const authenticateUsersController = new AuthenticateUserController()
const createComplimentsController = new CreateComplimentsController()
const listUserSendComplimentsController = new ListUserSendComplimentsController()
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController()
const listTagsController = new ListTagsController()
const listUserController = new ListUserController()


router.post("/tags",ensureAuthenticated, ensureAdmin,createTagController.handle)
router.get("/tags",ensureAuthenticated,listTagsController.handle)
router.post("/users", createUserController.handle)
router.get("/users",ensureAuthenticated, listUserController.handle)
router.post("/login",authenticateUsersController.handle)
router.post("/compliments",ensureAuthenticated, createComplimentsController.handle)
router.get("/users/compliments/send",ensureAuthenticated,listUserSendComplimentsController.handle )
router.get("/users/compliments/receive", ensureAuthenticated,listUserReceiveComplimentsController.handle)



export { router };