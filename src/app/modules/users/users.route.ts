import express from 'express';
import { UserController } from './users.controller';
// import userController from './users.controller';
const router = express.Router();
router.post('/create-user', UserController.createUser);
export const UserRoutes = router;
