import { Router } from 'express'
import { UserController } from './controllers/UserController'

const router = Router()

const userController = new UserController()

router.get("/api/users", userController.index)
router.get("/api/users/new", userController.new)
router.post("/api/users", userController.create)
router.get("/api/users/:userId(\\d+)", userController.show)
router.post("/api/users/:userId(\\d+)", userController.update)

export { router }
