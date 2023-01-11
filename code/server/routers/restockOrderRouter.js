const express = require('express')
const router = express.Router()
const Controller = require('../modules/logic/controller')
//Restock Order Requests


router.get('/api/restockOrders', async (req, res) => {

  /** @type {Controller} */
  const controller = req.app.get("controller");
  //console.log('GET', req.url);

  await controller.getRestockOrderController().getAllRestockOrders()
    .then((restockOrders) => { return res.status(200).json(restockOrders); })
    .catch(error => {return res.status(error.getCode()).send(error.getMessage()); });
});

router.get('/api/restockOrders/:id', async (req, res) => {
  const param = req.params.id;

  /** @type {Controller} */
  const controller = req.app.get("controller");
  //console.log('GET', req.url);

  await controller.getRestockOrderController().getRestockOrder(param)
    .then((restockOrder) => { return res.status(200).json(restockOrder); })
    .catch(error => {return res.status(501).send(); });
});

router.get('/api/restockOrders/:id/returnItems', async (req, res) => {
  const param = req.params.id;

  /** @type {Controller} */
  const controller = req.app.get("controller");
  //console.log('GET', req.url);

  await controller.getRestockOrderController().getRestockOrderToBeReturned(param)
    .then((user) => { return res.status(200).json(user); })
    .catch(error => {return res.status(error.getCode()).send(error.getMessage());});
});


router.get('/api/restockOrdersIssued', async (req, res) => {

  /** @type {Controller} */
  const controller = req.app.get("controller");
  //console.log('GET', req.url);

  await controller.getRestockOrderController().getIssuedRestockOrders()
    .then((restockOrder) => { return res.status(200).json(restockOrder); })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });
});


router.post('/api/restockOrder', async (req, res) => {

  /** @type {Controller} */
  const controller = req.app.get("controller");
  //console.log('POST', req.url);

  await controller.getRestockOrderController().createRestockOrder(req.body)
    .then((user) => { return res.status(201).end(); })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });
});

router.put('/api/restockOrder/:id', async (req, res) => {
  const param = req.params.id

  /** @type {Controller} */
  const controller = req.app.get("controller");
  //console.log('PUT', req.url);

  await controller.getRestockOrderController().editRestockOrder(param, req.body)
    .then(() => { return res.status(200).end(); })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });
})

router.put('/api/restockOrder/:id/skuItems', async (req, res) => {
  const param = req.params.id;

  /** @type {Controller} */
  const controller = req.app.get("controller");
  //console.log('PUT', req.url);

  await controller.getRestockOrderController().addSkuItemsToRestockOrder(param, req.body)
  .then(() => { return res.status(200).end(); })
  .catch(error => {console.log(error); return res.status(error.getCode()).send(error.getMessage()); });
});


router.put('/api/restockOrder/:id/transportNote', async (req, res) => {
  const param = req.params.id;

  /** @type {Controller} */
  const controller = req.app.get("controller");
  //console.log('PUT', req.url);

  await controller.getRestockOrderController().addTransportNote(param, req.body)
    .then(() => { return res.status(200).end(); })
    .catch(error => {return res.status(error.getCode()).send(error.getMessage()); });
});


router.delete('/api/restockOrder/:id', async (req, res) => {
  const param = req.params.id;

  /** @type {Controller} */
  const controller = req.app.get("controller");
  //console.log('DELETE', req.url);

  await controller.getRestockOrderController().deleteRestockOrder(param)
    .then(() => { return res.status(204).end(); })
    .catch(error => {return res.status(error.getCode()).send(error.getMessage()); });
});

module.exports = router