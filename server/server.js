import express from 'express';
import bodyParser from 'body-parser';
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileupload({
  useTempFiles: true,
}));
app.use(router);

app.listen(port, () => {
  debugy(`started at port ${port}`);
});

export default app;
