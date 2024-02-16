const express = require('express');
const userRouter = require('./routes/userRoute.js');
const serverRouter = require('./routes/serverRoute.js');
const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use('/api', userRouter, serverRouter);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
  process.send('ready');
});
