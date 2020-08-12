import express from 'express';
import allowCors from './cors';
import routes from './routes';

const app = express();

app.use(allowCors);
app.use(express.json());
app.use(routes);

app.listen(3333);