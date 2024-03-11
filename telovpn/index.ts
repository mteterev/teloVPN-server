import express from 'express';
import serverRouter from './routes/serverRoute';
import priceRouter from './routes/priceRoute';
import userRouter from './routes/userRoute';
import { sequelize } from './models/sequelize';

const PORT = 8080;
const app = express();

app.use(express.json());
app.use('/api', serverRouter, priceRouter, userRouter);

sequelize
  .sync({ alter: true })
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`server started on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
