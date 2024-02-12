import express, { Application, urlencoded } from 'express';
import cors from 'cors';
import globalErrodHandler from './app/middleware/GlobalErrorHandler';
// import usersService from './app/modules/users/users.service';
import userRouter from './app/modules/users/users.route';
const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use('/api/v1/users', userRouter);

// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   Promise.reject(new Error('Unhandle Promise Rejection'));
// });

// testing purpose
// app.get('/', async (req: Request, res: Response) => {
//   await usersService.createUser({
//     id: '999',
//     password: '123',
//     role: 'student',
//   });
//   res.send('working Successfully');
// });

app.use(globalErrodHandler);
export default app;
