import express from 'express';
import morgan from 'morgan';
import fileupload from 'express-fileupload';
import debug from 'debug';
import cors from 'cors';
import router from './routes';

const app = express();
const debugy = debug('server');
const port = process.env.PORT || 3000;
app.use(cors());
app.options('*', cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileupload({
  useTempFiles: true,
  // tempFileDir: '/property/',
  // limits: {
  //   fileSize: 50 * 1024 * 1024,
  // }
}));
app.use(router);

app.listen(port, () => {
  debugy(`started at port ${port}`);
});

export default app;
