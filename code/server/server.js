'use strict';


const express = require('express');
const Controller = require('./modules/logic/controller')
// init express
const app = new express();
const port = 3001;

//Routers
const internalOrderRouter = require("./routers/internalOrderRouter");
const itemRouter = require("./routers/itemRouter");
const positionRouter = require('./routers/positionRouter');
const restockOrderRouter = require('./routers/restockOrderRouter');
const returnOrderRouter = require('./routers/returnOrderRouter');
const skuItemsRouter = require('./routers/skuItemsRouter');
const skusRouter = require('./routers/skusRouter');
const testRouter = require("./routers/testsRouter");
const userRouter = require("./routers/userRouter");


//Controller
const controller = new Controller();

app.use(express.json());
app.set('controller', controller);
app.use('/', internalOrderRouter);
app.use('/', itemRouter);
app.use('/', positionRouter);
app.use('/', restockOrderRouter);
app.use('/', returnOrderRouter);
app.use('/', skuItemsRouter);
app.use('/', skusRouter);
app.use('/', testRouter);
app.use('/', userRouter);


//GET /api/test
app.get('/api/hello', (req,res)=>{
  let message = {
    message: 'Hello World!'
  }
  return res.status(200).json(message);
});







// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

module.exports = app;