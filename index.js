import express from 'express';
import routes from './routes';

process.on('unhandledRejection', error => {
  console.error(error);
});
const app = express();
app.listen(80, () => {
  console.dir('server is runing');
});

app.use('/', routes);

app.get('/', (req, res) => res.send('ok'));
app.get('/test', require('@root/controlers/googleDriveTest').default);
