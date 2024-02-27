const express = require('express');
const userRouter = require('./routes/userRoute.js');
const serverRouter = require('./routes/serverRoute.js');
const priceRouter = require('./routes/priceRoute.js');
const PORT = 8080;
const app = express();

app.use(express.json());
app.use('/api', userRouter, serverRouter, priceRouter);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
