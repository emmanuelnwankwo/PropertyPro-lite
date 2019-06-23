import express from 'express';
import bodyParser from 'body-parser';
import debug from 'debug';
import morgan from 'morgan';
// import expressValidator from 'express-validator';
import router from './routes';

const app = express();
const debugg = debug('app');
const port = process.env.PORT || 3000;
// app.use(expressValidator());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

app.listen(port, () => {
  debugg(`Server debugging at port ${port}`);
  console.log(`Server started at port ${port}`);
});

export default app;
