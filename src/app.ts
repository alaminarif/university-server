import express, { Application, urlencoded } from 'express';
import cors from 'cors';
import globalErrodHandler from './app/middleware/GlobalErrorHandler';
import router from './app/router';
const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use('/api/v1', router);
// app.use('/api/v1/academic-semesters', AcademicSemesterRoutes);

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
